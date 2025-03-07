document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const notif = document.getElementById("notif");
    const contactForm = document.getElementById("contactForm");

    // Toggle mode
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            themeToggle.innerHTML = "Mode Terang";
        } else {
            themeToggle.innerHTML = "Mode Gelap";
        }
        showNotification("Mode telah diubah");
    });

    // Form submission to WhatsApp
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;
        const phoneNumber = "6282255040653"; // Ganti dengan nomor tujuan
        
        if (name && message) {
            const whatsappURL = `https://wa.me/${phoneNumber}?text=Halo, saya ${encodeURIComponent(name)}.%0A${encodeURIComponent(message)}`;
            window.open(whatsappURL, "_blank");
            showNotification("Pesan dikirim ke WhatsApp!");
        } else {
            showNotification("Mohon isi semua kolom!");
        }
    });

    // Function to show notification
    function showNotification(text) {
        notif.textContent = text;
        notif.style.display = "block";
        notif.style.opacity = "1";
        notif.style.transform = "translate(-50%, -50%)";
        
        setTimeout(() => {
            notif.style.opacity = "0";
            setTimeout(() => {
                notif.style.display = "none";
            }, 500);
        }, 2000);
    }
});
