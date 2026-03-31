/*~~~~~~~~~~~~~~~ BOTÓN DE ACTIVACIÓN/DESACTIVACIÓN DE MOOD DARK Y LIGHT ~~~~~~~~~~~~~~~*/ 
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
     navMenu.classList.remove("-top-full");
     navMenu.classList.add("top-0");
});

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
function darkMode() { 
     html.classList.add("dark"); 
     themeBtn.classList.remove("fa-moon"); 
     themeBtn.classList.add("fa-sun"); 
     localStorage.setItem("mode", "dark"); 

     cargarParticles("#e3e3e3"); // partículas claras
}

// Light Mode:
function lightMode() {
     html.classList.remove("dark"); 
     themeBtn.classList.remove("fa-sun");  
     themeBtn.classList.add("fa-moon"); 
     localStorage.setItem("mode", "light"); 

     cargarParticles("#062d52"); // partículas oscuras
}

// Cargar Particulas:
function cargarParticles(color) {

     // Elimina partículas anteriores
     const oldCanvas = document.querySelector("#particlesJS canvas");
     if (oldCanvas) {
          oldCanvas.remove();
     }

     particlesJS("particlesJS", {
          particles: {
               number: {
                    value: 27,
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

/*~~~~~~~~~~~~~~~ PESTAÑAS ~~~~~~~~~~~~~~~*/ 
let tabs = document.querySelectorAll(".tab");
let indicador = document.querySelector(".indicador");
const todos = document.querySelectorAll(".work_card");
const frontends = document.querySelectorAll(".frontend");
const backends = document.querySelectorAll(".backend");
const mobiles = document.querySelectorAll(".mobile");

indicador.style.width = tabs[0].getBoundingClientRect().width + "px";
indicador.style.left = tabs[0].getBoundingClientRect().left - tabs[0].parentElement.getBoundingClientRect().left + "px";

tabs.forEach((tab) => {
     tab.addEventListener("click", () => {
          indicador.style.width = tab.getBoundingClientRect().width + "px";
          indicador.style.left = tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + "px";

          tabs.forEach(t => t.classList.remove("text-whiteColor"));
          tab.classList.add("text-whiteColor");

          const tabval = tab.getAttribute("data-tabs");

          todos.forEach(items => {
               items.style.display  = "none";
          });

          if(tabval == "frontend") {
               frontends.forEach(item => {
                    item.style.display = "block";
               });
          } else if(tabval == "backend") {
               backends.forEach(item => {
                    item.style.display = "block";
               });
          } else if(tabval == "mobile") {
               mobiles.forEach(item => {
                    item.style.display = "block";
               });
          } else {
               todos.forEach(items => {
                    items.style.display = "block";
               });
          }
     });
});

/*~~~~~~~~~~~~~~~ CAMBIAR FONDO DEL ENCABEZADO (Header) ~~~~~~~~~~~~~~~*/ 
const scrollHeader = () => {
     const navbar = document.getElementById("navbar");
     const aTag = document.querySelectorAll("nav ul li a");
     const themeBoton = document.getElementById("theme-btn");
     const hamburguesa = document.getElementById("hamburguesa");
     const logoOscuro = document.getElementById("logo-oscuro");

     if(this.scrollY >= 60) {
          navbar.classList.add("bg-[hsla(216,100%,5%,0.85)]");
          aTag.forEach((item) =>{
               item.classList.add("text-whiteColor");
          });

          themeBoton.classList.add("text-whiteColor");
          hamburguesa.classList.add("text-whiteColor");
          logoOscuro.src = "./assets/img/logo.png";          

     } else {
          navbar.classList.remove("bg-[hsla(216,100%,5%,0.85)]");
          aTag.forEach((item) => {
               item.classList.remove("text-whiteColor");
          });
          
          themeBoton.classList.remove("text-whiteColor");
          hamburguesa.classList.remove("text-whiteColor");
          logoOscuro.src = "./assets/img/logoBlack.png";
     }
};

window.addEventListener("scroll", scrollHeader);

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

          if(this.scrollY >= sectionTop - 60) {
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

/*~~~~~~~~~~~~~~~ ANIMACION DE SCROLL PARA REVELARZE ~~~~~~~~~~~~~~~*/ 

/*
  DETECCIÓN DE DISPOSITIVO (MOBILE vs DESKTOP)
  - Usamos 768px como punto de quiebre estándar (Tailwind)
*/
const isMobile = window.innerWidth < 408;

/*
  CONFIGURACIÓN GLOBAL DE SCROLLREVEAL
  - Animación más rápida y ligera
*/
const sr = ScrollReveal({
     origin: "bottom",
     distance: isMobile ? "10px" : "20px",
     duration: isMobile ? 250 : 350,
     delay: isMobile ? 50 : 50,
     easing: "ease-out",
     reset: false,
     mobile: true
});

/*================ SECCIÓN: INICIO ================*/
sr.reveal(".inicio__imagen");
sr.reveal(".inicio__content", { origin: "bottom" });
sr.reveal(".inicio__footer", { origin: "bottom", delay: isMobile ? 50 : 100 });

/*================ SECCIÓN: SERVICIOS ================*/
sr.reveal(".servicio__top", { origin: "bottom" });
sr.reveal(".servicio__elemento", { origin: "bottom", interval: isMobile ? 50 : 80 });

/*================ SECCIÓN: PROYECTOS ================*/
sr.reveal(".proyectos__top", { origin: "bottom" });
sr.reveal(".proyectos__taps", { origin: "bottom", delay: isMobile ? 50 : 100 });
sr.reveal(".work_card", { origin: "bottom", delay: isMobile ? 100 : 150 });

/*================ SECCIÓN: CV ================*/
sr.reveal(".cv__top", { origin: "bottom" });
sr.reveal(".cv_card", { origin: "left", interval: isMobile ? 50 : 80 });

/*================ SECCIÓN: ESTUDIOS ================*/
sr.reveal(".estudios__top", { origin: "bottom" });
sr.reveal(".estudios_card", { origin: "right", interval: isMobile ? 50 : 80 });

/*================ SECCIÓN: BLOG ================*/
sr.reveal(".blog_top", { origin: "top" });
sr.reveal(".blog_card", { origin: "top", interval: isMobile ? 50 : 80 });

/*================ SECCIÓN: CONTACTO ================*/
sr.reveal(".contacto_form", { origin: "left" });
sr.reveal(".contacto_info", { origin: "right", interval: isMobile ? 50 : 80 });

/*~~~~~~~~~~~~~~~ COPIAR NUMERO DE TELEFONO Y CORREO ~~~~~~~~~~~~~~~*/

// Selecciona todos los íconos de copia
const copyIcons = document.querySelectorAll(".copy-icon");

copyIcons.forEach(icon => {
     icon.addEventListener("click", () => {
          const texto = icon.getAttribute("data-copy");
          const tipo = icon.getAttribute("data-text");

          // Copiar al portapapeles
          navigator.clipboard.writeText(texto).then(() => {

               // Crear alerta temporal
               const alerta = document.createElement("div");
               alerta.textContent = `✅ ${tipo} copiado: ${texto}`;
               alerta.className = "fixed bottom-20 right-5 bg-primaryColor text-blob text-white px-9 py-5 rounded-lg shadow-lg opacity-0 animate-fadeInOut z-50";

               document.body.appendChild(alerta);

               // Remover después de 2 segundos
               setTimeout(() => {
                    alerta.remove();
               }, 2000);
          });
     });
});




