/*~~~~~~~~~~~~~~~ TEMA OSCURO/CLARO ~~~~~~~~~~~~~~~*/ 
const html = document.documentElement;
const themeBtn = document.getElementById("theme-btn");
const savedMode = localStorage.getItem("mode");

// Inicialización
if (savedMode) {
     savedMode === "dark" ? darkMode() : lightMode();
} else {
     darkMode(); // default oscuro
}

// Toggle
themeBtn.addEventListener("click", () => { 
     if (html.classList.contains("dark")) {
          lightMode();
     } else {
          darkMode();
     }
});

// Dark Mode: 
export function darkMode() { 
     html.classList.add("dark"); 
     themeBtn.classList.remove("fa-moon"); 
     themeBtn.classList.add("fa-sun"); 
     localStorage.setItem("mode", "dark"); 

     cargarParticles("#e3e3e3"); // partículas claras
}

// Light Mode:
export function lightMode() {
     html.classList.remove("dark"); 
     themeBtn.classList.remove("fa-sun");  
     themeBtn.classList.add("fa-moon"); 
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
                    value: 1.6,
                    random: true
               },
               line_linked: {
                    enable: true,
                    distance: 150,
                    color: color,
                    opacity: 0.4,
                    width: 1.6
               },
               move: {
                    enable: true,
                    speed: 5
               }
          },
          retina_detect: true
     });
}

