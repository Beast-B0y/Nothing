// Sélectionne l'élément boutonSon et le compteurAffichage dans le DOM
const boutonSon = document.getElementById('clickSound');
const compteurAffichage = document.getElementById('clickCount');
let compteurPrincipal = 0;

// Tableau contenant les chemins vers les fichiers sonores
const fichiersSonores = [
    "songs/boing.mp3", "songs/applepay.mp3", "songs/netflix.mp3",
    "songs/sncf.mp3", "songs/bip.mp3", "songs/bruh.mp3",
    "songs/buzzer.mp3", "songs/discord.mp3", "songs/error.mp3",
    "songs/fortnite.mp3", "songs/pew.mp3", "songs/punch.mp3",
    "songs/roblox.mp3", "songs/shocked.mp3", "songs/wow.mp3"
];

// Crée un tableau d'éléments audio et précharge les sons
const audioElements = fichiersSonores.map(fichier => {
    const audio = new Audio(fichier);
    audio.preload = 'auto';
    return audio;
});

// Gestionnaire d'événements pour le clic sur le boutonSon
boutonSon.addEventListener('click', () => {
    // Incrémente le compteur de clics
    compteurPrincipal++;
    // Met à jour l'affichage du compteur
    compteurAffichage.textContent = compteurPrincipal;

    // Sélectionne un son aléatoire et le joue
    const indexAleatoire = Math.floor(Math.random() * fichiersSonores.length);
    const sonAleatoire = audioElements[indexAleatoire];
    sonAleatoire.currentTime = 0;
    sonAleatoire.play();

    // Affiche une alerte tous les 100 clics
    if (compteurPrincipal % 100 === 0) {
        alert(`Wow ! ${compteurPrincipal} clics !`); // Alerte simple
    }
});

// --------------------------------------------------
// Code pour le minuteur (timer)
// --------------------------------------------------
let timerInterval;
let tempsSecondes = 0;
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
    pauseTimer();
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
    if (timerDisplay) {
        timerDisplay.textContent = `${tempsHeures.toString().padStart(2, '0')}:${tempsMinutes.toString().padStart(2, '0')}:${tempsSecondes.toString().padStart(2, '0')}`;
    }
}

// --------------------------------------------------
// Code pour le bouton mute (son)
// --------------------------------------------------
const muteButton = document.getElementById('muteButton');
let isMuted = false;

if (muteButton) {
    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        audioElements.forEach(audio => audio.muted = isMuted);
        muteButton.textContent = isMuted ? 'Réactiver les sons' : 'Couper les sons';
        muteButton.classList.toggle('muted');
    });
}

// --------------------------------------------------
// Code pour le menu déroulant
// --------------------------------------------------
const menuToggle = document.querySelector('.menu-toggle');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', (event) => {
        if (menuToggle && !menuToggle.contains(event.target)) {
            menu.style.display = 'none';
        }
    });
}

// --------------------------------------------------
// Code pour le mode clair/sombre
// --------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const modeBouton = document.getElementById('modeButton');
    const lightThemeCSS = document.getElementById('light-theme-css');
    const darkThemeCSS = document.getElementById('dark-theme-css');

    let modeClair = false;

    if (modeBouton) {
        modeBouton.addEventListener('click', () => {
            modeClair = !modeClair;

            if (modeClair) {
                lightThemeCSS.rel = "stylesheet";
                darkThemeCSS.rel = "";
                modeBouton.textContent = 'Mode Clair';
                localStorage.setItem('theme', 'light');
                document.body.classList.add('light-mode');
            } else {
                darkThemeCSS.rel = "stylesheet";
                lightThemeCSS.rel = "";
                modeBouton.textContent = 'Mode Sombre';
                localStorage.setItem('theme', 'dark');
                document.body.classList.remove('light-mode');
            }
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        modeClair = true;
        lightThemeCSS.rel = "stylesheet";
        darkThemeCSS.rel = "";
        modeBouton.textContent = 'Mode Clair'; // Correct text on load
        document.body.classList.add('light-mode');
    } else {
        darkThemeCSS.rel = "stylesheet";
        lightThemeCSS.rel = "";
        modeBouton.textContent = 'Mode Sombre';
        document.body.classList.remove('light-mode');
    }
});