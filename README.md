# 🚀 Portafolio de Andrés Vento

![Portfolio Preview](./assets/img/portafolio-img.avif)

Portafolio personal moderno y responsivo construido con HTML, Tailwind CSS y JavaScript. Refleja mi pasión por el desarrollo web y mi compromiso con el aprendizaje continuo.

🌐 **Sitio en vivo:** [andresvento-dev.vercel.app](https://andresvento-dev.vercel.app)

## ✨ Características

- **Diseño responsivo**: probado en móvil (360 px), tablet (768 px) y escritorio (1280 px)
- **Modo oscuro/claro**: con preferencia guardada en `localStorage`
- **Animaciones fluidas**: partículas que se pausan fuera de pantalla y un solo listener de scroll con `requestAnimationFrame`
- **Proyectos dinámicos**: cargados desde Supabase, con filtros por categoría y ventana modal de detalles
- **Formulario de contacto**: validación en tiempo real, protección anti-spam (honeypot y límite de envíos) y envío con EmailJS
- **Accesibilidad**: HTML semántico, atributos ARIA, foco gestionado en el menú y la modal, y navegación por teclado
- **SEO**: metadatos completos para buscadores y redes sociales

## 🛠️ Tecnologías

| Área | Herramientas |
|---|---|
| Base | HTML5, CSS3, JavaScript (ES Modules) |
| Estilos | Tailwind CSS v4 (CLI) |
| Datos | Supabase (proyectos) |
| Correo | EmailJS |
| Efectos | Particles.js |
| Íconos | Font Awesome, Remix Icon |
| Despliegue | Vercel |

## 📁 Estructura del proyecto

```
portfolio-andresVento-2026/
├── index.html                  # Página principal
├── assets/
│   ├── doc/                    # CV y certificados en PDF
│   └── img/
│       ├── brand/              # Logos del sitio (claro y oscuro)
│       ├── perfil/             # Fotografías personales
│       ├── experiencia/        # Logos de empresas
│       ├── certificados/       # Miniaturas de los certificados
│       ├── stacks/             # Íconos SVG de tecnologías
│       └── *.webp / *.avif     # Imágenes de proyectos (referenciadas desde Supabase)
├── src/
│   ├── css/
│   │   ├── input.css           # Estilos fuente (Tailwind + estilos propios)
│   │   └── output.css          # CSS compilado que usa la página
│   └── js/
│       ├── main.js             # Punto de entrada: inicializa todos los módulos
│       ├── theme.js            # Tema claro/oscuro y partículas
│       ├── menu.js             # Menú de navegación móvil
│       ├── scroll.js           # Header, botón "volver arriba" y enlace activo
│       ├── proyectos.js        # Tarjetas, filtros y modal de proyectos
│       ├── supabase.js         # Cliente y consultas a Supabase
│       ├── contact.js          # Validación y envío del formulario
│       ├── copy.js             # Copiar correo/teléfono y enlaces de contacto
│       ├── modalProyect.js     # Utilidades de ventanas modales
│       └── vendor/
│           └── particles.min.js
├── tailwind.config.js          # Colores, fuentes y animaciones del tema
├── package.json
└── README.md
```

> Las imágenes de proyectos permanecen en la raíz de `assets/img/` porque sus rutas están guardadas en la base de datos de Supabase.

## 💻 Desarrollo local

```bash
# 1. Instalar dependencias
npm install

# 2. Compilar Tailwind en modo observador (recompila al guardar)
npm run dev
```

Luego abre el proyecto con un servidor local (por ejemplo, la extensión **Live Server** de VS Code). Abrir `index.html` con doble clic no funciona, porque los módulos de JavaScript necesitan un servidor.

## 🚀 Producción

```bash
# Genera src/css/output.css minificado
npm run build
```

El sitio es estático: basta con subir el repositorio a Vercel (o cualquier hosting estático). Recuerda ejecutar `npm run build` y subir `output.css` actualizado.

## 🎯 Secciones

- **Inicio**: presentación, disponibilidad y datos destacados
- **Proyectos**: trabajos realizados con filtros por categoría
- **Sobre mí**: trayectoria y objetivos
- **Skills**: tecnologías que manejo
- **Experiencia y formación**: experiencia profesional y certificaciones con vista previa
- **Servicios**: lo que ofrezco
- **Contacto**: formulario y datos de contacto

## 📈 Aprendizaje

Como desarrollador junior, este proyecto me ha permitido:

- **Profundizar en Tailwind CSS**: diseños complejos con utility classes
- **Organizar JavaScript en módulos**: código mantenible y separado por responsabilidad
- **Optimizar el rendimiento**: carga diferida, imágenes WebP/AVIF y animaciones eficientes
- **Aplicar accesibilidad y SEO**: estructura semántica, ARIA y metadatos
- **Integrar servicios externos**: Supabase y EmailJS

## 🤝 Contribuciones

Aunque es un proyecto personal, las sugerencias son bienvenidas. Si encuentras un error o tienes una idea, ¡abre un issue o un pull request!

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 📞 Contacto

**Andrés E. Vento C.**
- Email: [andresvento.dev@gmail.com](mailto:andresvento.dev@gmail.com)
- LinkedIn: [andrés-vento-dev](https://www.linkedin.com/in/andr%C3%A9s-vento-dev/)
- GitHub: [AndresVentto](https://github.com/AndresVentto)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
