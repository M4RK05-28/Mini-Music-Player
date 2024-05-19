const songList = [
    {
        nome: "This Is What It Feels Like (Audien Remix)",
        artista: "Armin van Buuren feat. Trevor Guthrie",
        src: "./musica/Armin van Buuren feat. Trevor Guthrie - This Is What It Feels Like (Audien Remix).mp3",
        cobrir: "./img/eletronica.jpg"
    },
    {
        nome: "Sweater Weather",
        artista: "The Neighbourhood",
        src: "./musica/The Neighbourhood - Sweater Weather.mp3",
        cobrir: "./img/rock.jpg"
    },
    {
        nome: "Poeira da Lua",
        artista: "Marcos e Belutti",
        src: "./musica/Poeira da Lua Marcos e Belutti (Clipe Oficial)[1].mp3",
        cobrir: "./img/sertanejo.jpg"
    }
];

const artistaNome = document.querySelector('.artista-nome');
const nomeDaMusica = document.querySelector('.nome-da-musica');
const progresso = document.querySelector('.progresso');
const tempo = document.querySelector('.tempo');
const cobrir = document.getElementById('cobrir');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const playBack = document.getElementById('play-back');
const playForward = document.getElementById('play-forward');
const barraDeProgresso = document.querySelector('.barra-de-progresso');
const disco = document.querySelector('.disco');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    play.addEventListener('click', togglePlayPause);
    pause.addEventListener('click', togglePlayPause);
    playBack.addEventListener('click', prevSong);
    playForward.addEventListener('click', nextSong);
    barraDeProgresso.addEventListener('click', seek);
});

function loadSong(index) {
    const songData = songList[index];
    song.src = songData.src;
    artistaNome.textContent = songData.artista;
    nomeDaMusica.textContent = songData.nome;
    disco.style.backgroundImage = `url(${songData.cobrir})`;
    progresso.style.width = '0%';
    tempo.textContent = '0:00 - 0:00';
    playing = false;
    play.style.display = 'inline';
    pause.style.display = 'none';
}

function togglePlayPause() {
    if (playing) {
        song.pause();
        play.style.display = 'inline';
        pause.style.display = 'none';
    } else {
        song.play();
        play.style.display = 'none';
        pause.style.display = 'inline';
    }
    playing = !playing;
}

function prevSong() {
    currentSong = (currentSong - 1 + songList.length) % songList.length;
    loadSong(currentSong);
    if (playing) {
        song.play();
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songList.length;
    loadSong(currentSong);
    if (playing) {
        song.play();
    }
}

function updateProgress() {
    if (song.duration) {
        const progress = (song.currentTime / song.duration) * 100;
        progresso.style.width = `${progress}%`;
        tempo.textContent = `${formatTime(song.currentTime)} - ${formatTime(song.duration)}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function seek(event) {
    const width = barraDeProgresso.clientWidth;
    const clickX = event.offsetX;
    const duration = song.duration;
    song.currentTime = (clickX / width) * duration;
}
