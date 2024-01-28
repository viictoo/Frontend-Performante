const art = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');


let isPlaying = false

// music files
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Blake'
  },
  {
    name: 'jacinto-2',
    displayName: 'Kuja Utanipata',
    artist: 'Qwangu',
  },
  {
    name: 'jacinto-3',
    displayName: 'Not Another Love Song',
    artist: 'Bass Singer',
  },
  {
    name: 'metric-1',
    displayName: 'Kuja Utanipata',
    artist: 'Qwangu',
  }
]

// toggle background glow
function showBGGlow(key) {
  if (key === 'on') art.style.boxShadow = '0 5px 30px 5px #f36d5956'
  else art.style.boxShadow = 'none';
}
// play song
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'pause')
  music.play();
  showBGGlow('on');
}

// pause song
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'play')
  music.pause();
  showBGGlow('off');
}

// toggle play pause song
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
document.addEventListener('keypress', (e) => {
  if (e.key === " ") isPlaying ? pauseSong() : playSong()
});

// Update Player
function loadSong(song) {
  title.innerText = song.displayName;
  artist.innerText = song.artist;
  music.src = `music/${song.name}.mp3`;
  art.src = `img/${song.name}.jpg`;
}

let songIndex = 0

// nextSong
function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  };
  loadSong(songs[songIndex]);
  playSong();
}

// prevSong
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length[-1]
  };
  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex])

// Update Progress Bar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update Progress Bar
    const percentProgress = (currentTime / duration) * 100;
    progress.style.width = `${percentProgress}%`;

    // calculate and format duration
    const durationMins = Math.floor(duration / 60);
    let durationSecs = (Math.floor(duration % 60));
    if (durationSecs < 10) durationSecs = `0${durationSecs}`;

    // delay updating Duration text until value is ready to avoid NaN
    if (durationSecs) durationEl.innerText = `${durationMins}:${durationSecs}`;

    // calculate and format current time
    const currentMins = Math.floor(currentTime / 60);
    let currentSecs = (Math.floor(currentTime % 60));
    if (currentSecs < 10) currentSecs = `0${currentSecs}`;
    // delay updating Duration text until value is ready to avoid NaN
    if (currentSecs) currentTimeEl.innerHTML = `${currentMins}:${currentSecs}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Toggle Song Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
volumeControl.addEventListener('input', (event) => {
  music.volume = event.target.value;
 });
