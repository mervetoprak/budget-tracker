import React, { useEffect } from "react";
import { TransactionProvider } from "../context/TransactionContext";
import { BudgetProvider } from "../context/BudgetContext";
import useDarkMode from "../hooks/useDarkMode";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
    const [darkMode, toggleDarkMode] = useDarkMode();

    return (
        <>
            <button
                onClick={toggleDarkMode}
                className="dark-mode-toggle"
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "100px",
                    backgroundColor: darkMode ? "#333" : "#fff",
                    color: darkMode ? "#fff" : "#333",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: "bold"
                }}
            >
                {darkMode ? "Gündüz Moduna Geç" : "Gece Moduna Geç"}
            </button>

            <TransactionProvider>
                <BudgetProvider>
                    <Component {...pageProps} />
                </BudgetProvider>
            </TransactionProvider>
        </>
    );
};
export default App;
