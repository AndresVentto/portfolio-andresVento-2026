import { obtenerProyectosDeBD, proyectosCache } from './supabase.js';

/*===================================================================
  DICCIONARIO DE COLORES PARA LAS TECNOLOGÍAS
===================================================================*/
const coloresTecnologias = {
    // Frontend
    "html": "bg-[#E34F26]/10 text-[#E34F26] border-[#E34F26]/20",
    "css": "bg-[#1572B6]/10 text-[#1572B6] border-[#1572B6]/20",
    "sass": "bg-[#CC6699]/10 text-[#CC6699] border-[#CC6699]/20",
    "js": "bg-[#F7DF1E]/10 text-[#D4B000] dark:text-[#F7DF1E] border-[#F7DF1E]/20",
    "react": "bg-[#61DAFB]/10 text-[#00A7D6] dark:text-[#61DAFB] border-[#61DAFB]/20",
    "tailwind": "bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/20",
    // Backend
    "php": "bg-[#777BB4]/10 text-[#777BB4] border-[#777BB4]/20",
    "nodejs": "bg-[#539E43]/10 text-[#539E43] border-[#539E43]/20",
    "python": "bg-[#3ba93b]/10 text-[#3ba93b] border-[#3776AB]/20",
    "java": "bg-[#F89820]/10 text-[#F89820] border-[#F89820]/20",
    "c": "bg-[#00599C]/10 text-[#00599C] border-[#00599C]/20",
    "c#": "bg-[#68217A]/10 text-[#9B4F96] dark:text-[#B66FC2] border-[#68217A]/20",
    // Bases de datos
    "mysql": "bg-[#005C84]/10 text-[#00A9D6] border-[#00A9D6]/25",
    "postgresql": "bg-[#336791]/10 text-[#336791] border-[#336791]/20",
    "supabase": "bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/20",
    "SQL": "bg-[#E34F26]/10 text-[#E34F26] border-[#E34F26]/20",
    // Sistemas
    "linux": "bg-[#FCC624]/10 text-[#D9A404] dark:text-[#FCC624] border-[#FCC624]/20"
};

/*===================================================================
  1. RENDERIZADO DINÁMICO (SUPABASE)
===================================================================*/
export async function inicializarProyectos() {
    const proyectos = await obtenerProyectosDeBD();
    const grid = document.getElementById('contenedor-portafolio');
    
    if (!grid) return;
    grid.innerHTML = ''; // Limpiar el contenedor

    proyectos.forEach(proyecto => {
        // Generar los badges asignando el color correspondiente desde el diccionario
        const badgesHTML = proyecto.stack && proyecto.stack.length > 0
            ? proyecto.stack.map(tech => {
                const techKey = tech.toLowerCase().trim();
                const clasesColor = coloresTecnologias[techKey] || "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";

                return `
                    <li class="px-3 py-1 text-xs font-semibold rounded-lg border backdrop-blur-sm tracking-wide ${clasesColor}">
                         ${tech}
                    </li>`;
            }).join('')
            : '';

        // Corregimos el singular con mayúsculas de la BD ("App", "Sistema") al plural del HTML ("apps", "sistemas")
        let claseFiltro = proyecto.categoria ? proyecto.categoria.toLowerCase().trim() : 'todos';

        if (claseFiltro === 'app') {
            claseFiltro = 'apps';
        } else if (claseFiltro === 'sistema') {
            claseFiltro = 'sistemas';
        }

        // Inyectamos tu HTML exacto utilizando la clase de filtro corregida
        grid.innerHTML += `
            <li class="work_card ${claseFiltro}">
                <article class="group relative max-w-xl overflow-hidden rounded-3xl border-2 border-primaryColor dark:border-primaryColorLight bg-gradient-to-b from-sectionColor to-white dark:from-[hsl(211,100%,12%)] dark:to-[hsl(216,100%,4%)] backdrop-blur-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]">
                                          
                    <div class="relative p-3">
                        <figure class="aspect-video rounded-2xl overflow-hidden relative shadow-inner bg-zinc-200 dark:bg-zinc-800">
                            <img src="${proyecto.imagen_url || './assets/img/project-1.jpg'}" alt="${proyecto.nombre}" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90 dark:group-hover:brightness-75" />
                        </figure>
                    </div>

                    <div class="p-6 pt-2 space-y-4 relative z-10">
                        <header class="space-y-2 min-h-[110px] flex flex-col justify-between">
                            <div>
                                <h3 class="text-2xl font-bold tracking-tight text-[hsl(209,87%,21%)] dark:text-[hsl(0,0%,98%)] md:text-center line-clamp-1" title="${proyecto.nombre}">
                                    ${proyecto.nombre}
                                </h3>
                                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 text-base sm:text-md md:text-lg mt-1">
                                    ${proyecto.descripcion || 'Sin descripción disponible.'}
                                </p>
                            </div>
                        </header>

                            <ul class="flex flex-wrap gap-2">
                                ${badgesHTML}
                            </ul>

                        <footer class="flex items-center justify-between">
                            <button onclick="abrirDetalleModal(event, ${proyecto.id})" type="button" class="flex items-center gap-2 text-md font-bold cursor-pointer text-[hsl(209,74%,45%)] dark:text-emerald-400 group/link">
                                Ver más detalles
                                <i class="fa-solid fa-arrow-right transition-transform group-hover/link:translate-x-1"></i>
                            </button>
                                
                            <span class="flex items-center gap-1 text-[10px] uppercase tracking-widest text-zinc-400">
                                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                ${proyecto.categoria}
                            </span>
                        </footer>
                    </div>
                 </article>
            </li>`;
    });

    // Capturamos las pestañas ahora que las tarjetas terminaron de renderizarse en el DOM
    const tabs = document.querySelectorAll(".tab");

    if (tabs.length > 0) {
        // Inicializamos el estado del indicador visual en la pestaña "Todos"
        moverIndicador(tabs[0]);
        tabs[0].classList.add("text-whiteColor");
        
        // Ejecutamos la escucha de los eventos click pasándole los botones reales
        configurarEventosFiltro(tabs);
    }
}

