import React, { useContext } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import { generatePDFReport } from "../utils/pdfReport";

const Report = () => {
    const { transactions } = useTransactionContext();

    return (
        <div className="container">
            <h1>Finansal Rapor</h1>
            <div>
                <div className="pdf-download">
                    <button
                        onClick={() => generatePDFReport(transactions)}
                        className="btn-download"
                    >
                        PDF Olarak İndir
                    </button>
                </div>
            </div>

            <h2>Gelir ve Giderler</h2>
            <table>
                <thead>
                <tr>
                    <th>Açıklama</th>
                    <th>Tutar</th>
                    <th>Kategori</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td>{transaction.description}</td>
                        <td>{transaction.amount} TL</td>
                        <td>{transaction.category}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default Report;
