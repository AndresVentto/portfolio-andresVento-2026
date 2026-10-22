/*~~~~~~~~~~~~~~~ CAMBIAR FONDO DEL ENCABEZADO (Header) ~~~~~~~~~~~~~~~*/
/* Todos los efectos de scroll comparten UN solo listener (pasivo) agrupado con
   requestAnimationFrame, y solo tocan el DOM cuando el estado realmente cambia. */

const header = document.getElementById("header");
const aTag = document.querySelectorAll("#nav-menu ul li a");
const themeBoton = document.getElementById("theme-btn");
const hamburguesa = document.getElementById("hamburguesa");
const logoOscuro = document.getElementById("logo-oscuro");
const scrollUpBtn = document.getElementById("scroll-up");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

let headerSolido = null;
let botonVisible = null;
let seccionActual = null;
let offsetsSecciones = [];
let ticking = false;

const actualizarHeader = (y) => {
     const solido = y >= 60;
     if (solido === headerSolido) return;
     headerSolido = solido;

     header?.classList.toggle("bg-[hsla(216,100%,5%,0.90)]", solido);
     aTag.forEach((item) => item.classList.toggle("text-whiteColor", solido));
     themeBoton?.classList.toggle("text-whiteColor", solido);
     hamburguesa?.classList.toggle("text-whiteColor", solido);
     if (logoOscuro) {
          logoOscuro.src = solido ? "./assets/img/brand/logo.webp" : "./assets/img/brand/logoBlack.webp";
     }
};

/*~~~~~~~~~~~~~~~ MOSTRAR BOTÓN DE DESPLAZAMIENTO HACIA ARRIBA ~~~~~~~~~~~~~~~*/
const CLASES_OCULTO = ["-bottom-28", "opacity-0", "pointer-events-none", "scale-90", "-translate-y-3"];
const CLASES_VISIBLE = ["scroll-fab--on", "bottom-6", "md:bottom-8", "opacity-100", "pointer-events-auto", "scale-100", "translate-y-0"];

const actualizarBotonArriba = (y) => {
     if (!scrollUpBtn) return;
     const visible = y >= 300;
     if (visible === botonVisible) return;
     botonVisible = visible;

     scrollUpBtn.classList.remove(...(visible ? CLASES_OCULTO : CLASES_VISIBLE));
     scrollUpBtn.classList.add(...(visible ? CLASES_VISIBLE : CLASES_OCULTO));
};

const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

const scrollToTopGraceful = () => {
     const startY = window.scrollY;
     if (startY <= 0) return;

     // Entre 400ms y 900ms según la distancia
     const duration = Math.min(900, 400 + startY * 0.15);
     const t0 = performance.now();

     const step = (now) => {
          const t = Math.min(1, (now - t0) / duration);
          // "instant" evita que el scroll-smooth del <html> pelee con cada frame
          window.scrollTo({ top: startY * (1 - easeOutQuint(t)), behavior: "instant" });
          if (t < 1) requestAnimationFrame(step);
     };

     requestAnimationFrame(step);
};

scrollUpBtn?.addEventListener("click", scrollToTopGraceful);


/*~~~~~~~~~~~~~~~ ENLACE ACTIVO DE SECCIONES CON DESPLAZAMIENTO ~~~~~~~~~~~~~~~*/
// Las posiciones se calculan solo cuando cambia el tamaño de la página, no en cada scroll
const medirSecciones = () => {
     offsetsSecciones = Array.from(sections, (section) => ({
          id: section.id,
          top: section.getBoundingClientRect().top + window.scrollY
     }));
};

const activarLink = (y) => {
     let current = "inicio";
     for (const { id, top } of offsetsSecciones) {
          if (y >= top - 60) current = id;
     }
     if (current === seccionActual) return;
     seccionActual = current;

     navLinks.forEach((item) => {
          item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
     });
};

const onScroll = () => {
     if (ticking) return;
     ticking = true;
     requestAnimationFrame(() => {
          const y = window.scrollY;
          actualizarHeader(y);
          actualizarBotonArriba(y);
          activarLink(y);
          ticking = false;
     });
};

export function scrollHeaderFondo() {
     medirSecciones();
     // Los proyectos cargan después desde Supabase y cambian la altura de la página
     new ResizeObserver(() => {
          medirSecciones();
          onScroll();
     }).observe(document.body);

     window.addEventListener("scroll", onScroll, { passive: true });
     onScroll();
}