/*===================================================================
  2. FILTRO DE PROYECTOS
===================================================================*/
export function moverIndicador(tab) {
    const indicador = document.querySelector("#indicador");
    if (!tab || !indicador) return;
    
    const tabRect = tab.getBoundingClientRect();
    const parentRect = tab.parentElement.getBoundingClientRect();
    indicador.style.width = tabRect.width + "px";
    indicador.style.transform = `translateX(${tabRect.left - parentRect.left}px)`;
}

function configurarEventosFiltro(tabs) {
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            moverIndicador(tab);

            tabs.forEach(t => t.classList.remove("text-whiteColor"));
            tab.classList.add("text-whiteColor");

            const tabval = tab.getAttribute("data-tabs");
            const todasLasTarjetas = document.querySelectorAll(".work_card");
            
            todasLasTarjetas.forEach(card => {
                if (tabval === "todos") {
                    card.style.display = "block";
                } else {
                    if (card.classList.contains(tabval)) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                }
            });
        });
    });
}

// Escuchar cambios de tamaño en la ventana para ajustar la posición del indicador flotante
window.addEventListener("resize", () => {
    const activeTab = document.querySelector(".tab.text-whiteColor");
    if (activeTab) moverIndicador(activeTab);
});

/*===================================================================
  3. VENTANA MODAL DINÁMICA
===================================================================*/
window.abrirDetalleModal = function(event, id) {
    event.preventDefault(); 
    
    // 1. Buscar el proyecto específico en la caché de Supabase
    const proyecto = proyectosCache.find(p => p.id === id);
    if (!proyecto) return;

    // 2. Mapear los elementos del DOM del modal
    const modal = document.getElementById('portfolio-modal');
    const txtTitulo = document.getElementById('modal-titulo');
    const txtDescripcion = document.getElementById('modal-descripcion');
    const imgModal = document.getElementById('modal-imagen');
    const txtOverlay = document.getElementById('modal-overlay-text');
    const badgeCategoria = document.getElementById('modal-categoria');
    const contenedorStack = document.getElementById('modal-stack');
    const btnPreview = document.getElementById('modal-link-preview');
    const btnGithub = document.getElementById('modal-link-github');

    // Cortafuegos por si acaso no encuentra el modal en el DOM
    if (!modal) return;

    // 3. Inyectar los datos básicos
    txtTitulo.innerText = proyecto.nombre;
    txtDescripcion.innerText = proyecto.descripcion || 'Sin descripción disponible.';
    imgModal.src = proyecto.imagen_url || './assets/img/project-1.jpg';
    imgModal.alt = proyecto.nombre;
    txtOverlay.innerText = `Captura de pantalla de ${proyecto.nombre}`;
    badgeCategoria.innerText = proyecto.categoria || 'Web';

    // 4. Inyectar los enlaces (ocultar botones si la URL no viene en la BD)
    if (proyecto.url_demo) {
        btnPreview.href = proyecto.url_demo;
        btnPreview.style.setProperty("display", "flex", "important");
    } else {
        btnPreview.style.setProperty("display", "none", "important");
    }

    // Botón de GitHub (Repositorio)
    if (proyecto.url_repo) {
        btnGithub.href = proyecto.url_repo;
        btnGithub.style.setProperty("display", "flex", "important");
    } else {
        btnGithub.style.setProperty("display", "none", "important");
    }
    // 5. Inyectar los badges del Stack usando tu mismo diccionario de colores
    contenedorStack.innerHTML = ''; // Limpiar badges anteriores
    if (proyecto.stack && proyecto.stack.length > 0) {
        proyecto.stack.forEach(tech => {
            const techKey = tech.toLowerCase().trim();
            const clasesColor = coloresTecnologias[techKey] || "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";
            
            contenedorStack.innerHTML += `
                <span class="px-2 md:px-3 py-1 text-[11px] md:text-xs font-semibold rounded-lg border backdrop-blur-sm tracking-wide ${clasesColor}">
                    ${tech}
                </span>`;
        });
    }

    // 6. Mostrar el modal con las clases de Tailwind y bloquear scroll del body
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
}

// Función global para cerrar el modal
window.cerrarDetalleModal = function() {
    const modal = document.getElementById('portfolio-modal');
    if (!modal) return;
    
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
}

// Cerrar al hacer clic en el fondo difuminado (fuera del contenedor blanco)
window.addEventListener("click", function (e) {
    const modal = document.getElementById('portfolio-modal');
    if (e.target === modal) {
        window.cerrarDetalleModal();
    }
});