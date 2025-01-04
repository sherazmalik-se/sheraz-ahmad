document.addEventListener("DOMContentLoaded", (event) => {
  let currentSongIndex = 0;
  /* fastforward & rewind */
  const audioName = document.querySelector(".audio-name");
  const author = document.querySelector(".author");
  const playReverseBtn = document.querySelector(".play-reverse");
  const playForwardBtn = document.querySelector(".play-forward");
  const audioFiles = [
    {
      audioName: "Lost in the City Lights",
      author: "Cosmo Sheldrake",
      path: "../resources/lost-in-city-lights-145038.mp3",
    },
    {
      audioName: "Forest Lullaby",
      author: "Lesfm",
      path: "../resources/forest-lullaby-110624.mp3",
    },
  ];

  /* cta */
  const playBtn = document.querySelector(".playPause");
  const img = playBtn.querySelector("img");
  /* audio */
  const audio = document.querySelector(".audio-player");
  /* show time */
  const showCurrentTime = document.querySelector(".current-time");
  const showDuration = document.querySelector(".duration");
  /* progress */
  const progress = document.querySelector(".progress-bar__fg");
  const progressBg = document.querySelector(".progress-bar__bg");

  function updatePlayPause() {
    progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    const duration = audio.currentTime;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    showCurrentTime.innerHTML = formattedDuration;
    if (audio.paused) {
      img.src = "./resources/Play_fill.svg";
    } else {
      img.src = "./resources/pause.svg";
    }
  }

  function fastForwardTo(e) {
    const width = progressBg.clientWidth;
    const clickX = e.offsetX;
    const duration = (clickX / width) * audio.duration;
    audio.currentTime = duration;
    updatePlayPause();
  }

  function playPause() {
    if (!audio.paused) {
      audio.pause();
      img.src = "./resources/Play_fill.svg";
    } else {
      audio.play();
      img.src = "./resources/pause.svg";
    }
  }

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
    audio.src = audioFiles[currentSongIndex].path;
    audioName.innerHTML = audioFiles[currentSongIndex].audioName;
    author.innerHTML = audioFiles[currentSongIndex].author;
    getAudioDuration(audio.src)
      .then((duration) => {
        updatePlayPause();
        showDuration.innerHTML = duration; // Output: mm:ss
      })
      .catch((error) => {
        console.error("Error getting audio duration:", error);
      });
    audio.play();
  }
  function prevSong() {
    currentSongIndex =
      (currentSongIndex - 1 + audioFiles.length) % audioFiles.length;
    audio.src = audioFiles[currentSongIndex].path;
    audioName.innerHTML = audioFiles[currentSongIndex].audioName;
    author.innerHTML = audioFiles[currentSongIndex].author;
    getAudioDuration(audio.src)
      .then((duration) => {
        updatePlayPause();
        showDuration.innerHTML = duration; // Output: mm:ss
      })
      .catch((error) => {
        console.error("Error getting audio duration:", error);
      });
    audio.play();
  }

  function getAudioDuration(file) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(file);
      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedDuration = `${minutes}:${
          seconds < 10 ? "0" : ""
        }${seconds}`;
        resolve(formattedDuration);
      });
      audio.addEventListener("error", (e) => {
        reject(e);
      });
    });
  }

  getAudioDuration(audio.src)
    .then((duration) => {
      showDuration.innerHTML = duration; // Output: mm:ss
    })
    .catch((error) => {
      console.error("Error getting audio duration:", error);
    });

  audio.addEventListener("timeupdate", updatePlayPause);
  playBtn.addEventListener("click", playPause);
  progressBg.addEventListener("click", fastForwardTo);
  playForwardBtn.addEventListener("click", nextSong);
  playReverseBtn.addEventListener("click", prevSong);
});
