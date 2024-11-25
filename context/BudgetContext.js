import React, { createContext, useState, useContext } from "react";
export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState({});
    const [expenseCategories, setExpenseCategories] = useState(["Yiyecek", "Ulaşım", "Eğlence", "Fatura", "Kira"]);
    const [incomeCategories, setIncomeCategories] = useState(["Maaş", "Freelance", "Satış"]);

    const setBudgetLimit = (category, limit) => {
        setBudgets((prev) => ({
            ...prev,
            [category]: { ...prev[category], limit: parseFloat(limit), total: prev[category]?.total || 0 },
        }));
    };

    // Gelir kategorisi ekleme
    const addIncomeCategory = (newCategory) => {
        if (!incomeCategories.includes(newCategory) && newCategory.trim() !== "") {
            setIncomeCategories((prevCategories) => [...prevCategories, newCategory]);
        }
    };

    // Gider kategorisi ekleme
    const addCategory = (newCategory) => {
        if (!expenseCategories.includes(newCategory) && newCategory.trim() !== "") {
            setExpenseCategories((prevCategories) => [...prevCategories, newCategory]);
        }
    };

    return (
        <BudgetContext.Provider
            value={{
                budgets,
                setBudgetLimit,
                expenseCategories,
                addCategory,
                incomeCategories,
                addIncomeCategory, // addIncomeCategory fonksiyonu burada sağlanıyor
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudgetContext = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error("useBudgetContext must be used within a BudgetProvider");
    }
    return context;
};
