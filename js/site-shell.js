(function () {
    "use strict";

    const menuButton = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("nav-links");
    if (!menuButton || !menu) return;

    function closeMenu() {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    }

    document.addEventListener("click", function (event) {
        if (event.target === menuButton || menuButton.contains(event.target)) {
            menu.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(menu.classList.contains("open")));
            return;
        }

        if (menu.contains(event.target)) {
            closeMenu();
            return;
        }

        if (!menuButton.contains(event.target)) closeMenu();
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && menu.classList.contains("open")) {
            closeMenu();
            menuButton.focus();
        }
    });
})();
