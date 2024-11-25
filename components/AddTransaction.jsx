import React, { useState } from "react";
import { useTransactions } from '../context/TransactionContext';

const AddTransaction = () => {
    const {addTransaction} = useTransactions();
    const [transaction, setTransaction] = useState({
        description: "",
        amount: "",
        date: "",
        type: "expense",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTransaction({
            ...transaction,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (transaction.description && transaction.amount && transaction.date) {
            addTransaction(transaction);
            setTransaction({
                description: "",
                amount: "",
                date: "",
                type: "expense",
            });
        } else {
            alert("Tüm alanları doldurun!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="description"
                placeholder="Açıklama"
                value={transaction.description}
                onChange={handleChange}
            />
            <input
                type="number"
                name="amount"
                placeholder="Tutar"
                value={transaction.amount}
                onChange={handleChange}
            />
            <input
                type="date"
                name="date"
                value={transaction.date}
                onChange={handleChange}
            />
            <div>
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="income"
                        checked={transaction.type === "income"}
                        onChange={handleChange}
                    />
                    Gelir
                </label>
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="expense"
                        checked={transaction.type === "expense"}
                        onChange={handleChange}
                    />
                    Gider
                </label>
            </div>
            <button type="submit">Ekle</button>
        </form>
    );
};

export default AddTransaction;
