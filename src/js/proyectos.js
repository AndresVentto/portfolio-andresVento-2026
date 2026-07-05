import { obtenerProyectosDeBD, proyectosCache } from './supabase.js';

const coloresTecnologias = {
    html: 'bg-[#E34F26]/10 text-[#E34F26] border-[#E34F26]/20',
    css: 'bg-[#1572B6]/10 text-[#1572B6] border-[#1572B6]/20',
    sass: 'bg-[#CC6699]/10 text-[#CC6699] border-[#CC6699]/20',
    js: 'bg-[#F7DF1E]/10 text-[#D4B000] dark:text-[#F7DF1E] border-[#F7DF1E]/20',
    react: 'bg-[#61DAFB]/10 text-[#00A7D6] dark:text-[#61DAFB] border-[#61DAFB]/20',
    tailwind: 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/20',
    php: 'bg-[#777BB4]/10 text-[#777BB4] border-[#777BB4]/20',
    nodejs: 'bg-[#539E43]/10 text-[#539E43] border-[#539E43]/20',
    python: 'bg-[#3ba93b]/10 text-[#3ba93b] border-[#3776AB]/20',
    java: 'bg-[#F89820]/10 text-[#F89820] border-[#F89820]/20',
    c: 'bg-[#00599C]/10 text-[#00599C] border-[#00599C]/20',
    'c#': 'bg-[#68217A]/10 text-[#9B4F96] dark:text-[#B66FC2] border-[#68217A]/20',
    mysql: 'bg-[#005C84]/10 text-[#00A9D6] border-[#00A9D6]/25',
    postgresql: 'bg-[#336791]/10 text-[#336791] border-[#336791]/20',
    supabase: 'bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/20',
    sql: 'bg-[#E34F26]/10 text-[#E34F26] border-[#E34F26]/20',
    linux: 'bg-[#FCC624]/10 text-[#D9A404] dark:text-[#FCC624] border-[#FCC624]/20'
};

const CATEGORY_CONFIG = {
    todos: { label: 'Todos', aliases: ['todos', 'all'] },
    web: { label: 'Web', aliases: ['web', 'website', 'sitio web', 'landing page'] },
    sistemas: { label: 'Sistemas', aliases: ['sistema', 'sistemas', 'system', 'systems'] },
    ia: { label: 'IA', aliases: ['ia', 'ai', 'inteligencia artificial', 'app', 'apps', 'application', 'aplicacion', 'aplicaciones'] }
};

function normalizeCategory(value) {
    const raw = String(value ?? '').trim().toLowerCase();
    if (!raw) return 'todos';

    for (const [key, config] of Object.entries(CATEGORY_CONFIG)) {
        if (key === raw || config.aliases.includes(raw)) return key;
    }

    return 'todos';
}

function getProjectCategory(project) {
    return normalizeCategory(project?.categoria);
}

function getTechClasses(tech) {
    const techKey = String(tech ?? '').toLowerCase().trim();
    return coloresTecnologias[techKey] || 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20';
}

