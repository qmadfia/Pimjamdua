let currentUser = null;

function login() {
    const nama = document.getElementById('nama').value;
    const password = document.getElementById('password').value;
    const bagian = document.getElementById('bagian').value;

    // Simulasi login sederhana
    if (nama && password && bagian) {
        currentUser = { nama, bagian };
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('scan-section').style.display = 'block';
    } else {
        alert('Isi semua field!');
    }
}

function register() {
    // Simulasi register sederhana
    alert('Register berhasil! Silakan login.');
}

function startScan() {
    const video = document.getElementById('qr-video');
    const scanResult = document.getElementById('scan-result');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            video.srcObject = stream;
            video.setAttribute("playsinline", true);
            video.play();
            requestAnimationFrame(tick);
        });

    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                scanResult.innerText = `Buku Sample: ${code.data}`;
                saveToSpreadsheet(code.data);
            }
        }
        requestAnimationFrame(tick);
    }
}

function saveToSpreadsheet(styleNumber) {
    if (!currentUser) return;

    const data = {
        nama: currentUser.nama,
        bagian: currentUser.bagian,
        styleNumber: styleNumber,
        tanggal: new Date().toLocaleString()
    };

    // Simulasi pengiriman data ke spreadsheet
    console.log('Data dikirim ke spreadsheet:', data);
    alert('Peminjaman berhasil!');
}
