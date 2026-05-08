/* ═══════════════════════════════════════════════
   ABRAR WUJEDAAN — Portfolio JS
═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

    // ── CUSTOM CURSOR ──
    const cursor = document.getElementById("cursor");
    const trail = document.getElementById("cursorTrail");

    let trailX = 0, trailY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    });

    // Smooth trail
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.12;
        trailY += (mouseY - trailY) * 0.12;
        trail.style.left = trailX + "px";
        trail.style.top = trailY + "px";
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover effect on interactive elements
    const hoverEls = document.querySelectorAll("a, button, input, textarea, .port-card, .edu-card");
    hoverEls.forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });


    // ── THEME TOGGLE ──
    const toggle = document.getElementById("themeToggle");
    const icon = toggle.querySelector(".toggle-icon");
    const stored = localStorage.getItem("theme");

    if (stored === "light") applyLight();

    toggle.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light");
        isLight ? applyDark() : applyLight();
    });

    function applyLight() {
        document.body.classList.add("light");
        icon.textContent = "☾";
        localStorage.setItem("theme", "light");
    }

    function applyDark() {
        document.body.classList.remove("light");
        icon.textContent = "☀";
        localStorage.setItem("theme", "dark");
    }


    // ── NAVBAR SCROLL ──
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });


    // ── SCROLL REVEAL ──
    const revealEls = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const siblings = [...entry.target.parentElement.querySelectorAll(".reveal:not(.in-view)")];
                const delay = siblings.indexOf(entry.target) * 80;
                setTimeout(() => entry.target.classList.add("in-view"), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(el => observer.observe(el));


    // ── COUNTER ANIMATION ──
    const statNums = document.querySelectorAll(".stat-num[data-target]");

    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObs.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const duration = 1200;
        const start = performance.now();

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(ease * target);
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }


    // ── WHATSAPP FORM ──
    const sendBtn = document.getElementById("sendButton");
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            const name = document.getElementById("name").value.trim();
            const message = document.getElementById("message").value.trim();
            const phone = "6282255040653";

            if (!name || !message) {
                Swal.fire({
                    title: "Oops!",
                    text: "Harap isi nama dan pesan terlebih dahulu.",
                    icon: "warning",
                    confirmButtonText: "OK",
                });
                return;
            }

            Swal.fire({
                title: "Kirim Pesan?",
                html: `Halo <strong>${name}</strong>, pesanmu akan dikirim via WhatsApp.`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya, Kirim! 🚀",
                cancelButtonText: "Batal",
            }).then(result => {
                if (result.isConfirmed) {
                    const text = encodeURIComponent(`Halo Abrar, saya *${name}*.\n\n${message}`);
                    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
                }
            });
        });
    }


    // ── ACTIVE NAV HIGHLIGHT ──
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    const navObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(a => a.style.color = "");
                const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (active) active.style.color = "var(--accent)";
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => navObs.observe(s));


    // ── TILT ON PROJECT CARDS ──
    const cards = document.querySelectorAll(".port-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

});