// Sélectionne l'élément boutonSon et le compteurAffichage dans le DOM
const boutonSon = document.getElementById('clickSound');
const compteurAffichage = document.getElementById('clickCount');

// Initialise le compteur une seule fois, au niveau global
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

/**
 * Affiche un message au centre de l'écran avec une animation.
 * @param {string} message Le texte à afficher.
 */
function afficherMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message-pop-up');
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.classList.add('hide');
        messageElement.addEventListener('transitionend', () => {
            messageElement.remove();
        });
    }, 3000);
}

/**
 * Gère les messages aux différents paliers de clics.
 * @param {number} compteur Le nombre de clics actuel.
 */
function gererPaliers(compteur) {
    let message = '';
    if (compteur === 100) {
        message = `Félicitations ! Vous avez atteint ${compteur} clics ! Continuez comme ça !`;
    } else if (compteur === 200) {
        message = `Incroyable ! ${compteur} clics ! Vous êtes sur la bonne voie !`;
    } else if (compteur === 300) {
        message = `Déjà ${compteur} clics ! Vous êtes un véritable pro du clic !`;
    } else if (compteur === 400) {
        message = `${compteur} clics ! Vous êtes infatigable !`;
    } else if (compteur === 500) {
        message = `${compteur} clics ! Il n'y a pas d'évènements !`;
    } else if (compteur === 600) {
        message = `${compteur} clics ! Vous n'avez pas de vie !`;
    } else if (compteur === 700) {
        message = `${compteur} clics ! Vous avez le rythme dans les doigts !`;
    } else if (compteur === 800) {
        message = `${compteur} clics ! Vous êtes presque arrivé !`;
    } else if (compteur === 900) {
        message = `${compteur} clics ! Encore un petit effort !`;
    } else if (compteur === 1000) {
        message = `${compteur} clics ! Vous avez atteint le sommet ! Bravo, vous êtes ce que l'on appelle un chômeur !`;
    } else if (compteur > 1000 && compteur % 100 === 0) {
        message = `Vous avez atteint ${compteur} clics ! C'est incroyable votre persévérance !`;
    }

    if (message) {
        afficherMessage(message);
    }
}

// Gestionnaire d'événements pour le clic sur le boutonSon
boutonSon.addEventListener('click', () => {
    // Incrémente le compteur de clics
    compteurPrincipal++;
    // Met à jour l'affichage du compteur
    compteurAffichage.textContent = compteurPrincipal;

    // Calcule le pourcentage de progression sur 100 clics
    const pourcentage = Math.round((compteurPrincipal % 100) / 99 * 100);

    // Met à jour la largeur et la couleur de la barre de progression
    progressBar.style.width = `${pourcentage}%`;

    if (pourcentage < 10) {
        progressBar.style.backgroundColor = '#FF0000';
    } else if (pourcentage < 20) {
        progressBar.style.backgroundColor = '#FF3300';
    } else if (pourcentage < 30) {
        progressBar.style.backgroundColor = '#FF6600';
    } else if (pourcentage < 40) {
        progressBar.style.backgroundColor = '#FF9900';
    } else if (pourcentage < 50) {
        progressBar.style.backgroundColor = '#FFCC00';
    } else if (pourcentage < 60) {
        progressBar.style.backgroundColor = '#FFFF00';
    } else if (pourcentage < 70) {
        progressBar.style.backgroundColor = '#99CC00';
    } else if (pourcentage < 80) {
        progressBar.style.backgroundColor = '#669900';
    } else if (pourcentage < 90) {
        progressBar.style.backgroundColor = '#336600';
    } else {
        progressBar.style.backgroundColor = '#003300';
    }

    // Sélectionne un son aléatoire et le joue
    const indexAleatoire = Math.floor(Math.random() * fichiersSonores.length);
    const sonAleatoire = audioElements[indexAleatoire];
    sonAleatoire.currentTime = 0;
    sonAleatoire.play();

    // Appelle la fonction pour gérer les messages de paliers
    gererPaliers(compteurPrincipal);
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

document.addEventListener('DOMContentLoaded', () => {
    // Le code de votre menu de navigation est ici...

    // ... et le code de gestion du thème ci-dessous.

    // 1. Définir les éléments du DOM
    const toggleButton = document.getElementById('modeButton');
    const body = document.body;
    const localStorageKey = 'websiteTheme';

    // 2. Fonction pour basculer et sauvegarder le thème
    const toggleTheme = () => {
        // Bascule la classe 'light-mode' sur la balise body
        body.classList.toggle('light-mode');

        // Détermine le thème actuel
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';

        // Sauvegarde le thème dans le localStorage
        localStorage.setItem(localStorageKey, currentTheme);

        // Optionnel : met à jour le texte du bouton
        if (toggleButton) {
            toggleButton.textContent = currentTheme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair';
        }
    };

    // 3. Écoute l'événement de clic sur le bouton
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }

    // 4. Au chargement de la page, vérifie le localStorage pour appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem(localStorageKey);
    if (savedTheme) {
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
        // Met également à jour le texte du bouton au chargement
        if (toggleButton) {
            toggleButton.textContent = savedTheme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair';
        }
    }
});