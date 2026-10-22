/*~~~~~~~~~~~~~~~ VALIDACIÓN E INTEGRACIÓN DE FORMULARIO ~~~~~~~~~~~~~~~*/
import { secretos } from './copy.js';

const EMAILJS_PUBLIC_KEY = "FT_Fg8WdvRpcifXSD";
const EMAILJS_SERVICE = "service_kkd2unc";
const TEMPLATE_PARA_MI = "template_u0osuj7";
const TEMPLATE_AUTO_RESPUESTA = "template_5g7m7le";

const COOLDOWN_MS = 60 * 1000; // Tiempo mínimo entre envíos (anti-spam)
const COOLDOWN_KEY = "contacto:ultimoEnvio";

// Cada campo define su propia validación y el mensaje que verá el usuario
const config = {
    fullname: {
        validate: (v) => {
            if (v.length < 3) return "Escribe al menos 3 caracteres.";
            if (!/^[\p{L}\s'.-]+$/u.test(v)) return "Usa solo letras, espacios, guiones o apóstrofos.";
            if ((v.match(/\p{L}/gu) || []).length < 2) return "Escribe tu nombre.";
            return "";
        }
    },
    subject: {
        validate: (v) => {
            if (v.length < 3) return "Escribe al menos 3 caracteres.";
            if (/[<>]/.test(v)) return "El asunto no puede contener los símbolos < o >.";
            return "";
        }
    },
    email: {
        validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Escribe un correo válido, por ejemplo nombre@correo.com."
    },
    message: {
        validate: (v) => v.length < 10 ? `El mensaje es muy corto (${v.length}/10 caracteres mínimo).` : ""
    }
};

const fields = Object.keys(config);

export function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const submitBtn = document.getElementById("submit-btn");
    const btnText = submitBtn?.querySelector("span");
    const btnIcon = document.getElementById("btn-icon");
    const toast = document.getElementById("toast");
    const charCount = document.getElementById("char-count");
    const formStatus = document.getElementById("form-status");
    const honeypot = document.getElementById("website");

    // Campos que el usuario ya visitó: solo a esos se les muestran errores mientras escribe
    const touched = new Set();
    let toastTimer = null;

    const emailjsDisponible = () => typeof window.emailjs !== "undefined";
    if (emailjsDisponible()) window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    // --- FUNCIONES AUXILIARES ---
    function showToast() {
        if (!toast) return;
        clearTimeout(toastTimer);
        toast.classList.remove("translate-y-32", "opacity-0");
        toastTimer = setTimeout(() => toast.classList.add("translate-y-32", "opacity-0"), 5000);
    }

    function setStatus(html, tipo = "error") {
        if (!formStatus) return;
        if (!html) {
            formStatus.classList.add("hidden");
            formStatus.innerHTML = "";
            return;
        }
        formStatus.className = tipo === "error"
            ? "rounded-xl border px-4 py-3 text-sm border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"
            : "rounded-xl border px-4 py-3 text-sm border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200";
        formStatus.innerHTML = html;
    }

    function mailtoFallback() {
        return `<a class="underline font-semibold" href="mailto:${secretos.email}">${secretos.email}</a>`;
    }

    function validateField(input, id, { mostrar = true } = {}) {
        if (!input) return false;
        const container = input.closest(".form-field");
        const icon = container?.querySelector(".icon");
        const msg = container?.querySelector(".field-msg");

        const value = input.value.trim();

        // Un campo opcional vacío es válido y no muestra nada
        if (value === "" && config[id].optional) {
            if (mostrar) clearField(input);
            return true;
        }

        const error = value === "" ? "Este campo es obligatorio." : config[id].validate(value);
        const valido = error === "";

        if (!mostrar) return valido;

        input.setAttribute("aria-invalid", String(!valido));
        input.classList.toggle("border-red-500", !valido);
        input.classList.toggle("border-green-500", valido);
        if (msg) msg.textContent = error;
        if (icon) {
            icon.innerHTML = valido
                ? '<i class="fa-solid fa-circle-check text-green-500"></i>'
                : '<i class="fa-solid fa-circle-exclamation text-red-500"></i>';
        }
        return valido;
    }

    function clearField(input) {
        const container = input.closest(".form-field");
        input.removeAttribute("aria-invalid");
        input.classList.remove("border-red-500", "border-green-500");
        const icon = container?.querySelector(".icon");
        const msg = container?.querySelector(".field-msg");
        if (icon) icon.innerHTML = "";
        if (msg) msg.textContent = "";
    }

    function updateCharCount(input) {
        if (!charCount) return;
        const len = input.value.length;
        charCount.textContent = len;
        charCount.classList.toggle("text-red-500", len >= 1950);
    }

    function resetAll() {
        touched.clear();
        fields.forEach((id) => {
            const input = document.getElementById(id);
            if (input) clearField(input);
        });
        if (charCount) {
            charCount.textContent = "0";
            charCount.classList.remove("text-red-500");
        }
    }

    function setLoading(cargando) {
        if (!submitBtn) return;
        submitBtn.disabled = cargando;
        submitBtn.setAttribute("aria-busy", String(cargando));
        if (btnText) btnText.textContent = cargando ? "Enviando..." : "Enviar";
        if (btnIcon) btnIcon.className = cargando ? "fa fa-spinner animate-spin" : "fa fa-paper-plane";
    }

    function segundosDeEspera() {
        try {
            const ultimo = Number(localStorage.getItem(COOLDOWN_KEY)) || 0;
            const restante = COOLDOWN_MS - (Date.now() - ultimo);
            return restante > 0 ? Math.ceil(restante / 1000) : 0;
        } catch {
            return 0;
        }
    }

    function guardarEnvio() {
        try {
            localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
        } catch { /* modo privado: sin límite local */ }
    }

    // --- EVENTOS ---
    fields.forEach((id) => {
        const input = document.getElementById(id);
        if (!input) return;

        // Al salir del campo se valida por primera vez (no mientras se empieza a escribir)
        input.addEventListener("blur", () => {
            if (input.value.trim() === "" && !touched.has(id)) return;
            touched.add(id);
            validateField(input, id);
        });

        input.addEventListener("input", () => {
            if (id === "message") updateCharCount(input);
            if (touched.has(id)) validateField(input, id);
            setStatus("");
        });
    });

    // --- ENVÍO ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        setStatus("");

        let primerInvalido = null;
        fields.forEach((id) => {
            const input = document.getElementById(id);
            touched.add(id);
            if (!validateField(input, id) && !primerInvalido) primerInvalido = input;
        });

        if (primerInvalido) {
            primerInvalido.focus();
            return;
        }

        // Si el campo trampa tiene contenido es un bot: se simula éxito sin enviar nada
        if (honeypot && honeypot.value.trim() !== "") {
            form.reset();
            resetAll();
            showToast();
            return;
        }

        const espera = segundosDeEspera();
        if (espera > 0) {
            setStatus(`Ya enviaste un mensaje hace poco. Espera ${espera} segundos antes de enviar otro.`, "aviso");
            return;
        }

        if (!emailjsDisponible()) {
            setStatus(`No se pudo cargar el servicio de envío (quizás un bloqueador de anuncios lo impidió). Escríbeme directamente a ${mailtoFallback()}.`);
            return;
        }

        const templateParams = {
            fullname: document.getElementById("fullname").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim(),
            time: new Date().toLocaleString("es-VE", { dateStyle: "medium", timeStyle: "short" })
        };

        setLoading(true);
        try {
            // 1. Lo importante: que el mensaje me llegue a mí
            await window.emailjs.send(EMAILJS_SERVICE, TEMPLATE_PARA_MI, templateParams);
        } catch (error) {
            console.error("Error en el envío:", error);
            setStatus(`No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo, o escríbeme a ${mailtoFallback()}.`);
            setLoading(false);
            return;
        }

        // 2. La respuesta automática es un extra: si falla, el mensaje igual llegó
        window.emailjs.send(EMAILJS_SERVICE, TEMPLATE_AUTO_RESPUESTA, templateParams)
            .catch((error) => console.warn("No se envió la respuesta automática:", error));

        guardarEnvio();
        form.reset();
        resetAll();
        setLoading(false);
        showToast();
    });
}
