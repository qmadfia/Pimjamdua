import QrScanner from "https://unpkg.com/qr-scanner@1.4.2/qr-scanner.min.js";

// Menangani klik tombol login
function handleLogin() {
    const nama = document.getElementById("nama").value;
    const password = document.getElementById("password").value;
    const bagian = document.getElementById("bagian").value;
    
    if (nama && password && bagian) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("scanPage").style.display = "block";
        startScanner(); // Mulai pemindaian QR setelah login
    } else {
        alert("Harap isi semua kolom!");
    }
}

// Menangani logout
function handleLogout() {
    document.getElementById("scanPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
    stopScanner();
}

// Menyiapkan scanner QR
const video = document.getElementById("qrScanner");
let scanner;

function startScanner() {
    scanner = new QrScanner(video, (result) => {
        document.getElementById("scanResult").innerText = `Kode QR: ${result}`;
        console.log("QR Code Scanned:", result);
    });

    scanner.start();
}

// Menghentikan scanner jika logout
function stopScanner() {
    if (scanner) {
        scanner.stop();
    }
}

// Event Listener
document.getElementById("loginBtn").addEventListener("click", handleLogin);
document.getElementById("logoutBtn").addEventListener("click", handleLogout);
