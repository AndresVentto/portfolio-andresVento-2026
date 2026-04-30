const secretos = {
    phone: ["+58", "424", "217", "1412"].join(" "),
    email: ["andresvento.dev", "gmail.com"].join("@")
};

export function copyAr() {
    const copyIcons = document.querySelectorAll(".copy-icon");

    copyIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const tipoDato = icon.dataset.type;
            const texto = secretos[tipoDato];
            const tipo = icon.dataset.text;

            navigator.clipboard.writeText(texto).then(() => {
                const rect = icon.getBoundingClientRect();
                const alerta = document.createElement("div");

                alerta.textContent = `${tipo} Copiado ✅`;
                alerta.className = `absolute bg-primaryColor text-white px-4 py-2 rounded-lg shadow-lg text-sm md:text-base z-50 animate-fadeInOut pointer-events-none`;

                document.body.appendChild(alerta);

                alerta.style.top = `${rect.top - 55 + window.scrollY}px`;

                requestAnimationFrame(() => {
                    alerta.style.left = `${rect.left + rect.width/2 - alerta.offsetWidth/2}px`;
                });

                const triangulo = document.createElement("div");
                triangulo.className = ` absolute w-3 h-3 bg-primaryColor transform rotate-45 top-full left-1/2 -translate-x-1/2 -translate-y-1/2`;
                alerta.appendChild(triangulo);

                alerta.style.left = `${rect.left + rect.width/2 - alerta.offsetWidth/2}px`;

                alerta.addEventListener("animationend", () => alerta.remove());
            });
        });
    });
}



export function renderContacto() {
    // Teléfono
    const phoneLink = document.getElementById("phone-link");

    if (phoneLink) {
        phoneLink.href = `tel:${secretos.phone}`;
    }

    // Email
    const emailText = document.getElementById("email-text");

    if (emailText) {
        emailText.textContent = secretos.email;
    }

    // WhatsApp 
    const whatsappLink = document.getElementById("whatsapp-link");

    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/${secretos.phone}`;
    }
}