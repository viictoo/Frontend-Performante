const art = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

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
    displayName: 'Seven Nation Army',
    artist: 'ZAKES',
  },
  {
    name: 'jacinto-3',
    displayName: 'Not Another Love Song',
    artist: 'Bass Singer',
  }
]

// play song
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'pause')
  music.play();
}

// pause song
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'play')
  music.pause();
}

// toggle play pause song
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update Player
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
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

// Toggle Song Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
