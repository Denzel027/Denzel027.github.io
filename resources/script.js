emailjs.init("dTJuo1VbTz3o5lJnL");

(function () {
    const btn = document.getElementById("contact-btn");
    const label = document.getElementById("btn-label");
    const spinner = document.getElementById("btn-spinner");
    const status = document.getElementById("contact-status");
    const formWrap = document.querySelector(".contact-form-wrap");

    btn.addEventListener("click", () => {
        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (!name || !email || !message) {
            status.textContent = "Please fill in all fields.";
            status.style.color = "#FF5F57";
            return;
        }

        label.classList.add("d-none");
        spinner.classList.remove("d-none");
        btn.disabled = true;
        status.textContent = "";

        emailjs.send("service_mdeifqb", "template_t1zsdkk", {
            name: name,
            email: email,
            message: message,
            title: "Portfolio Contact"
        }).then(() => {
            // Show success overlay inside the form card
            formWrap.style.position = "relative";
            formWrap.style.overflow = "hidden";

            const overlay = document.createElement("div");
            overlay.id = "success-overlay";
            overlay.innerHTML = `
                <div class="d-flex flex-column align-items-center justify-content-center h-100 gap-3">
                    <div class="success-checkmark">
                        <svg viewBox="0 0 52 52" class="checkmark-svg">
                            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark-check" fill="none" d="M14 27 l8 8 l16-16"/>
                        </svg>
                    </div>
                    <p class="fredoka fs-4 mb-0" style="color:#5E3A4B;">Message sent!</p>
                    <p class="poppins text-muted" style="font-size:.85rem;">I'll get back to you soon.</p>
                </div>
            `;
            overlay.style.cssText = `
                position: absolute;
                inset: 0;
                background: rgba(255,255,255,0.85);
                backdrop-filter: blur(6px);
                border-radius: 12px;
                opacity: 0;
                transition: opacity 0.4s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            formWrap.appendChild(overlay);

            // Fade in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => { overlay.style.opacity = "1"; });
            });

            // Clear fields
            document.getElementById("contact-name").value = "";
            document.getElementById("contact-email").value = "";
            document.getElementById("contact-message").value = "";

            // Fade out after 3s
            setTimeout(() => {
                overlay.style.opacity = "0";
                setTimeout(() => overlay.remove(), 400);
            }, 3000);

        }).catch((err) => {
            console.error("EmailJS error:", err);
            status.textContent = "Something went wrong. Try again.";
            status.style.color = "#FF5F57";
        }).finally(() => {
            label.classList.remove("d-none");
            spinner.classList.add("d-none");
            btn.disabled = false;
        });
    });
})();

(function () {
    const selector = '.anim-fade-up, .anim-slide-up, .anim-fade-left, .anim-fade-right, .anim-pop, .anim-card, .anim-title';

    function replaySection(container) {
        const els = container.querySelectorAll(selector);

        const all = container.matches(selector) ? [container, ...els] : [...els];
        all.forEach(el => {
            el.classList.remove('anim-in');
            void el.offsetWidth;
            const delay = (parseFloat(el.style.animationDelay) || 0) * 1000;
            setTimeout(() => el.classList.add('anim-in'), delay + 80);
        });
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                replaySection(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('section, .side-sticky').forEach(el => observer.observe(el));

})();