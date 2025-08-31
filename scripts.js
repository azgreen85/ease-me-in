let currentAudio = null;
let currentBox = null;

document.querySelectorAll('li').forEach(box => {
  const audio = box.querySelector('audio');

  box.addEventListener('click', () => {
    if (!audio) return;

    // If this box is already playing, toggle pause/play
    if (currentBox === box) {
      if (currentAudio.paused) {
        currentAudio.play();
        box.classList.add('playing');
      } else {
        currentAudio.pause();
        box.classList.remove('playing');
      }
      return;
    }

    // If another track is playing, pause it
    if (currentAudio) {
      currentAudio.pause();
      currentBox.classList.remove('playing');
    }

    // Play new track
    currentAudio = audio;
    currentBox = box;
    currentAudio.play();
    box.classList.add('playing');

    // Reset when audio ends
    currentAudio.addEventListener('ended', () => {
      box.classList.remove('playing');
      currentAudio = null;
      currentBox = null;
    });
  });
});