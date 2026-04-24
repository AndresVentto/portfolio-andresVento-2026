/*~~~~~~~~~~~~~~~ CAMBIAR FONDO DEL ENCABEZADO (Header) ~~~~~~~~~~~~~~~*/ 

export function scrollHeaderFondo() {

    const scrollHeader = () => {
        const header = document.getElementById("header");
        const aTag = document.querySelectorAll("nav ul li a");
        const themeBoton = document.getElementById("theme-btn");
        const hamburguesa = document.getElementById("hamburguesa");
        const logoOscuro = document.getElementById("logo-oscuro");

        if(window.scrollY >= 60) {
            header.classList.add("bg-[hsla(216,100%,5%,0.90)]");

            aTag.forEach((item) =>{
                item.classList.add("text-whiteColor");
            });

            themeBoton.classList.add("text-whiteColor");
            hamburguesa.classList.add("text-whiteColor");
            logoOscuro.src = "./assets/img/logo.png";          

        } else {
            header.classList.remove("bg-[hsla(216,100%,5%,0.90)]");

            aTag.forEach((item) => {
                item.classList.remove("text-whiteColor");
            });
            
            themeBoton.classList.remove("text-whiteColor");
            hamburguesa.classList.remove("text-whiteColor");
            logoOscuro.src = "./assets/img/logoBlack.png";
        }
    };

    window.addEventListener("scroll", scrollHeader);
}

/*~~~~~~~~~~~~~~~ MOSTRAR BOTÓN DE DESPLAZAMIENTO HACIA ARRIBA ~~~~~~~~~~~~~~~*/ 
const scrollUpBtn = document.getElementById("scroll-up");

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
        if (t < 1) {
            requestAnimationFrame(step);
        }
    };

    step(performance.now());
};

const updateScrollUpBtn = () => {
    if (window.scrollY >= 300) {
        scrollUpBtn.classList.remove("-bottom-28", "opacity-0", "pointer-events-none", "scale-90", "-translate-y-3");
        scrollUpBtn.classList.add("scroll-fab--on", "bottom-6", "md:bottom-8", "opacity-100", "pointer-events-auto", "scale-100", "translate-y-0");
    } else {
        scrollUpBtn.classList.add("-bottom-28", "opacity-0", "pointer-events-none", "scale-90", "-translate-y-3");
        scrollUpBtn.classList.remove("scroll-fab--on", "bottom-6", "md:bottom-8", "opacity-100", "pointer-events-auto", "scale-100", "translate-y-0");
    }
};

window.addEventListener("scroll", updateScrollUpBtn);

updateScrollUpBtn();

scrollUpBtn.addEventListener("click", () => {
    scrollToTopGraceful();
});


/*~~~~~~~~~~~~~~~ ENLACE ACTIVO DE SECCIONES CON DESPLAZAMIENTO ~~~~~~~~~~~~~~~*/ 
const activarLink = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "inicio";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if(window.scrollY >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(item => {
        item.classList.remove('active');
        if(item.href.includes(current)) {
            item.classList.add('active');
        }
    });
}

window.addEventListener("scroll", activarLink);