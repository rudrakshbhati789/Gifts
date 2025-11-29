document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('open-btn');
    const entranceScreen = document.getElementById('entrance');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const heartsContainer = document.getElementById('hearts-container');

    // Entrance Animation
    openBtn.addEventListener('click', function() {
        // Play Music (User interaction required)
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play failed (expected if no source):", e));

        // Fade out entrance
        entranceScreen.style.opacity = '0';
        
        setTimeout(() => {
            entranceScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Start falling hearts
            startFallingHearts();
            
            // Start Slideshow
            showSlides(slideIndex);
            startAutoSlides();
        }, 1000);
    });

    // Scroll Observer for Fade-in effects
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Falling Hearts Animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        // Random Position
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Random Size
        const size = Math.random() * 20 + 10; // 10px to 30px
        heart.style.fontSize = size + 'px';
        
        // Random Animation Duration
        const duration = Math.random() * 3 + 3; // 3s to 6s
        heart.style.animationDuration = duration + 's';
        
        // Random Color (Pink/Red variations)
        const colors = ['#e91e63', '#ff4081', '#f50057', '#c2185b', '#ff80ab'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        heartsContainer.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
/* -------------------------------
   ❤️ EMOJI RAIN
--------------------------------*/
function startEmojiRain() {
    const emojis = ["❤️", "💖", "💞", "🦋", "✨", "💕", "💗", "💘", "🌸", "🎈"];

    setInterval(() => {
        let e = document.createElement("div");
        e.className = "rain-item";
        e.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

        e.style.left = Math.random() * 100 + "vw";
        e.style.fontSize = (20 + Math.random() * 20) + "px";
        e.style.animationDuration = (3 + Math.random() * 3) + "s";

        document.getElementById("emoji-rain").appendChild(e);

        setTimeout(() => e.remove(), 7000);
    }, 300);
}

/* -------------------------------
   📸 IMAGE RAIN
--------------------------------*/
function startImageRain() {
    const pics = [
        "/new/Images/1.jpeg",
        "/new/Images/2.jpeg",
        "/new/Images/3.jpeg",
        "/new/Images/4.jpeg",
        "/new/Images/5.jpeg"
    ];

    setInterval(() => {
        let img = document.createElement("img");
        img.src = pics[Math.floor(Math.random() * pics.length)];
        img.className = "rain-item rain-image";

        img.style.left = Math.random() * 90 + "vw";
        img.style.animationDuration = (4 + Math.random() * 3) + "s";

        document.getElementById("image-rain").appendChild(img);

        setTimeout(() => img.remove(), 7000);
    }, 800);
}

/* -------------------------------
   🚀 START RAIN WHEN OPEN BUTTON CLICKED
--------------------------------*/
document.getElementById("open-btn").addEventListener("click", () => {
    startEmojiRain();
    startImageRain();
});

    function startFallingHearts() {
        // Create initial batch
        for(let i=0; i<10; i++) setTimeout(createHeart, i * 200);
        // Continuous flow
        setInterval(createHeart, 400);
    }

    // Mouse Trail Effect
    let lastTime = 0;
    document.addEventListener('mousemove', function(e) {
        const currentTime = Date.now();
        if (currentTime - lastTime < 50) return; // Throttle creation (every 50ms)
        lastTime = currentTime;

        const sparkle = document.createElement('div');
        sparkle.classList.add('trail-sparkle');
        
        // Set position
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        
        // Random color for trail
        const colors = ['#e91e63', '#ffd700', '#ff4081'];
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        sparkle.innerHTML = '❤';
        sparkle.style.backgroundColor = 'transparent';
        sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.fontSize = '12px';
        sparkle.style.position = 'fixed';
        sparkle.style.pointerEvents = 'none';
        
        document.body.appendChild(sparkle);

        // Animate removal
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    });
});

// Slideshow Logic
let slideIndex = 1;
let slideTimer;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  resetTimer();
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
  resetTimer();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (slides.length === 0) return; // Safety check

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function startAutoSlides() {
    slideTimer = setInterval(function() {
        plusSlides(1);
    }, 3000); // Change image every 3 seconds
}

function resetTimer() {
    clearInterval(slideTimer);
    startAutoSlides();
}