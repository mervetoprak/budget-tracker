import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generatePDFReport = (transactions) => {
    const doc = new jsPDF();


    doc.setFont("helvetica");
    doc.setFontSize(18);


    doc.setTextColor(0, 0, 255);
    doc.text("Finansal Rapor", 20, 20);

    // Gelir ve giderlerin listelenmesi
    let yPosition = 30;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Gelir ve Giderler:", 20, yPosition);
    yPosition += 10;

    // Tablo başlıkları
    const tableColumn = ["Açıklama", "Tutar", "Kategori"];
    const tableRows = [];

    // Verileri tabloya ekleme
    transactions.forEach((transaction) => {
        const transactionData = [
            transaction.description,
            `${transaction.amount} TL`,
            transaction.category,
        ];
        tableRows.push(transactionData);
    });


    doc.autoTable(tableColumn, tableRows, {
        startY: yPosition + 10,
        theme: "striped", // Şeritli tablo stili
        headStyles: { fillColor: [255, 99, 132] },
        bodyStyles: { fillColor: [255, 255, 255] },
    });

    // PDF'yi indirme
    doc.save("finansal_rapor.pdf");
};
