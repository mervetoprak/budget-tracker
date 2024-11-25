import React, { useState } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import { Bar, Pie } from "react-chartjs-2";
import { generatePDFReport } from "../utils/pdfReport";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

// Chart.js modüllerini kaydetme
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Report = () => {
    const { transactions } = useTransactionContext();
    const [filterType, setFilterType] = useState("monthly"); // Aylık veya yıllık seçim
    const [selectedDate, setSelectedDate] = useState(""); // Kullanıcının seçtiği ay veya yıl

    const filteredTransactions = transactions.filter((transaction) => {
        if (!selectedDate) return true;

        const transactionDate = new Date(transaction.date);
        const [year, month] = selectedDate.split("-");

        if (filterType === "monthly") {
            return (
                transactionDate.getFullYear().toString() === year &&
                (transactionDate.getMonth() + 1).toString().padStart(2, "0") === month
            );
        }

        if (filterType === "yearly") {
            return transactionDate.getFullYear().toString() === year;
        }

        return true;
    });

    // Gelir ve giderleri kategorilere göre ayırma
    const incomeTransactions = filteredTransactions.filter((t) => t.type === "income");
    const expenseTransactions = filteredTransactions.filter((t) => t.type === "expense");

    // Grafik verileri
    const incomeData = {
        labels: incomeTransactions.map((t) => t.category), // Kategoriler
        datasets: [
            {
                label: "Gelir",
                data: incomeTransactions.map((t) => t.amount), // Tutarlar
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const expenseData = {
        labels: expenseTransactions.map((t) => t.category), // Kategoriler
        datasets: [
            {
                label: "Gider",
                data: expenseTransactions.map((t) => t.amount), // Tutarlar
                backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
        ],
    };

    const pieData = {
        labels: ["Gelir", "Gider"],
        datasets: [
            {
                data: [
                    incomeTransactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0),
                    expenseTransactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0),
                ],
                backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
            },
        ],
    };

    return (
        <div className="report-container">
            <h1>Raporlama ve Analiz</h1>

            {/* PDF Olarak İndir Butonu */}
            <div className="pdf-download">
                <button
                    onClick={() => generatePDFReport(transactions)}
                    className="btn-download"
                >
                    PDF Olarak İndir
                </button>
            </div>

            <div className="filter-form">
                <label>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="monthly">Aylık</option>
                        <option value="yearly">Yıllık</option>
                    </select>
                </label>
                <input
                    type={filterType === "monthly" ? "month" : "number"}
                    placeholder={filterType === "monthly" ? "YYYY-MM" : "YYYY"}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            {/* Grafikler */}
            <div className="chart-container">
                <h2>Gelir ve Gider Dağılımı (Pasta Grafiği)</h2>
                <Pie data={pieData} />

                <h2>Gelirler (Çubuk Grafiği)</h2>
                <Bar data={incomeData} />

                <h2>Giderler (Çubuk Grafiği)</h2>
                <Bar data={expenseData} />
            </div>
        </div>
    );
};
export default Report;