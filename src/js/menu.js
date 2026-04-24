/*~~~~~~~~~~~~~~~ BOTÓN DE ACTIVACIÓN/DESACTIVACIÓN DE MOOD DARK Y LIGHT ~~~~~~~~~~~~~~~*/ 

export function menuFunciones() {
    const hamburguesa = document.getElementById("hamburguesa"); 
    const navMenu = document.getElementById("nav-menu"); 
    const navLink = document.querySelectorAll(".nav-link"); 
    const closeIcon = document.getElementById("nav-close"); 

    // ================= MENU RESPONSIVE CON ANIMACIÓN SUAVE =================

    // Cuando se hace click en cualquier link del menú
    navLink.forEach((link) => {
        link.addEventListener("click", () => {
            // Oculta el menú deslizándolo hacia arriba (animación)
            navMenu.classList.remove("top-0");
            navMenu.classList.add("-top-full");
        });
    });

    // Botón de cerrar (X)
    closeIcon.addEventListener("click", () => {
        // Misma lógica: lo escondemos hacia arriba
        navMenu.classList.remove("top-0");
        navMenu.classList.add("-top-full");
    });

    // Botón hamburguesa (abrir menú)
    hamburguesa.addEventListener("click", () => {
        // Mostramos el menú bajándolo suavemente
        navMenu.classList.remove("-top-full", "invisible", "opacity-0");
        navMenu.classList.add("top-0", "visible", "opacity-100");
    });

    // Cerrar menú al hacer click fuera del contenido
    document.addEventListener("click", (e) => {
        const isMenuOpen = navMenu.classList.contains("top-0");

        if (isMenuOpen) {
        // Si el click NO fue dentro del menú ni en la hamburguesa
            if (!navMenu.contains(e.target) && !hamburguesa.contains(e.target)) {
                navMenu.classList.remove("top-0");
                navMenu.classList.add("-top-full");
            }
        }
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                navMenu.classList.remove("top-0");
                navMenu.classList.add("-top-full");
            }
        });
    });
}

