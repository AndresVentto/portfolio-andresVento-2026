/*~~~~~~~~~~~~~~~ BOTÓN DE ACTIVACIÓN/DESACTIVACIÓN DE MOOD DARK Y LIGHT ~~~~~~~~~~~~~~~*/ 

export function menuFunciones() {
    const hamburguesa = document.getElementById("hamburguesa"); 
    const navMenu = document.getElementById("nav-menu"); 
    const navLinks = document.querySelectorAll(".nav-link"); 
    const closeIcon = document.getElementById("nav-close"); 

    // Funciones controladoras
    const openMenu = () => navMenu.classList.remove("-translate-y-full");
    const closeMenu = () => navMenu.classList.add("-translate-y-full");

    // Abrir menú
    hamburguesa?.addEventListener("click", openMenu);

    // Cerrar menú (X o click en enlace)
    closeIcon?.addEventListener("click", closeMenu);
    navLinks.forEach(link => link.addEventListener("click", closeMenu));

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
        const isMenuOpen = !navMenu.classList.contains("-translate-y-full");
        
        if (isMenuOpen && !navMenu.contains(e.target) && !hamburguesa.contains(e.target)) {
            closeMenu();
        }
    });

    // Cerrar con tecla Escape (Corregido: ahora está en el root)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
}