export function createProjectListController() {
    const state = {
        projects: [],
        currentCategory: 'todos',
        isModalOpen: false
    };

    let grid = null;
    let modal = null;
    let indicator = null;
    let tabs = [];

    function renderSkeletons(count = 6) {
        if (!grid) return;

        grid.innerHTML = '';
        for (let i = 0; i < count; i += 1) {
            const skeleton = document.createElement('li');
            skeleton.className = 'work_card';
            skeleton.innerHTML = `
                <div class="group relative max-w-xl overflow-hidden rounded-3xl border-2 border-primaryColor dark:border-primaryColorLight bg-gradient-to-b from-sectionColor to-white dark:from-[hsl(211,100%,12%)] dark:to-[hsl(216,100%,4%)] backdrop-blur-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] p-3">
                    <div class="aspect-video rounded-2xl overflow-hidden bg-zinc-300/70 dark:bg-zinc-800/70 animate-pulse"></div>
                    <div class="mt-4 space-y-3">
                        <div class="h-6 w-3/4 rounded bg-zinc-300/70 dark:bg-zinc-800/70 animate-pulse"></div>
                        <div class="h-4 w-full rounded bg-zinc-300/60 dark:bg-zinc-800/60 animate-pulse"></div>
                        <div class="h-4 w-2/3 rounded bg-zinc-300/60 dark:bg-zinc-800/60 animate-pulse"></div>
                    </div>
                </div>`;
            grid.appendChild(skeleton);
        }
    }

    function buildProjectCard(project) {
        const category = getProjectCategory(project);
        const badgesHTML = (project.stack || []).map((tech) => `
            <li class="px-3 py-1 text-xs font-semibold rounded-lg border backdrop-blur-sm tracking-wide ${getTechClasses(tech)}">
                ${tech}
            </li>`).join('');

        const card = document.createElement('li');
        card.className = `work_card ${category} opacity-0 scale-95 translate-y-2 transition-all duration-300 ease-out`;
        card.dataset.category = category;
        card.innerHTML = `
            <article class="group relative max-w-xl overflow-hidden rounded-3xl border-2 border-primaryColor dark:border-primaryColorLight bg-gradient-to-b from-sectionColor to-white dark:from-[hsl(211,100%,12%)] dark:to-[hsl(216,100%,4%)] backdrop-blur-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]">
                <div class="relative p-3">
                    <figure class="aspect-video rounded-2xl overflow-hidden relative shadow-inner bg-zinc-200 dark:bg-zinc-800">
                        <img loading="lazy" decoding="async" src="${project.imagen_url || './assets/img/project-1.jpg'}" alt="${project.nombre}" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90 dark:group-hover:brightness-75" />
                    </figure>
                </div>

                <div class="p-6 pt-2 space-y-4 relative z-10">
                    <header class="space-y-2 min-h-[110px] flex flex-col justify-between">
                        <div>
                            <h3 class="text-2xl font-bold tracking-tight text-[hsl(209,87%,21%)] dark:text-[hsl(0,0%,98%)] md:text-center line-clamp-1" title="${project.nombre}">
                                ${project.nombre}
                            </h3>
                            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 text-base sm:text-md md:text-lg mt-1">
                                ${project.descripcion || 'Sin descripción disponible.'}
                            </p>
                        </div>
                    </header>

                    <ul class="flex flex-wrap gap-2">
                        ${badgesHTML}
                    </ul>

                    <footer class="flex items-center justify-between">
                        <button type="button" class="flex items-center gap-2 text-md font-bold cursor-pointer text-[hsl(209,74%,45%)] dark:text-emerald-400 group/link" data-action="open-project" data-project-id="${project.id}">
                            Ver más detalles
                            <i class="fa-solid fa-arrow-right transition-transform group-hover/link:translate-x-1"></i>
                        </button>

                        <span class="flex items-center gap-1 text-[10px] uppercase tracking-widest text-zinc-400">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            ${project.categoria || 'Web'}
                        </span>
                    </footer>
                </div>
            </article>`;

        return card;
    }

    function renderProjects() {
        if (!grid) return;

        const filteredProjects = state.projects.filter((project) => {
            const category = getProjectCategory(project);
            return state.currentCategory === 'todos' || category === state.currentCategory;
        });

        const existingCards = Array.from(grid.children);
        const visibleCards = filteredProjects.map((project) => buildProjectCard(project));

        existingCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 45}ms`;
            card.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            card.classList.add('opacity-0', 'scale-90', '-translate-y-2');
        });

        window.setTimeout(() => {
            grid.innerHTML = '';
            visibleCards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 60}ms`;
                card.classList.remove('opacity-0', 'scale-95', 'translate-y-2');
                card.classList.add('opacity-100', 'scale-100', 'translate-y-0');
                grid.appendChild(card);
            });
        }, 180);

        syncTabState();
    }

    function syncTabState() {
        const activeTab = document.querySelector(`.tab[data-category="${state.currentCategory}"]`);
        if (!activeTab || !indicator) return;

        tabs.forEach((tab) => {
            const isActive = tab === activeTab;
            tab.classList.toggle('text-whiteColor', isActive);
            tab.setAttribute('aria-pressed', String(isActive));
        });

        moveIndicator(activeTab);
    }

    function moveIndicator(tab) {
        if (!tab || !indicator) return;

        const tabRect = tab.getBoundingClientRect();
        const parentRect = tab.parentElement?.getBoundingClientRect();
        if (!parentRect) return;

        indicator.style.width = `${tabRect.width}px`;
        indicator.style.transform = `translateX(${tabRect.left - parentRect.left}px)`;
    }

    function setCurrentCategory(category) {
        state.currentCategory = normalizeCategory(category);
        renderProjects();
    }

    function bindFilterEvents() {
        tabs = Array.from(document.querySelectorAll('.tab'));
        if (tabs.length === 0) return;

        indicator = document.querySelector('#indicador');
        tabs.forEach((tab) => {
            tab.addEventListener('click', () => setCurrentCategory(tab.dataset.category || 'todos'));
        });

        window.addEventListener('resize', () => syncTabState());
    }

    function openProjectModal(projectId) {
        const project = state.projects.find((item) => item.id === Number(projectId)) || proyectosCache.find((item) => item.id === Number(projectId));
        if (!project || !modal) return;

        const txtTitulo = document.getElementById('modal-titulo');
        const txtDescripcion = document.getElementById('modal-descripcion');
        const imgModal = document.getElementById('modal-imagen');
        const txtOverlay = document.getElementById('modal-overlay-text');
        const badgeCategoria = document.getElementById('modal-categoria');
        const contenedorStack = document.getElementById('modal-stack');
        const btnPreview = document.getElementById('modal-link-preview');
        const btnGithub = document.getElementById('modal-link-github');

        txtTitulo.innerText = project.nombre;
        txtDescripcion.innerText = project.descripcion || 'Sin descripción disponible.';
        imgModal.src = project.imagen_url || './assets/img/project-1.jpg';
        imgModal.alt = project.nombre;
        txtOverlay.innerText = `Captura de pantalla de ${project.nombre}`;
        badgeCategoria.innerText = project.categoria || 'Web';

        if (project.url_demo) {
            btnPreview.href = project.url_demo;
            btnPreview.style.setProperty('display', 'flex', 'important');
        } else {
            btnPreview.style.setProperty('display', 'none', 'important');
        }

        if (project.url_repo) {
            btnGithub.href = project.url_repo;
            btnGithub.style.setProperty('display', 'flex', 'important');
        } else {
            btnGithub.style.setProperty('display', 'none', 'important');
        }

        contenedorStack.innerHTML = '';
        if (project.stack && project.stack.length > 0) {
            project.stack.forEach((tech) => {
                contenedorStack.innerHTML += `
                    <span class="px-2 md:px-3 py-1 text-[11px] md:text-xs font-semibold rounded-lg border backdrop-blur-sm tracking-wide ${getTechClasses(tech)}">
                        ${tech}
                    </span>`;
            });
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        state.isModalOpen = true;
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
        state.isModalOpen = false;
    }

    function bindModalEvents() {
        if (!modal) return;

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeProjectModal();
            }
        });

        document.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-action="open-project"]');
            if (trigger) {
                event.preventDefault();
                openProjectModal(trigger.dataset.projectId);
            }
        });

        document.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-action="close-project-modal"]');
            if (trigger) {
                event.preventDefault();
                closeProjectModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && state.isModalOpen) {
                closeProjectModal();
            }
        });
    }

    async function init() {
        grid = document.getElementById('contenedor-portafolio');
        modal = document.getElementById('portfolio-modal');

        if (!grid) return;

        renderSkeletons();
        bindFilterEvents();
        bindModalEvents();

        try {
            state.projects = await obtenerProyectosDeBD();
            renderProjects();
            syncTabState();
        } catch (error) {
            console.error('No se pudieron cargar los proyectos:', error);
            grid.innerHTML = '<li class="col-span-full text-center text-zinc-500">No se pudieron cargar los proyectos en este momento.</li>';
        }
    }

    return {
        init,
        setCurrentCategory,
        openProjectModal,
        closeProjectModal
    };
}

export async function inicializarProyectos() {
    const controller = createProjectListController();
    await controller.init();
}
