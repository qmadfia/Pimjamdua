// Menangani klik tombol login
function handleLogin() {
    const nama = document.getElementById("nama").value;
    const password = document.getElementById("password").value;
    const bagian = document.getElementById("bagian").value;
    
    // Mengecek apakah semua input sudah diisi
    if (nama && password && bagian) {
        // Menyembunyikan halaman login dan menampilkan halaman scan
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("scanPage").style.display = "block";
    } else {
        // Menampilkan peringatan jika ada kolom yang kosong
        alert("Harap isi semua kolom!");
    }
}

// Event listener untuk login
document.getElementById("loginBtn").addEventListener("click", handleLogin);
