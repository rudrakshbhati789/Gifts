
const loveSound = document.getElementById('love-sound');

  // Select all floating love words
  const loveWords = document.querySelectorAll('.love-word');

  loveWords.forEach(word => {
    word.addEventListener('click', () => {
      // Play sound from start
      loveSound.currentTime = 0;
      loveSound.play();
    });
  });