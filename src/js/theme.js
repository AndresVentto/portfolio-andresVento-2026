/*~~~~~~~~~~~~~~~ TEMA OSCURO/CLARO ~~~~~~~~~~~~~~~*/
const html = document.documentElement;
const themeBtn = document.getElementById("theme-btn");
const themeIcon = themeBtn?.querySelector("#theme-icon");
const savedMode = localStorage.getItem("mode");

function actualizarIconoTema(mode) {
     if (!themeIcon) return;

     themeIcon.classList.remove("fa-moon", "fa-sun", "fa-regular");

     if (mode === "dark") {
          themeIcon.classList.add("fa-regular", "fa-sun");
     } else {
          themeIcon.classList.add("fa-regular", "fa-moon");
     }
}

// Toggle
themeBtn?.addEventListener("click", () => {
     if (html.classList.contains("dark")) {
          lightMode();
     } else {
          darkMode();
     }
});

// Dark Mode: 
export function darkMode() {
     html.classList.add("dark");
     actualizarIconoTema("dark");
     localStorage.setItem("mode", "dark");

     cargarParticles("#e3e3e3"); // partículas claras
}

// Light Mode:
export function lightMode() {
     html.classList.remove("dark");
     actualizarIconoTema("light");
     localStorage.setItem("mode", "light");

     cargarParticles("#062d52"); // partículas oscuras
}

// Cargar Particulas:
const esMovil = window.matchMedia("(max-width: 768px)").matches;
let particulasVisibles = true;

function instanciaParticles() {
     return window.pJSDom?.[0]?.pJS;
}

function pausarParticles() {
     const pJS = instanciaParticles();
     if (pJS) cancelAnimationFrame(pJS.fn.drawAnimFrame);
}

function reanudarParticles() {
     const pJS = instanciaParticles();
     if (!pJS || !particulasVisibles || document.hidden) return;
     cancelAnimationFrame(pJS.fn.drawAnimFrame);
     pJS.fn.vendors.draw();
}

// Pausar la animación cuando el hero no está en pantalla o la pestaña está oculta
const contenedorParticles = document.getElementById("particlesJS");
if (contenedorParticles) {
     new IntersectionObserver(([entry]) => {
          particulasVisibles = entry.isIntersecting;
          particulasVisibles ? reanudarParticles() : pausarParticles();
     }).observe(contenedorParticles);
}
document.addEventListener("visibilitychange", () => {
     document.hidden ? pausarParticles() : reanudarParticles();
});

export function cargarParticles(color) {
     if (typeof window.particlesJS !== "function") return;

     // Destruir la instancia anterior (si solo se borra el canvas, su animación sigue corriendo)
     const anterior = instanciaParticles();
     if (anterior) anterior.fn.vendors.destroypJS();
     window.pJSDom = [];

     particlesJS("particlesJS", {
          particles: {
               number: {
                    value: esMovil ? 14 : 25,
                    density: {
                         enable: true,
                         value_area: 800
                    }
               },
               color: {
                    value: color
               },
               shape: {
                    type: "circle",
                    stroke: {
                         width: 2.5,
                         color: color
                    }
               },
               opacity: {
                    value: 0.5
               },
               size: {
                    value: 1.7,
                    random: true
               },
               line_linked: {
                    enable: true,
                    distance: 150,
                    color: color,
                    opacity: 0.4,
                    width: 1.7
               },
               move: {
                    enable: true,
                    speed: esMovil ? 2.5 : 3.5
               }
          },
          // En celular la densidad retina duplica los píxeles a dibujar
          retina_detect: !esMovil
     });

     if (!particulasVisibles) pausarParticles();
}

// Inicialización
if (savedMode) {
     savedMode === "dark" ? darkMode() : lightMode();
} else {
     darkMode(); // default oscuro
}
