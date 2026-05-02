/*~~~~~~~~~~~~~~~ VALIDACIÓN E INTEGRACIÓN DE FORMULARIO ~~~~~~~~~~~~~~~*/

export function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return; 

    const submitBtn = document.getElementById("submit-btn");
    const btnIcon = document.getElementById("btn-icon");
    const toast = document.getElementById("toast");
    const charCount = document.getElementById("char-count");

    // Inicializar EmailJS con tu Public Key
    emailjs.init("FT_Fg8WdvRpcifXSD");

    const config = {
        fullname: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/, required: true },
        subject: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/, required: true }, 
        email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, required: true },
        message: { regex: /^[\s\S]{10,2000}$/, required: true }
    };

    const fields = Object.keys(config);

    // --- FUNCIONES AUXILIARES ---
    function showToast() {
        if (!toast) return;
        toast.classList.remove("translate-y-32", "opacity-0");
        setTimeout(() => toast.classList.add("translate-y-32", "opacity-0"), 4000);
    }

    function validateField(input, id) {
        if (!input) return false;
        const container = input.closest('.space-y-2') || input.parentElement;
        const icon = container.querySelector(".icon");
        const elements = {
            empty: container.querySelector(".error-empty"),
            invalid: container.querySelector(".error-invalid"),
            success: container.querySelector(".success")
        };
        
        const value = input.value.trim();
        const isRequired = config[id].required;
        const isEmpty = value === "";
        const isInvalid = config[id].regex && !isEmpty && !config[id].regex.test(value);

        let status = "valid";
        if (isRequired && isEmpty) status = "empty";
        else if (isInvalid) status = "invalid";
        else if (isEmpty) status = "none";

        elements.empty?.classList.toggle("hidden", status !== "empty");
        elements.invalid?.classList.toggle("hidden", status !== "invalid");
        elements.success?.classList.toggle("hidden", status !== "valid");

        input.classList.remove("border-red-500", "border-green-500", "border-blue-500", "ring-1", "ring-blue-500");

        if (status === "empty" || status === "invalid") {
            input.classList.add("border-red-500");
            if (icon) icon.textContent = status === "empty" ? "⚠️" : "❌";
            return false;
        } 
        
        if (status === "valid") {
            input.classList.add("border-green-500");
            if (icon) icon.textContent = "✅";
            return true;
        }

        if (icon) icon.textContent = "";
        return true;
    }

    function resetAll() {
        fields.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.classList.remove("border-red-500", "border-green-500", "border-blue-500", "ring-1", "ring-blue-500");
                const container = input.closest('.space-y-2');
                const icon = container.querySelector(".icon");
                if (icon) icon.textContent = "";
                container.querySelectorAll(".error-empty, .error-invalid, .success").forEach(m => m.classList.add("hidden"));
            }
        });
        if (charCount) {
            charCount.textContent = "0";
            charCount.classList.replace("text-red-500", "text-gray-500");
        }
    }

    // --- EVENTOS ---
    fields.forEach((id) => {
        const input = document.getElementById(id);
        if (!input) return;

        input.addEventListener("focus", () => {
            if (!input.classList.contains("border-red-500")) {
                input.classList.add("border-blue-500", "ring-1", "ring-blue-500");
            }
        });

        input.addEventListener("input", () => {
            validateField(input, id);
            if (id === "message" && charCount) {
                charCount.textContent = input.value.length;
                input.value.length >= 1950 ? charCount.classList.add("text-red-500") : charCount.classList.remove("text-red-500");
            }
        });
    });

    // --- ENVÍO CON DOBLE PLANTILLA ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        fields.forEach(id => {
            const input = document.getElementById(id);
            if (!validateField(input, id)) isValid = false;
        });

        if (isValid) {
            const originalText = submitBtn.querySelector("span").textContent;
            
            // UI de carga
            submitBtn.disabled = true;
            submitBtn.querySelector("span").textContent = "Enviando...";
            if (btnIcon) btnIcon.className = "fa fa-spinner animate-spin";

            // Recopilación de datos
            const templateParams = {
                fullname: document.getElementById("fullname").value.trim(),
                email: document.getElementById("email").value.trim(),
                subject: document.getElementById("subject").value.trim(),
                message: document.getElementById("message").value.trim(),
                time: new Date().toLocaleString('es-VE', { 
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                })
            };

            // EJECUCIÓN DE AMBAS PLANTILLAS
            // 1. Notificación para ti (template_u0osuj7)
            const sendToMe = emailjs.send('service_kkd2unc', 'template_u0osuj7', templateParams);
            
            // 2. Auto-reply para el cliente (template_5g7m7le)
            const sendToClient = emailjs.send('service_kkd2unc', 'template_5g7m7le', templateParams);

            Promise.all([sendToMe, sendToClient])
                .then(() => {
                    showToast(); // Éxito
                    form.reset();
                    resetAll();
                })
                .catch((error) => {
                    console.error("Error en el envío:", error);
                    alert("Lo siento, hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.");
                })
                .finally(() => {
                    // Restaurar botón
                    submitBtn.disabled = false;
                    submitBtn.querySelector("span").textContent = originalText;
                    if (btnIcon) btnIcon.className = "fa fa-paper-plane";
                });
        }
    });
}