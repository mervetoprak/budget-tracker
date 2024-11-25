import React, { useState } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import { useBudgetContext } from "../context/BudgetContext";

const AddExpense = () => {
    const { addTransaction, transactions } = useTransactionContext(); // Gelir işlemleri
    const { expenseCategories = [] } = useBudgetContext(); // Kategorileri alma, varsayılan değer olarak boş dizi atama
    const [expense, setExpense] = useState({ description: "", amount: "", date: "", category: "" });

    // Giderlerin listelenmesi için işlem filtrelemesi
    const expenseTransactions = transactions.filter((transaction) => transaction.type === "expense");

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction({ ...expense, type: "expense" }); // Gider işlemi ekleme
        setExpense({ description: "", amount: "", date: "", category: "" }); // Formu sıfırlama
    };

    return (
        <div className="form-container">
            <h2>Gider Ekle</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Açıklama"
                    value={expense.description}
                    onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Tutar"
                    value={expense.amount}
                    onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={expense.date}
                    onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                    required
                />
                {/* Kategori Seçimi */}
                <select
                    value={expense.category}
                    onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                    required
                >
                    <option value="">Kategori Seçin</option>
                    {expenseCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button type="submit">Kaydet</button>
            </form>

            {/* Giderlerin Listelenmesi */}
            <div className="expense-list">
                <h3>Eklenen Giderler</h3>
                {expenseTransactions.length === 0 ? (
                    <p>Henüz gider eklenmedi.</p>
                ) : (
                    <ul>
                        {expenseTransactions.map((transaction, index) => (
                            <li key={index}>
                                <strong>{transaction.description}</strong>    {transaction.amount} TL
                                <br/>
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
export default AddExpense;
