import React, { useState } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import { useBudgetContext } from "../context/BudgetContext";

const AddIncome = () => {
    const { addTransaction, transactions } = useTransactionContext(); // Gelir ekleme
    const { incomeCategories = [] } = useBudgetContext(); // Varsayılan değer olarak boş bir dizi atama
    const [income, setIncome] = useState({ description: "", amount: "", date: "", category: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction({ ...income, type: "income" }); // Yeni gelir ekle
        setIncome({ description: "", amount: "", date: "", category: "" }); // Formu sıfırla
    };

    // Gelirlerin listelenmesi için işlem filtrelemesi
    const incomeTransactions = transactions.filter((transaction) => transaction.type === "income");

    return (
        <div className="form-container">
            <h2>Gelir Ekle</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Açıklama"
                    value={income.description}
                    onChange={(e) => setIncome({ ...income, description: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Tutar"
                    value={income.amount}
                    onChange={(e) => setIncome({ ...income, amount: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={income.date}
                    onChange={(e) => setIncome({ ...income, date: e.target.value })}
                    required
                />

                <select
                    value={income.category}
                    onChange={(e) => setIncome({ ...income, category: e.target.value })}
                    required
                >
                    <option value="">Kategori Seçin</option>
                    {incomeCategories.length > 0 ? (
                        incomeCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))
                    ) : (
                        <option disabled>Kategori bulunamadı</option>
                    )}
                </select>

                <button type="submit">Kaydet</button>
            </form>

            {/* Gelirlerin Listelenmesi */}
            <div className="income-list">
                <h3>Eklenen Gelirler</h3>
                {incomeTransactions.length === 0 ? (
                    <p>Henüz gelir eklenmedi.</p>
                ) : (
                    <ul>
                        {incomeTransactions.map((transaction, index) => (
                            <li key={index}>
                                <strong>{transaction.description}</strong>  {transaction.amount} TL
                                <br />
                                Kategori: {transaction.category}
                                <br/>
                                Tarih: {transaction.date}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AddIncome;
