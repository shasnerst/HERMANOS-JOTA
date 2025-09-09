document.addEventListener("DOMContentLoaded", () => {
    // === MENÚ HAMBURGUESA ===
    const menuToggle = document.querySelector(".menu-toggle");
    const navPrimary = document.querySelector(".nav-primary");

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.classList.toggle("open");
        navPrimary.classList.toggle("active");
    });

    // === CARRITO LATERAL ===
    const cartDrawer = document.querySelector(".cart-drawer");
    const cartButton = document.querySelector(".icon-btn[aria-label='Carrito de compras']");
    const closeCartButton = document.querySelector(".cart-drawer__close");

    cartButton.addEventListener("click", () => {
        cartDrawer.classList.add("open");
        cartDrawer.setAttribute("aria-hidden", "false");
    });

    closeCartButton.addEventListener("click", () => {
        cartDrawer.classList.remove("open");
        cartDrawer.setAttribute("aria-hidden", "true");
    });

    // === FORMULARIO DE CONTACTO ===
    const form = document.getElementById("form");
    const submitButton = form.querySelector("button[type='submit']");
    const emailField = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    const popup = document.getElementById("success-popup");
    const closeBtn = popup.querySelector(".popup-close");

    // Regex personalizada para validar emails
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Función para validar en tiempo real
    function checkFormValidity() {
        const isFormValid = form.checkValidity();
        const isEmailValid = emailRegex.test(emailField.value);

        // Mostrar mensaje de error personalizado si el email no cumple con el regex
        if (emailField.value && !isEmailValid) {
            emailError.textContent = "Por favor ingresa un correo electrónico válido.";
            emailField.classList.add("input-error");
        } else {
            emailError.textContent = "";
            emailField.classList.remove("input-error");
        }

        submitButton.disabled = !(isFormValid && isEmailValid);
    }

    // Validación en tiempo real
    form.addEventListener("input", checkFormValidity);
    form.addEventListener("change", checkFormValidity);

    // Envío del formulario
    form.addEventListener("submit", function (event) {
        if (!form.reportValidity()) {
            return; // Deja que el navegador muestre las validaciones nativas
        }

        event.preventDefault(); // Todo es válido, prevenimos envío real

        // Verificación final del email con regex
        if (emailRegex.test(emailField.value)) {
            // Mostrar popup
            popup.classList.remove("hidden");

            // Resetear formulario y estado del botón
            form.reset();
            submitButton.disabled = true;
            emailError.textContent = "";
            emailField.classList.remove("input-error");

            // Cierre automático del popup
            setTimeout(() => {
                popup.classList.add("hidden");
            }, 5000);
        } else {
            // Mostrar error en caso extremo
            emailError.textContent = "Por favor ingresa un correo electrónico válido.";
            emailField.classList.add("input-error");
        }
    });

    // Cierre manual del popup
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
    });
});
