// Sélectionne l'élément boutonSon et le compteurAffichage dans le DOM
const boutonSon = document.getElementById('clickSound');
const compteurAffichage = document.getElementById('clickCount');

// Initialise le compteur une seule fois, au niveau global (CORRECT)
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

// Sélectionne les éléments de la barre de progression
const progressBar = document.querySelector('.progress-bar-inner');

// Gestionnaire d'événements pour le clic sur le boutonSon (CORRIGÉ)
boutonSon.addEventListener('click', () => {
    // Incrémente le compteur de clics
    compteurPrincipal++;
    // Met à jour l'affichage du compteur
    compteurAffichage.textContent = compteurPrincipal;

    // Calcule le pourcentage de progression sur 100 clics
    const pourcentage = Math.round((compteurPrincipal % 100) / 99 * 100);

    // Met à jour la largeur de la barre de progression intérieure
    progressBar.style.width = `${pourcentage}%`;

     // Met à jour la largeur de la barre de progression
     progressBar.style.width = `${pourcentage}%`;

     if (pourcentage < 10) {
        progressBar.style.backgroundColor = '#FF0000'; // Rouge vif (0-9%)
    } else if (pourcentage < 20) {
        progressBar.style.backgroundColor = '#FF3300'; // Rouge un peu moins vif (10-19%)
    } else if (pourcentage < 30) {
        progressBar.style.backgroundColor = '#FF6600'; // Rouge-orange (20-29%)
    } else if (pourcentage < 40) {
        progressBar.style.backgroundColor = '#FF9900'; // Orange (30-39%)
    } else if (pourcentage < 50) {
        progressBar.style.backgroundColor = '#FFCC00'; // Orange clair (40-49%)
    } else if (pourcentage < 60) {
        progressBar.style.backgroundColor = '#FFFF00'; // Jaune (50-59%)
    } else if (pourcentage < 70) {
        progressBar.style.backgroundColor = '#99CC00'; // Jaune-vert (60-69%)
    } else if (pourcentage < 80) {
        progressBar.style.backgroundColor = '#669900'; // Vert clair (70-79%)
    } else if (pourcentage < 90) {
        progressBar.style.backgroundColor = '#336600'; // Vert un peu plus foncé (80-89%)
    } else {
        progressBar.style.backgroundColor = '#003300'; // Vert foncé (90-100%)
    }

    // Sélectionne un son aléatoire et le joue
    const indexAleatoire = Math.floor(Math.random() * fichiersSonores.length);
    const sonAleatoire = audioElements[indexAleatoire];
    sonAleatoire.currentTime = 0;
    sonAleatoire.play();

    // Messages personnalisés pour chaque palier de 100 clics
    if (compteurPrincipal <= 1000) {
        switch (compteurPrincipal) {
            case 100:
                alert(`Félicitations ! Vous avez atteint ${compteurPrincipal} clics ! Continuez comme ça !`);
                break;
            case 200:
                alert(`Incroyable ! ${compteurPrincipal} clics ! Vous êtes sur la bonne voie !`);
                break;
            case 300:
                alert(`Déjà ${compteurPrincipal} clics ! Vous êtes un véritable pro du clic !`);
                break;
            case 400:
                alert(` ${compteurPrincipal} clics ! Vous êtes infatigable !`);
                break;
            case 500:
                alert(`${compteurPrincipal} clics ! Il n'y a pas d'évènements !`);
                break;
            case 600:
                alert(`${compteurPrincipal} clics ! Vous n'avez pas de vie !`);
                break;
            case 700:
                alert(`${compteurPrincipal} clics ! Vous avez le rythme dans les doigts !`);
                break;
            case 800:
                alert(`${compteurPrincipal} clics ! Vous êtes presque arrivé !`);
                break;
            case 900:
                alert(`${compteurPrincipal} clics ! Encore un petit effort !`);
                break;
            case 1000:
                alert(`${compteurPrincipal} clics ! Vous avez atteint le sommet ! Bravo, vous êtes ce que l'on appelle un chômeur !`);
                break;
        }
    } else if (compteurPrincipal > 1000 && compteurPrincipal % 100 === 0) { // Après 1000 clics, tous les 100 clics
        alert(`Vous avez atteint ${compteurPrincipal} clics ! C'est incroyable votre persévérance !`);
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
        menu.classList.toggle('active'); // Utilisation de classes pour gérer l'état
        hamburger.classList.toggle('active'); // Optionnel: pour changer l'apparence du hamburger

        // Gestion de l'accessibilité (ARIA attributes)
        const expanded = menu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', expanded);
        menu.setAttribute('aria-hidden', !expanded);
    });

    // Fermeture au clic à l'extérieur (plus robuste)
    window.addEventListener('click', (event) => {
        if (menu.classList.contains('active') && !menuToggle.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.remove('active');
            hamburger.classList.remove('active'); // Si vous avez changé l'apparence du hamburger
            hamburger.setAttribute('aria-expanded', false);
            menu.setAttribute('aria-hidden', true);
        }
    });

    // Empêcher la propagation du clic depuis le menu vers le document (pour éviter la fermeture immédiate)
    menu.addEventListener('click', (event) => {
        event.stopPropagation();
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