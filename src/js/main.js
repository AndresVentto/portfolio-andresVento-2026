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

/*~~~~~~~~~~~~~~~ FILTRO DE PROYECTOS ~~~~~~~~~~~~~~~*/ 
let tabs = document.querySelectorAll(".tab");
let indicador = document.querySelector("#indicador");

const todos = document.querySelectorAll(".work_card");
const frontends = document.querySelectorAll(".frontend");
const sistemas = document.querySelectorAll(".sistema");
const mobiles = document.querySelectorAll(".mobile");

// 🔥 Función reutilizable (más limpio)
function moverIndicador(tab) {
     const tabRect = tab.getBoundingClientRect();
     const parentRect = tab.parentElement.getBoundingClientRect();

     indicador.style.width = tabRect.width + "px";
     indicador.style.transform = `translateX(${tabRect.left - parentRect.left}px)`;
}

// Estado inicial
moverIndicador(tabs[0]);
tabs[0].classList.add("text-whiteColor");

tabs.forEach((tab) => {
     tab.addEventListener("click", () => {

          // 🔥 Movimiento fluido
          moverIndicador(tab);

          // Activar color
          tabs.forEach(t => t.classList.remove("text-whiteColor"));
          tab.classList.add("text-whiteColor");

          const tabval = tab.getAttribute("data-tabs");

          // Ocultar todos
          todos.forEach(items => items.style.display = "none");

          // Mostrar según filtro
          if(tabval === "frontend") {
               frontends.forEach(item => item.style.display = "block");

          } else if(tabval === "sistema") {
               sistemas.forEach(item => item.style.display = "block");

          } else if(tabval === "mobile") {
               mobiles.forEach(item => item.style.display = "block");

          } else {
               todos.forEach(items => items.style.display = "block");
          }
     });
});

window.addEventListener("resize", () => {
     const activeTab = document.querySelector(".tab.text-whiteColor");
     if(activeTab) moverIndicador(activeTab);
});

/*~~~~~~~~~~~~~~~ CAMBIAR FONDO DEL ENCABEZADO (Header) ~~~~~~~~~~~~~~~*/ 
const scrollHeader = () => {
     const header = document.getElementById("header");
     const aTag = document.querySelectorAll("nav ul li a");
     const themeBoton = document.getElementById("theme-btn");
     const hamburguesa = document.getElementById("hamburguesa");
     const logoOscuro = document.getElementById("logo-oscuro");

     if(this.scrollY >= 60) {
          header.classList.add("bg-[hsla(216,100%,5%,0.85)]");
          aTag.forEach((item) =>{
               item.classList.add("text-whiteColor");
          });

          themeBoton.classList.add("text-whiteColor");
          hamburguesa.classList.add("text-whiteColor");
          logoOscuro.src = "./assets/img/logo.png";          

     } else {
          header.classList.remove("bg-[hsla(216,100%,5%,0.85)]");
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

/*================ SECCIÓN: SOBRE MÍ ================*/
sr.reveal(".sobre_mi__top", { origin: "bottom" });
sr.reveal(".sobre_mi__content", { origin: "bottom", delay: isMobile ? 50 : 100 });

/*================ SECCIÓN: PROYECTOS ================*/
sr.reveal(".proyectos__top", { origin: "bottom" });
sr.reveal(".proyectos__taps", { origin: "bottom", delay: isMobile ? 50 : 100 });

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
          const texto = icon.dataset.copy;
          const tipo = icon.dataset.text;

          navigator.clipboard.writeText(texto).then(() => {
               // Posición relativa al icono
               const rect = icon.getBoundingClientRect();
               const alerta = document.createElement("div");

               alerta.textContent = `${tipo} Copiado ✅ `;
               alerta.className = `
                    absolute bg-primaryColor text-white px-4 py-2 rounded-lg shadow-lg
                    text-sm md:text-base z-50 animate-fadeInOut pointer-events-none
               `;

               document.body.appendChild(alerta);

               // Posiciónar alerta cerca del icono
               alerta.style.top = `${rect.top - 40 + window.scrollY}px`;
               alerta.style.left = `${rect.left + rect.width/2 - alerta.offsetWidth/2}px`;

               // Remover después de la animación
               alerta.addEventListener("animationend", () => alerta.remove());
          });
     });
});

