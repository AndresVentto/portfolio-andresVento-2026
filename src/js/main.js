import './theme.js';
import { menuFunciones } from './menu.js';
import { scrollHeaderFondo } from './scroll.js';
import { inicializarProyectos } from './proyectos.js';
import { copyAr, renderContacto } from './copy.js';
import { initContactForm } from './contact.js';

menuFunciones();
scrollHeaderFondo();
copyAr();
renderContacto();
initContactForm();

inicializarProyectos();

// Año del footer siempre actualizado
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();