//Inisisalisasi canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//Inisialisasi pesawat pemain
const player = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    width: 30,
    height: 50,
    image: new Image(),
    speed: 5
};

// Set gambar pesawat
player.image.src = 'roket.png';

//Inisialisasi Asteroid
const asteroids = [];
const asteroidSpeed = 2;

//Fungsi untuk menggambar pesawat
function drawPlayer() {
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
}

//Fungsi untuk menggambar asteroid
function drawAsteroids() {
    for (const asteroid of asteroids) {
        ctx.fillStyle = '#F00';
        ctx.fillRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height);
    }
}

//Fungsi untuk menggerakkan pesawat
function movePlayer(direction) {
    if (direction === 'left' && player.x - player.speed > 0) {
        player.x -= player.speed;
    } else if (direction === 'right' && player.x + player.width + player.speed < canvas.width) {
        player.x += player.speed;
    }
}

//Fungsi untuk membuat asteroid baru
function createAsteroid() {
    const asteroid = {
        x: Math.random() * (canvas.width - 20),
        y: 0,
        width: 20,
        height: 20
    };
    asteroids.push(asteroid);
}

let skor = 0;
function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Skor : ' + skor, 10, 30);
} 

//Fungsi untuk mengupdate permainan
function updateGame() {
    console.log('Update Game');

    //Hapus layar
    ctx.clearRect(0,0, canvas.width, canvas.height);

    //Update dan gambar pesawat
    drawPlayer();

    //Update dan gambar asteroid
    drawAsteroids();
    for (const asteroid of asteroids) {
        asteroid.y += asteroidSpeed;

        console.log('Checking Collision');

        //Deteksi tabrakan dengan pesawat
        if (
            player.x < asteroid.x + asteroid.width &&
            player.x + player.width > asteroid.x &&
            player.y < asteroid.y + asteroid.height &&
            player.y + player.height > asteroid.y
        ) {
            console.log('Detected Collision');
            alert('Game Over! Skor Anda : ' + skor);
            asteroids.length = 0; // (Length = isi dari suatu objek) Jadi, ketika length = 0, maka isinya dihapus/dihilangkan
            document.location.reload();
        }

        // Deteksi asteroid melewati batas bawah
        if (asteroid.y > canvas.height) {
            // Tambahkan skor
            skor += 1;

            // Hapus asteroid yang melewati batas
            asteroids.splice(asteroids.indexOf(asteroid), 1);

            console.log('New Asteroid Created');
        }
    }

    //Buat asteroid baru secara acak
    if (Math.random() < 0.05) {
        createAsteroid();
    }

    // Gambar skor
    drawScore();

    //Loop pembaruan
    requestAnimationFrame(updateGame);
}

//Tanggapan keyboard
document.addEventListener('keydown', function (event) {
    if(event.code === 'ArrowLeft') {
        movePlayer('left');
    } else if (event.code === 'ArrowRight') {
        movePlayer('right');
    }
});

updateGame();
// Memulai game
