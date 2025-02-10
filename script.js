let currentUser = null;
const scriptUrl = "URL_GOOGLE_APPS_SCRIPT"; // Ganti dengan URL Web App Anda

function login() {
    const nama = document.getElementById('nama').value;
    const password = document.getElementById('password').value;

    fetch(`${scriptUrl}?nama=${nama}&password=${password}`)
        .then(response => response.text())
        .then(data => {
            if (data !== "Gagal") {
                currentUser = JSON.parse(data);
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('scan-section').style.display = 'block';
            } else {
                alert('Login gagal!');
            }
        });
}

function register() {
    const nama = document.getElementById('nama').value;
    const password = document.getElementById('password').value;
    const bagian = document.getElementById('bagian').value;

    const data = { nama, password, bagian, sheetName: "Users" };
    fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(response => response.text())
      .then(data => alert(data));
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
        nama: currentUser[0],
        bagian: currentUser[2],
        styleNumber: styleNumber,
        sheetName: "Peminjaman"
    };

    fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(response => response.text())
      .then(data => alert(data));
}
