// Typing Effect
let text = "You Are My Universe ❤️  |  My World Spins Around You...";
let i = 0;

function typing() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 70);
    }
}
typing();

// Heart Rain Canvas
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

// Default falling hearts
function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: -10,
        size: Math.random() * 12 + 6,
        speed: Math.random() * 2 + 1,
        alpha: 1
    };
}

// Explosion hearts on click
function heartExplosion(x, y) {
    for (let i = 0; i < 30; i++) {
        hearts.push({
            x,
            y,
            size: Math.random() * 12 + 8,
            speedX: (Math.random() - 0.5) * 6,
            speedY: (Math.random() - 0.5) * 6,
            alpha: 1
        });
    }
}

function drawHeart(h) {
    ctx.fillStyle = `rgba(255,0,150,${h.alpha})`;
    ctx.beginPath();
    ctx.moveTo(h.x, h.y);
    ctx.bezierCurveTo(h.x - h.size, h.y - h.size,
        h.x - h.size * 1.3, h.y + h.size / 2,
        h.x, h.y + h.size);
    ctx.bezierCurveTo(h.x + h.size * 1.3, h.y + h.size / 2,
        h.x + h.size, h.y - h.size,
        h.x, h.y);
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Normal hearts
    if (Math.random() < 0.12) hearts.push(createHeart());

    hearts.forEach((h, i) => {
        if (h.speedX !== undefined) {
            h.x += h.speedX;
            h.y += h.speedY;
            h.alpha -= 0.02;
        } else {
            h.y += h.speed;
        }

        if (h.alpha <= 0 || h.y > canvas.height) hearts.splice(i, 1);

        drawHeart(h);
    });

    requestAnimationFrame(animate);
}
animate();

// Explosion trigger
document.getElementById("earth").onclick = (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;
    heartExplosion(x, y);
};

// Music
let songs = ["music1.mp3", "music2.mp3", "music3.mp3"];
let audio = new Audio(songs[Math.floor(Math.random() * songs.length)]);
document.getElementById("playBtn").onclick = () => audio.play();
