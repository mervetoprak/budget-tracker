import React from "react";
import Link from "next/link";

const HomePage = () => {
    return (
        <div className="container">
            <h1>Bütçe Takibi</h1>
            <nav>
                <Link href="/add-income">Gelir Ekle</Link>
                <Link href="/add-expense">Gider Ekle</Link>
                <Link href="/set-budget">Bütçe Limiti Belirle</Link>
                <Link href="/categories">Kategoriler</Link>
                <Link href="/report">Raporlama</Link>
                <Link href="/savings">Tasarruf Önerileri</Link>
            </nav>
        </div>
    );
};
export default HomePage;
