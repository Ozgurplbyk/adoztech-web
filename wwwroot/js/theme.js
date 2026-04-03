(function () {
    var storageKey = "adoztech-theme";
    var root = document.documentElement;
    var labels = {
        light: { tr: "Acik tema", en: "Light theme" },
        dark: { tr: "Koyu tema", en: "Dark theme" }
    };

    function currentCulture() {
        var lang = root.getAttribute("lang") || "tr";
        return lang.toLowerCase() === "en" ? "en" : "tr";
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        try {
            localStorage.setItem(storageKey, theme);
        } catch (error) {
        }

        var label = document.querySelector("[data-theme-label]");
        if (label) {
            label.textContent = theme === "dark" ? labels.dark[currentCulture()] : labels.light[currentCulture()];
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        var toggle = document.querySelector("[data-theme-toggle]");
        if (!toggle) {
            return;
        }

        var theme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        applyTheme(theme);

        toggle.addEventListener("click", function () {
            applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
        });
    });
}());
