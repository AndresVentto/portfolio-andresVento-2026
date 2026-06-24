// main.js
import { menuFunciones } from './menu.js';
import { darkMode, lightMode, cargarParticles } from './theme.js';
import { scrollHeaderFondo } from './scroll.js';
import { moverIndicador, inicializarProyectos } from './proyectos.js'; // 1. Agregamos inicializarProyectos
import { copyAr, renderContacto } from './copy.js';
import { initContactForm } from './contact.js'; 
// Nota: Ya no necesitas importar openModal/closeModal aquí si se manejan dentro de proyectos.js/modalProyect.js

// Ejecución de las funciones estáticas del portafolio
menuFunciones();
scrollHeaderFondo();
copyAr();
renderContacto();
initContactForm(); 

// 2. Inicializar el indicador visual de los filtros en la primera pestaña ("Todos")
const tabInicial = document.querySelector(".tab");
if (tabInicial) {
    moverIndicador(tabInicial);
}

// 3. ¡ENCENDER EL MOTOR DE SUPABASE!
inicializarProyectos();

// Deshabilitar click derecho (opcional)
// document.addEventListener('contextmenu', event => event.preventDefault());

// Deshabilitar selección de texto (opcional)
// document.onselectstart = function() { return false; };