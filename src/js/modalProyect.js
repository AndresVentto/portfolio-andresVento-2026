/*~~~~~~~~~~~~~~~ VENTANAS MODALES ~~~~~~~~~~~~~~~*/ 

export function openModal(id) {
    // Eliminamos 'event' de los parámetros si lo llamas desde onclick simple,
    // o asegúrate de pasarlo. Aquí lo simplificamos:
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.style.overflow = "hidden";
    }
}

export function closeModal(id) { 
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.style.overflow = "";
    }
}

// Mejora para cerrar al hacer click fuera:
window.addEventListener("click", function (e) {
    // Si el usuario hace click en el fondo oscurecido (el div del modal)
    if (e.target.classList.contains('fixed')) {
        closeModal(e.target.id);
    }
});

// ESTA ES LA CLAVE: Hacerlas accesibles al HTML
window.openModal = openModal;
window.closeModal = closeModal;
