import React, { useState } from "react";

const ExpenseCategories = () => {
    const [categories, setCategories] = useState(["Gıda", "Ulaşım", "Eğlence"]);

    return (
        <div className="container">
            <h2>Harcama Kategorileri</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
            <button onClick={() => setCategories([...categories, "Yeni Kategori"])}>Kategori Ekle</button>
        </div>
    );
};
export default ExpenseCategories;
