// TYPING EFFECT
let text = "You Are My Universe ❤️  |  My World Spins Around You...";
let i = 0;

function typing() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 80);
    }
}
typing();

// HEART RAIN CANVAS
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: -10,
        size: Math.random() * 12 + 8,
        speed: Math.random() * 2 + 1
    };
}

function drawHeart(h) {
    ctx.fillStyle = "rgba(255,0,120,0.8)";
    ctx.beginPath();
    ctx.moveTo(h.x, h.y);
    ctx.bezierCurveTo(h.x - h.size, h.y - h.size,
                      h.x - h.size * 1.5, h.y + h.size / 2,
                      h.x, h.y + h.size);
    ctx.bezierCurveTo(h.x + h.size * 1.5, h.y + h.size / 2,
                      h.x + h.size, h.y - h.size,
                      h.x, h.y);
    ctx.fill();
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (Math.random() < 0.2) hearts.push(createHeart());

    hearts.forEach((h, index) => {
        h.y += h.speed;
        if (h.y > canvas.height) hearts.splice(index, 1);
        drawHeart(h);
    });

    requestAnimationFrame(animateHearts);
}
animateHearts();

// MUSIC PLAYER
let musicList = [
    "music1.mp3",
    "music2.mp3",
    "music3.mp3"
];

let audio = new Audio();
audio.src = musicList[Math.floor(Math.random() * musicList.length)];

document.getElementById("playBtn").onclick = () => {
    audio.play();
};
