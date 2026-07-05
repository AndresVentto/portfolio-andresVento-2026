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

// Inicialización
if (savedMode) {
     savedMode === "dark" ? darkMode() : lightMode();
} else {
     darkMode(); // default oscuro
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
export function cargarParticles(color) {

     // Elimina partículas anteriores
     const oldCanvas = document.querySelector("#particlesJS canvas");
     if (oldCanvas) {
          oldCanvas.remove();
     }

     particlesJS("particlesJS", {
          particles: {
               number: {
                    value: 25,
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
                    speed: 5
               }
          },
          retina_detect: true
     });
}

