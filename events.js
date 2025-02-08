const boutonSon = document.getElementById('clickSound');
const compteurAffichage = document.getElementById('clickCount');
let compteurPrincipal = 0;

const fichiersSonores = [
    "songs/boing.mp3", "songs/applepay.mp3", "songs/netflix.mp3",
    "songs/sncf.mp3", "songs/bip.mp3", "songs/bruh.mp3",
    "songs/buzzer.mp3", "songs/discord.mp3", "songs/error.mp3",
    "songs/fortnite.mp3", "songs/pew.mp3", "songs/punch.mp3",
    "songs/roblox.mp3", "songs/shocked.mp3", "songs/wow.mp3"
];

const audioElements = fichiersSonores.map(fichier => {
    const audio = new Audio(fichier);
    audio.preload = 'auto';
    return audio;
});

boutonSon.addEventListener('click', () => {
    compteurPrincipal++;
    compteurAffichage.textContent = compteurPrincipal;

    const indexAleatoire = Math.floor(Math.random() * fichiersSonores.length);
    const sonAleatoire = audioElements[indexAleatoire];
    sonAleatoire.currentTime = 0;
    sonAleatoire.play();

    if (compteurPrincipal % 100 === 0) {
        alert(`Wow ! ${compteurPrincipal} clics !`); // Alerte simple
    }
});

// ... (timer, mute, menu code inchangé)

let timerInterval;
let tempsSecondes = 0; // Plus clair que seconds
let tempsMinutes = 0;
let tempsHeures = 0;

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer(); // Utiliser pauseTimer pour éviter la duplication de code
    tempsSecondes = 0;
    tempsMinutes = 0;
    tempsHeures = 0;
    updateTimer();
    compteurPrincipal = 0;
    compteurAffichage.textContent = 0;
}

function updateTimer() {
    tempsSecondes++;
    if (tempsSecondes === 60) {
        tempsSecondes = 0;
        tempsMinutes++;
        if (tempsMinutes === 60) {
            tempsMinutes = 0;
            tempsHeures++;
        }
    }

    const timerDisplay = document.getElementById("timer");
    if (timerDisplay) { // Vérifier si l'élément existe avant de le manipuler
        timerDisplay.textContent = `${tempsHeures.toString().padStart(2, '0')}:${tempsMinutes.toString().padStart(2, '0')}:${tempsSecondes.toString().padStart(2, '0')}`;
    }
}

const muteButton = document.getElementById('muteButton');
let isMuted = false;

if (muteButton) { // Vérifier si l'élément existe
    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        audioElements.forEach(audio => audio.muted = isMuted);
        muteButton.textContent = isMuted ? 'Réactiver les sons' : 'Couper les sons';
        muteButton.classList.toggle('muted');
    });
}


const menuToggle = document.querySelector('.menu-toggle');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger && menu) { // Vérification combinée
    hamburger.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', (event) => {
        if (menuToggle && !menuToggle.contains(event.target)) {
            menu.style.display = 'none';
        }
    });
}