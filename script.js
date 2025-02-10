document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const video = document.getElementById("qrScanner");
    let scanner = null;

    // Fungsi untuk menangani login
    function handleLogin() {
        const nama = document.getElementById("nama").value;
        const password = document.getElementById("password").value;
        const bagian = document.getElementById("bagian").value;

        if (nama && password && bagian) {
            document.getElementById("loginPage").style.display = "none";
            document.getElementById("scanPage").style.display = "block";
            startScanner();
        } else {
            alert("Harap isi semua kolom!");
        }
    }

    // Fungsi untuk logout
    function handleLogout() {
        document.getElementById("scanPage").style.display = "none";
        document.getElementById("loginPage").style.display = "block";
        stopScanner();
    }

    // Fungsi untuk memulai scan QR Code
    function startScanner() {
        scanner = new QrScanner(video, (result) => {
            document.getElementById("scanResult").innerText = `Kode QR: ${result}`;
            console.log("QR Code Scanned:", result);
        });

        scanner.start().catch(err => {
            console.error("Error mengakses kamera:", err);
            alert("Tidak dapat mengakses kamera. Periksa izin browser!");
        });
    }

    // Fungsi untuk menghentikan scanner
    function stopScanner() {
        if (scanner) {
            scanner.stop();
        }
    }

    // Event Listener
    loginBtn.addEventListener("click", handleLogin);
    logoutBtn.addEventListener("click", handleLogout);
});
