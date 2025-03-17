document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const notif = document.getElementById("notif");
    const contactForm = document.getElementById("contactForm");

    // Toggle mode
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            themeToggle.innerHTML = "";
        } else {
            themeToggle.innerHTML = "";
        }
        showNotification("Mode telah diubah");
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
document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");

    sendButton.addEventListener("click", function () {
        const name = document.getElementById("name").value.trim();
        const message = document.getElementById("message").value.trim();
        const phoneNumber = "6282255040653"; // Ganti dengan nomor tujuan

        if (name && message) {
            // Tampilkan popup SweetAlert
            Swal.fire({
                title: "Pesan Terkirim!",
                text: `Terima kasih, ${name}! Pesan Anda berhasil terkirim.`,
                icon: "success",
                confirmButtonText: "Oke"
            }).then((result) => {
                if (result.isConfirmed) {
                    // WhatsApp hanya terbuka setelah "Oke" ditekan
                    const whatsappURL = `https://wa.me/${phoneNumber}?text=Halo, saya ${encodeURIComponent(name)}.%0A${encodeURIComponent(message)}`;
                    window.open(whatsappURL, "_blank");
                }
            });
        } else {
            Swal.fire({
                title: "Gagal!",
                text: "Mohon isi semua kolom sebelum mengirim pesan!",
                icon: "error",
                confirmButtonText: "Oke"
            });
        }
    });
});