/*~~~~~~~~~~~~~~~ VALIDACIÓN DE FORMULARIO ~~~~~~~~~~~~~~~*/
/*~~~~~~~~~~~~~~~ LÓGICA DE FORMULARIO MEJORADA ~~~~~~~~~~~~~~~*/
const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const btnIcon = document.getElementById("btn-icon");
const toast = document.getElementById("toast");
const charCount = document.getElementById("char-count");

const config = {
    fullname: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/, required: true },
    subject: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/, required: true }, 
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, required: true },
    message: { regex: /^[\s\S]{10,2000}$/, required: true }
};

const fields = Object.keys(config);

// --- FUNCIONES AUXILIARES ---

function showToast() {
    toast.classList.remove("translate-y-32", "opacity-0");
    setTimeout(() => toast.classList.add("translate-y-32", "opacity-0"), 4000);
}

function validateField(input, id) {
    const container = input.parentElement.tagName === 'DIV' ? input.parentElement : input.closest('.space-y-2');
    const icon = container.querySelector(".icon");
    const emptyError = container.querySelector(".error-empty");
    const invalidError = container.querySelector(".error-invalid");
    const success = container.querySelector(".success");
    const value = input.value.trim();

    // Reset styles
    [emptyError, invalidError, success].forEach(el => el?.classList.add("hidden"));
    input.classList.remove("border-red-500", "border-green-500", "border-blue-500", "ring-1", "ring-blue-500");

    if (config[id].required && value === "") {
        emptyError?.classList.remove("hidden");
        input.classList.add("border-red-500");
        if (icon) icon.textContent = "⚠️";
        return false;
    }

    if (config[id].regex && value !== "" && !config[id].regex.test(value)) {
        invalidError?.classList.remove("hidden");
        input.classList.add("border-red-500");
        if (icon) icon.textContent = "❌";
        return false;
    }

    if (value !== "") {
        success?.classList.remove("hidden");
        input.classList.add("border-green-500");
        if (icon) icon.textContent = "✅";
        return true;
    }
    return true;
}

function resetAll() {
    fields.forEach(id => {
        const input = document.getElementById(id);
        input.classList.remove("border-red-500", "border-green-500", "border-blue-500", "ring-1", "ring-blue-500");
        const container = input.closest('.space-y-2');
        const icon = container.querySelector(".icon");
        if (icon) icon.textContent = "";
        container.querySelectorAll(".error-empty, .error-invalid, .success").forEach(m => m.classList.add("hidden"));
    });
    charCount.textContent = "0";
    charCount.classList.replace("text-red-500", "text-gray-500");
}

// --- EVENTOS ---

fields.forEach((id, index) => {
    const input = document.getElementById(id);

    input.addEventListener("focus", () => {
        // Mejorado: Solo azul en focus, no rojo preventivo
        if (!input.classList.contains("border-red-500")) {
            input.classList.add("border-blue-500", "ring-1", "ring-blue-500");
        }
    });

    input.addEventListener("input", () => {
        validateField(input, id);
        if (id === "message") {
            charCount.textContent = input.value.length;
            input.value.length >= 1950 ? charCount.classList.add("text-red-500") : charCount.classList.remove("text-red-500");
        }
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach(id => {
        if (!validateField(document.getElementById(id), id)) isValid = false;
    });

    if (isValid) {
        // Efecto Loading en Botón
        const originalText = submitBtn.querySelector("span").textContent;
        submitBtn.disabled = true;
        submitBtn.querySelector("span").textContent = "Enviando...";
        btnIcon.className = "fa fa-spinner animate-spin";

        // Simulación de envío (1 seg)
        setTimeout(() => {
            showToast();
            form.reset();
            resetAll();
            
            // Volver botón a la normalidad
            submitBtn.disabled = false;
            submitBtn.querySelector("span").textContent = originalText;
            btnIcon.className = "fa fa-paper-plane";
        }, 1000);
    }
});


// Funcion del modal de proyectos

function openModal(id) {
     const modal = document.getElementById(id);
     modal.classList.remove("hidden");
     modal.classList.add("flex");
}

function closeModal(id) {
     const modal = document.getElementById(id);
     modal.classList.add("hidden");
     modal.classList.remove("flex");
}

// Cerrar al hacer click fuera
window.addEventListener("click", function(e) {
     const modal = document.getElementById("modal-project-1");
     if (e.target === modal) {
          closeModal("modal-project-1");
     }
});