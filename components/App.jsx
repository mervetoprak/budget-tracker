import React from "react";
import { TransactionProvider } from "../context/TransactionContext";
import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";
import TransactionChart from "./TransactionChart";

const App = () => {
    return (
        <TransactionProvider>
            <div className="container">
                <h1>Budget Tracker</h1>
                <AddTransaction />
                <TransactionList />
                <TransactionChart />
            </div>
        </TransactionProvider>
    );
};

export default App;
