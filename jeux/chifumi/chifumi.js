// --- Variables d'état du jeu ---
let scoreJoueur = 0;
let scoreOrdinateur = 0;

// --- Récupération des éléments du DOM ---
const scoreJoueurSpan = document.getElementById('joueur-score');
const scoreOrdinateurSpan = document.getElementById('ordinateur-score');
const resultatDiv = document.getElementById('resultat');
const resetBtn = document.getElementById('reset-btn');

// --- Fonctions du jeu ---

/**
 * Fonction principale pour lancer un tour de jeu.
 * @param {string} choixJoueur - Le choix du joueur ('pierre', 'feuille', 'ciseaux').
 */
function jouer(choixJoueur) {
    const choixOrdinateur = genererChoixOrdinateur();
    const resultat = determinerGagnant(choixJoueur, choixOrdinateur);

    mettreAJourScore(resultat);
    afficherResultat(choixJoueur, choixOrdinateur, resultat);
    resetBtn.style.display = 'block'; // Affiche le bouton de réinitialisation après le premier coup
}

/**
 * Génère le choix aléatoire de l'ordinateur.
 * @returns {string} Le choix de l'ordinateur.
 */
function genererChoixOrdinateur() {
    const options = ['pierre', 'feuille', 'ciseaux'];
    const indexAleatoire = Math.floor(Math.random() * options.length);
    return options[indexAleatoire];
}

/**
 * Détermine le gagnant du tour.
 * @param {string} choixJoueur - Le choix du joueur.
 * @param {string} choixOrdinateur - Le choix de l'ordinateur.
 * @returns {string} Le résultat du tour ('win', 'lose', 'draw').
 */
function determinerGagnant(choixJoueur, choixOrdinateur) {
    if (choixJoueur === choixOrdinateur) {
        return "draw";
    } else if (
        (choixJoueur === 'pierre' && choixOrdinateur === 'ciseaux') ||
        (choixJoueur === 'feuille' && choixOrdinateur === 'pierre') ||
        (choixJoueur === 'ciseaux' && choixOrdinateur === 'feuille')
    ) {
        return "win";
    } else {
        return "lose";
    }
}

/**
 * Met à jour le score en fonction du résultat.
 * @param {string} resultat - Le résultat du tour ('win', 'lose', 'draw').
 */
function mettreAJourScore(resultat) {
    if (resultat === 'win') {
        scoreJoueur++;
    } else if (resultat === 'lose') {
        scoreOrdinateur++;
    }
    scoreJoueurSpan.textContent = scoreJoueur;
    scoreOrdinateurSpan.textContent = scoreOrdinateur;
}

/**
 * Affiche le résultat du tour à l'utilisateur.
 * @param {string} choixJoueur - Le choix du joueur.
 * @param {string} choixOrdinateur - Le choix de l'ordinateur.
 * @param {string} resultat - Le résultat du tour ('win', 'lose', 'draw').
 */
function afficherResultat(choixJoueur, choixOrdinateur, resultat) {
    let message = '';
    let classe = '';
    const choixEmoji = {
        'pierre': '✊',
        'feuille': '✋',
        'ciseaux': '✌️'
    };

    if (resultat === 'win') {
        message = `Vous gagnez ! 🎉 ${choixJoueur.charAt(0).toUpperCase() + choixJoueur.slice(1)} ${choixEmoji[choixJoueur]} bat ${choixOrdinateur} ${choixEmoji[choixOrdinateur]}.`;
        classe = 'status-win';
    } else if (resultat === 'lose') {
        message = `Vous perdez... 😔 L'ordinateur gagne avec ${choixOrdinateur} ${choixEmoji[choixOrdinateur]} contre votre ${choixJoueur} ${choixEmoji[choixJoueur]}.`;
        classe = 'status-lose';
    } else {
        message = `Égalité ! 🤝 Les deux ont choisi ${choixJoueur} ${choixEmoji[choixJoueur]}.`;
        classe = 'status-draw';
    }

    resultatDiv.innerHTML = `<p>${message}</p>`;
    resultatDiv.className = `status-message ${classe}`;
}

/**
 * Réinitialise le jeu à son état initial.
 */
function reinitialiserJeu() {
    scoreJoueur = 0;
    scoreOrdinateur = 0;
    scoreJoueurSpan.textContent = scoreJoueur;
    scoreOrdinateurSpan.textContent = scoreOrdinateur;
    resultatDiv.innerHTML = `Faites votre choix pour commencer !`;
    resultatDiv.className = ''; // Supprime les classes de statut
    resetBtn.style.display = 'none'; // Cache le bouton
}

// --- Événement du bouton de réinitialisation ---
resetBtn.addEventListener('click', reinitialiserJeu);





const menuToggle = document.querySelector('.menu-toggle');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

// Event handler for the dropdown menu
if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');

        const expanded = menu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', expanded);
        menu.setAttribute('aria-hidden', !expanded);
    });

    // Close the menu when clicking outside
    window.addEventListener('click', (event) => {
        if (menu.classList.contains('active') && !menuToggle.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
            menu.setAttribute('aria-hidden', true);
        }
    });

    // Prevent click propagation from the menu
    menu.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}