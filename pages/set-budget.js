import React, { useState } from "react";
import { useBudgetContext } from "../context/BudgetContext";

const SetBudget = () => {
    const { expenseCategories = [], setBudgetLimit } = useBudgetContext(); // Gider kategorileri ve limit belirleme fonksiyonu
    const [budget, setBudget] = useState({ category: "", limit: "" });
    const [budgetList, setBudgetList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (budget.category && budget.limit) {
            // Budget listesine yeni limit ekleme
            setBudgetList((prevList) => [...prevList, budget]);
            setBudget({ category: "", limit: "" }); // Formu sıfırlama
            setBudgetLimit(budget.category, budget.limit);
        } else {
            alert("Kategori ve limit girmeniz gerekiyor.");
        }
    };

    return (
        <div className="form-container">
            <h2>Bütçe Limiti Belirle</h2>
            <form onSubmit={handleSubmit}>

                <select
                    value={budget.category}
                    onChange={(e) => setBudget({ ...budget, category: e.target.value })}
                    required
                >
                    <option value="">Kategori Seçin</option>
                    {expenseCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>


                <input
                    type="number"
                    placeholder="Limit"
                    value={budget.limit}
                    onChange={(e) => setBudget({ ...budget, limit: e.target.value })}
                    required
                />

                <button type="submit">Kaydet</button>
            </form>

            <div className="budget-limit-list">
                <h3>Belirlenen Bütçe Limitleri:</h3>
                <ul>
                    {budgetList.map((item, index) => (
                        <li key={index}>
                            {item.category}: {item.limit} TL
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default SetBudget;
