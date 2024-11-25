import React from "react";
import { useTransactionContext } from "../context/TransactionContext";
import { useBudgetContext } from "../context/BudgetContext";

const Savings = () => {
    const { transactions } = useTransactionContext();
    const { budgets, expenseCategories } = useBudgetContext(); // Kullanıcının belirlediği limitler ve gider kategorileri

    // Kategorilere göre toplam harcamayı hesaplama
    const calculateCategoryExpenses = (transactions, category) => {
        return transactions
            .filter(
                (transaction) =>
                    transaction.category === category && transaction.type === "expense"
            )
            .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    };

    // Tasarruf önerileri oluşturma
    const generateSavingsSuggestions = () => {
        const suggestions = [];
        for (const category in budgets) {
            const limit = budgets[category]?.limit || 0;
            const totalExpense = calculateCategoryExpenses(transactions, category);

            if (totalExpense >= limit * 0.8) {
                let suggestion = "";

                // Kategoriye özel öneriler
                switch (category) {
                    case "Yiyecek":
                        suggestion =
                            "Bu kategoride harcamalarınız limitin %80'ine ulaştı. Dışardan yemek yerine evde yemek yapabilirsiniz.";
                        break;
                    case "Fatura":
                        suggestion =
                            "Bu kategoride harcamalarınız limitin %80'ine ulaştı. Kullanmadığınız kaynakları kapatarak tasarruf edebilirsiniz.";
                        break;
                    case "Eğlence":
                        suggestion =
                            "Bu kategoride harcamalarınız limitin %80'ine ulaştı. Gereksiz abonelikleri iptal edebilir ve ücretsiz etkinliklere katılabilirsiniz.";
                        break;
                    case "Ulaşım":
                        suggestion =
                            "Bu kategoride harcamalarınız limitin %80'ine ulaştı. Bazen toplu taşıma kullanarak tasarruf sağlayabilirsiniz.";
                        break;
                    case "Kira":
                        suggestion =
                            "Bu kategoride harcamalarınız limitin %80'ine ulaştı. Kira ücreti daha uygun bir eve taşınmayı düşünebilirsiniz.";
                        break;
                    default:
                        // Yeni eklenen kategoriler için genel öneri
                        suggestion =
                            "Bu kategoride harcamalarınız limitin %80'ine ulaştı. Daha dikkatli harcama yapmayı düşünebilirsiniz.";
                        break;
                }

                suggestions.push({
                    category,
                    suggestion,
                });
            }
        }
        return suggestions;
    };

    const suggestions = generateSavingsSuggestions();

    return (
        <div className="savings-container">
            <h1>Tasarruf Önerileri</h1>
            {suggestions.length > 0 ? (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            <strong>{suggestion.category}:</strong> {suggestion.suggestion}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    Tüm kategorilerdeki harcamalarınız kontrol altına alınmış durumda. Harcama limitlerine uyduğunuz için tasarruf önerisi bulunmamaktadır.
                </p>
            )}
        </div>
    );
};
export default Savings;
