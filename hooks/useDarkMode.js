import { useState, useEffect } from "react";

const useDarkMode = () => {

    // İlk durumu localStorage'dan alma veya varsayılan olarak false yapma
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("darkMode") === "true";
        }
        return false;
    });

    // Dark mode durumunu değiştirme ve localStorage'a kaydetme
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            if (typeof window !== "undefined") {
                localStorage.setItem("darkMode", newMode);
            }
            return newMode;
        });
    };

    // İlk render sırasında dark mode'u body'ye uygulama
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    return [darkMode, toggleDarkMode];
};

export default useDarkMode;
