const tracks = [
  { title: "#1: 30k", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/2024-07-24%2014-36-18.mp3" },
  { title: "#2: cabo", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/2025-02-25%2017-47-07.mp3" },
  { title: "#3: freak", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/2025-04-07%2012-57-53.mp3" },
  { title: "#4: late night afro house", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/2025-04-24%2002-05-56.mp3" },
  { title: "#5: 160min afrobeat & dancehall", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/2025-05-19%2018-17-41%201.mp3" },
  { title: "#6: amafro1", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/amafro%201.mp3" },
  { title: "#7: finnals sp25", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/finals%20mix%20Sp25.mp3" },
  { title: "#8: fetch", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/2025-06-05%2013-54-08.mp3" },
  { title: "#9: cant believe it", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/2025-06-11%2018-57-46.mp3" },
  { title: "#10: finnals f24", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/finnals%20mix.mp3" },
  { title: "#11: bounce house", author: "khalfani", src: "https://storage.googleapis.com/ease-me-in-music/Bounce%20house%20mix.mp3" },
  { title: "#12: house aif", author: "azikiwea", src: "https://storage.googleapis.com/ease-me-in-music/house%20mix%201.mp3"}
];

const musicList = document.getElementById("music-list");

let currentAudio = null;
let currentContainer = null;

tracks.forEach(track => {
  const container = document.createElement("div");
  container.className = "track-container";

  const li = document.createElement("li");
  // Add title div
const titleEl = document.createElement("div");
titleEl.className = "track-title";
titleEl.textContent = track.title;
li.appendChild(titleEl);

// Add author div
const authorEl = document.createElement("div");
authorEl.className = "track-author";
authorEl.textContent = track.author;
li.appendChild(authorEl);
  container.appendChild(li);

  const audio = document.createElement("audio");
  audio.src = track.src;
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
