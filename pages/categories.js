import React, { useState } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import { useBudgetContext } from "../context/BudgetContext";
const Categories = () => {
    const { transactions } = useTransactionContext();
    const { expenseCategories, addCategory, incomeCategories, addIncomeCategory } = useBudgetContext(); // Kategoriler ve kategori ekleme fonksiyonları
    const [newCategory, setNewCategory] = useState("");
    const [isIncomeCategory, setIsIncomeCategory] = useState(false); // Gelir veya gider için ayrım

    const handleAddCategory = () => {
        if (isIncomeCategory) {
            addIncomeCategory(newCategory); // Gelir kategorisi ekleme
        } else {
            addCategory(newCategory); // Gider kategorisi ekleme
        }
        setNewCategory(""); // Kategori ekleme işleminden sonra formu sıfırlama
    };

    return (
        <div className="categories-container">
            <h1>Kategoriler</h1>
            {/* Kategori Ekleme */}
            <div className="add-category">
                <input
                    type="text"
                    value={newCategory}
                    placeholder="Yeni kategori ekleyin..."
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <div>
                    <label>
                        <input
                            type="radio"
                            name="categoryType"
                            value="income"
                            checked={isIncomeCategory}
                            onChange={() => setIsIncomeCategory(true)}
                        />
                        Gelir
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="categoryType"
                            value="expense"
                            checked={!isIncomeCategory}
                            onChange={() => setIsIncomeCategory(false)}
                        />
                        Gider
                    </label>

                </div>
                <button onClick={handleAddCategory}>Ekle</button>
            </div>

            {/* Mevcut Gelir ve Gider Kategorileri */}
            <div className="category-list">
                <h2>Mevcut Gelir Kategorileri</h2>
                <ul>
                    {incomeCategories.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
                <h2>Mevcut Gider Kategorileri</h2>
                <ul>
                    {expenseCategories.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
            </div>

            {/* Giderleri Listeleme */}
            <div className="transaction-by-category">
                <h2>Kategorilere Göre Giderler</h2>
                {expenseCategories.map((category, index) => {
                    const filteredTransactions = transactions.filter(
                        (transaction) => transaction.type === "expense" && transaction.category === category
                    );

                    return (
                        <div key={index} className="category-transactions">
                            <h3>{category}</h3>
                            {filteredTransactions.length > 0 ? (
                                <ul>
                                    {filteredTransactions.map((transaction, idx) => (
                                        <li key={idx}>
                                            {transaction.description} - {transaction.amount} TL (
                                            {transaction.date})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Bu kategoride harcama yok.</p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Gelirlere Göre Listeleme */}
            <div className="transaction-by-category">
                <h2>Kategorilere Göre Gelirler</h2>
                {incomeCategories.map((category, index) => {
                    const filteredTransactions = transactions.filter(
                        (transaction) => transaction.type === "income" && transaction.category === category
                    );

                    return (
                        <div key={index} className="category-transactions">
                            <h3>{category}</h3>
                            {filteredTransactions.length > 0 ? (
                                <ul>
                                    {filteredTransactions.map((transaction, idx) => (
                                        <li key={idx}>
                                            {transaction.description} - {transaction.amount} TL (
                                            {transaction.date})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Bu kategoride gelir yok.</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Categories;
