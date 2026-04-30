import { menuFunciones } from './menu.js';
import { darkMode, lightMode, cargarParticles } from './theme.js';
import { scrollHeaderFondo } from './scroll.js';
import { moverIndicador } from './proyectos.js';
import { copyAr, renderContacto } from './copy.js';
import { initContactForm } from './contact.js'; 
import { openModal, closeModal } from './modalProyect.js'; 

// Ejecución de funciones
menuFunciones();
scrollHeaderFondo();
copyAr();
renderContacto();
initContactForm(); 
openModal('modal-project-1');
closeModal('modal-project-1');



// Deshabilitar clik derecho
document.addEventListener('contextmenu', event => event.preventDefault());
// Deshabilitar selección de texto
document.onselectstart = function() { return false; };




