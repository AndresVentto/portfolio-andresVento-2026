/*~~~~~~~~~~~~~~~ MENÚ DE NAVEGACIÓN (MÓVIL) ~~~~~~~~~~~~~~~*/

export function menuFunciones() {
    const hamburguesa = document.getElementById("hamburguesa");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const closeIcon = document.getElementById("nav-close");

    const isMenuOpen = () => !navMenu.classList.contains("-translate-y-full");

    // Funciones controladoras (aria-expanded avisa a los lectores de pantalla si el menú está abierto)
    const openMenu = () => {
        navMenu.classList.remove("-translate-y-full");
        hamburguesa?.setAttribute("aria-expanded", "true");
        closeIcon?.focus();
    };

    const closeMenu = () => {
        const estabaAbierto = isMenuOpen();
        navMenu.classList.add("-translate-y-full");
        hamburguesa?.setAttribute("aria-expanded", "false");
        // Devolver el foco al botón solo si el menú móvil estaba abierto
        if (estabaAbierto && window.matchMedia("(max-width: 1023px)").matches) {
            hamburguesa?.focus();
        }
    };

    // Abrir menú
    hamburguesa?.addEventListener("click", openMenu);

    // Cerrar menú (X o click en enlace)
    closeIcon?.addEventListener("click", closeMenu);
    navLinks.forEach(link => link.addEventListener("click", closeMenu));

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (isMenuOpen() && !navMenu.contains(e.target) && !hamburguesa.contains(e.target)) {
            closeMenu();
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isMenuOpen()) closeMenu();
    });
}
