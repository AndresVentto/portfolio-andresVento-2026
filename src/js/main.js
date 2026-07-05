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