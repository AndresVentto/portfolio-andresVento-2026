/*~~~~~~~~~~~~~~~ CAMBIAR FONDO DEL ENCABEZADO (Header) ~~~~~~~~~~~~~~~*/ 

export function scrollHeaderFondo() {
    // Seleccionamos los elementos UNA SOLA VEZ fuera del evento para mayor rendimiento
    const header = document.getElementById("header");
    const aTags = document.querySelectorAll("nav ul li a");
    const themeBoton = document.getElementById("theme-btn");
    const hamburguesa = document.getElementById("hamburguesa");
    const logoOscuro = document.getElementById("logo-oscuro");

    const scrollHeader = () => {
        if (window.scrollY >= 60) {
            // Añadimos fondo oscuro al header
            header.classList.add("bg-[hsla(216,100%,5%,0.95)]", "shadow-md");

            // Cambiamos los enlaces a blanco
            aTags.forEach((link) => link.classList.add("text-white"));

            // Aseguramos que los iconos se vean (blanco)
            themeBoton.classList.add("text-white");
            hamburguesa.classList.add("text-white");

            // TRUCO: En lugar de cambiar el src, usamos un filtro para volver el logo negro a blanco
            // Esto evita que el logo "desaparezca" si la imagen no carga rápido o hay conflicto con dark mode
            if (logoOscuro) {
                logoOscuro.style.filter = "brightness(0) invert(1)";
            }

        } else {
            // Volvemos al estado original (transparente/claro)
            header.classList.remove("bg-[hsla(216,100%,5%,0.95)]", "shadow-md");

            aTags.forEach((link) => link.classList.remove("text-white"));
            
            themeBoton.classList.remove("text-white");
            hamburguesa.classList.remove("text-white");

            if (logoOscuro) {
                logoOscuro.style.filter = "none";
            }
        }
    };

    window.addEventListener("scroll", scrollHeader);
    // Llamamos una vez al inicio por si la página ya carga con scroll
    scrollHeader();
}

/*~~~~~~~~~~~~~~~ MOSTRAR BOTÓN DE DESPLAZAMIENTO HACIA ARRIBA ~~~~~~~~~~~~~~~*/ 
const scrollUpBtn = document.getElementById("scroll-up");

// Función de suavizado (Easing)
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

const scrollToTopGraceful = () => {
    const startY = window.scrollY;
    if (startY <= 0) return;

    const duration = Math.min(100, 480 + startY * 0.42);
    const t0 = performance.now();

    const step = (now) => {
        const elapsed = now - t0;
        const t = Math.min(1, elapsed / duration);
        const eased = easeOutQuint(t);
        window.scrollTo(0, startY * (1 - eased));
        if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};

const updateScrollUpBtn = () => {
    if (!scrollUpBtn) return; // Seguridad por si el ID no existe en el HTML
    
    if (window.scrollY >= 300) {
        scrollUpBtn.classList.remove("-bottom-28", "opacity-0", "pointer-events-none");
        scrollUpBtn.classList.add("bottom-6", "opacity-100", "pointer-events-auto");
    } else {
        scrollUpBtn.classList.add("-bottom-28", "opacity-0", "pointer-events-none");
        scrollUpBtn.classList.remove("bottom-6", "opacity-100", "pointer-events-auto");
    }
};

window.addEventListener("scroll", updateScrollUpBtn);
if (scrollUpBtn) scrollUpBtn.addEventListener("click", scrollToTopGraceful);

/*~~~~~~~~~~~~~~~ ENLACE ACTIVO DE SECCIONES ~~~~~~~~~~~~~~~*/ 
const activarLink = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        // Ajustamos el offset para que el cambio sea más natural
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((item) => {
        item.classList.remove("active");
        // Verificamos si el href termina en el ID actual
        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
};

window.addEventListener("scroll", activarLink);