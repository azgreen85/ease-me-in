const tracks = [
  "https://storage.googleapis.com/ease-me-in-music/2024-07-24%2014-36-18.mp3",
  "https://storage.googleapis.com/ease-me-in-music/2025-02-25%2017-47-07.mp3",
  "https://storage.googleapis.com/ease-me-in-music/2025-04-07%2012-57-53.mp3",
  "https://storage.googleapis.com/ease-me-in-music/2025-04-24%2002-05-56.mp3",
  "https://storage.googleapis.com/ease-me-in-music/2025-05-19%2018-17-41%201.mp3",
  "https://storage.googleapis.com/ease-me-in-music/amafro%201.mp3",
  "https://storage.googleapis.com/ease-me-in-music/finals%20mix%20Sp25.mp3"
];

const musicList = document.getElementById("music-list");

let currentAudio = null;
let currentContainer = null;

tracks.forEach(url => {
  const container = document.createElement("div");
  container.className = "track-container";

  const li = document.createElement("li");
  container.appendChild(li);

  const audio = document.createElement("audio");
  audio.src = url;
  container.appendChild(audio);

  // Progress overlay + bar
  const overlay = document.createElement("div");
  overlay.className = "progress-overlay";

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  overlay.appendChild(progressBar);

  container.appendChild(overlay);
  musicList.appendChild(container);

  // Update progress bar (only once per audio)
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });

  // Border toggle
  audio.addEventListener("play", () => overlay.classList.add("playing"));
  audio.addEventListener("pause", () => overlay.classList.remove("playing"));
  audio.addEventListener("ended", () => {
    overlay.classList.remove("playing");
    progressBar.style.width = "0%";
    li.classList.remove("playing");
    currentAudio = null;
    currentContainer = null;
  });

  // Play/pause toggle on box
  li.addEventListener("click", () => {
    if (currentContainer === container) {
      if (currentAudio.paused) {
        currentAudio.play();
        li.classList.add("playing");
      } else {
        currentAudio.pause();
        li.classList.remove("playing");
      }
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentContainer.querySelector("li").classList.remove("playing");
      currentContainer.querySelector(".progress-bar").style.width = "0%";
    }

    currentAudio = audio;
    currentContainer = container;

    currentAudio.play();
    li.classList.add("playing");
  });

  // Click-to-seek on overlay
  overlay.addEventListener("click", e => {
    e.stopPropagation(); // prevent box click
    if (!currentAudio) return;

    const rect = overlay.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    let clickPercent = clickX / rect.width;
    clickPercent = Math.max(0, Math.min(1, clickPercent));

    currentAudio.currentTime = currentAudio.duration * clickPercent;
  });
});
