/* --- Constantes et état du jeu --- */
const plateau = document.getElementById('plateau');
const boutonRejouer = document.getElementById('rejouer');
const messageResultat = document.getElementById('message-resultat');
const boutonsDifficulte = document.querySelectorAll('.btn-difficulte');

const lignes = 6;
const colonnes = 7;
const joueurHumain = 1;
const joueurIA = 2;

let joueurActuel = joueurHumain;
let grille = [];
let jetonsGagnants = [];
let profondeurIA = 3; // Profondeur par défaut (Moyen)

/* --- Fonctions de base du jeu --- */

/**
 * Initialise le plateau de jeu en créant la grille et les éléments DOM.
 */
function initialiserJeu() {
    grille = [];
    plateau.innerHTML = '';
    jetonsGagnants = [];
    messageResultat.textContent = ''; 
    messageResultat.classList.remove('visible', 'victoire', 'defaite', 'nul');
    for (let i = 0; i < lignes; i++) {
        grille[i] = new Array(colonnes).fill(0);
    }
    for (let i = 0; i < lignes * colonnes; i++) {
        const caseDiv = document.createElement('div');
        caseDiv.classList.add('case');
        caseDiv.dataset.colonne = i % colonnes;
        caseDiv.dataset.ligne = Math.floor(i / colonnes);
        caseDiv.addEventListener('click', gererCoupHumain);
        plateau.appendChild(caseDiv);
    }
    joueurActuel = joueurHumain;
    activerCases();
}

/**
 * Gère le tour du joueur humain.
 * @param {Event} event - L'événement de clic.
 */
function gererCoupHumain(event) {
    const colonne = parseInt(event.target.dataset.colonne);
    if (!estColonneValide(colonne)) return;

    jouerTour(colonne, joueurHumain);
}

/**
 * Exécute un tour de jeu complet pour un joueur donné.
 * @param {number} colonne - La colonne où jouer.
 * @param {number} joueur - Le joueur (1 ou 2).
 */
function jouerTour(colonne, joueur) {
    const ligneVide = trouverLigneVide(colonne);
    if (ligneVide === -1) return;

    placerJeton(grille, ligneVide, colonne, joueur);
    mettreAJourDOM(ligneVide, colonne, joueur);

    if (verifierVictoire(grille, joueur)) {
        afficherResultat(joueur);
        desactiverCases();
    } else if (estPlateauPlein(grille)) {
        afficherResultat(0);
        desactiverCases();
    } else {
        joueurActuel = 3 - joueur;
        if (joueurActuel === joueurIA) {
            gererCoupIA();
        }
    }
}

/**
 * Gère le tour de l'IA.
 */
function gererCoupIA() {
    desactiverCases();
    setTimeout(() => {
        const meilleurCoup = trouverMeilleurCoupIA(grille);
        jouerTour(meilleurCoup, joueurIA);
        activerCases();
    }, 700);
}

/**
 * Trouve la meilleure colonne pour l'IA en utilisant l'algorithme minimax avec élagage alpha-bêta.
 * @param {number[][]} grille - La grille de jeu actuelle.
 * @returns {number} - La meilleure colonne.
 */
function trouverMeilleurCoupIA(grille) {
    const coupsValides = getCoupsValides(grille);
    let meilleurScore = -Infinity;
    let meilleurCoup = coupsValides[0];
    let alpha = -Infinity;
    let beta = Infinity;

    for (let coup of coupsValides) {
        let grilleTemp = copierGrille(grille);
        placerJeton(grilleTemp, trouverLigneVide(coup, grilleTemp), coup, joueurIA);
        const score = minimax(grilleTemp, profondeurIA, alpha, beta, false);
        
        if (score > meilleurScore) {
            meilleurScore = score;
            meilleurCoup = coup;
        }
        alpha = Math.max(alpha, meilleurScore);
        if (alpha >= beta) break;
    }
    return meilleurCoup;
}

/* --- Fonctions utilitaires du jeu --- */
function estColonneValide(colonne) {
    return grille[0][colonne] === 0;
}

function trouverLigneVide(colonne, grilleRef = grille) {
    for (let i = lignes - 1; i >= 0; i--) {
        if (grilleRef[i][colonne] === 0) {
            return i;
        }
    }
    return -1;
}

function estPlateauPlein(grille) {
    return grille[0].every(caseVal => caseVal !== 0);
}

function mettreAJourDOM(ligne, colonne, joueur) {
    const caseDiv = document.querySelector(`.case[data-ligne="${ligne}"][data-colonne="${colonne}"]`);
    caseDiv.classList.add(`joueur${joueur}`);
}

function afficherResultat(joueur) {
    let message = '';
    let classe = '';
    if (joueur === joueurHumain) {
        message = "Bravo ! Vous avez gagné ! 🎉";
        classe = 'victoire';
    } else if (joueur === joueurIA) {
        message = "L'IA a gagné. Mieux la prochaine fois ! 😢";
        classe = 'defaite';
    } else {
        message = "Match nul ! 🤝";
        classe = 'nul';
    }

    messageResultat.textContent = message;
    messageResultat.classList.add('visible', classe);

    if (joueur !== 0 && jetonsGagnants.length > 0) {
        jetonsGagnants.forEach(({ ligne, colonne }) => {
            const caseDiv = document.querySelector(`.case[data-ligne="${ligne}"][data-colonne="${colonne}"]`);
            if (caseDiv) {
                caseDiv.classList.add('jeton-gagnant');
            }
        });
    }
}

function desactiverCases() {
    const cases = document.querySelectorAll('.case');
    cases.forEach(caseDiv => caseDiv.removeEventListener('click', gererCoupHumain));
}

function activerCases() {
    const cases = document.querySelectorAll('.case');
    cases.forEach(caseDiv => caseDiv.addEventListener('click', gererCoupHumain));
}

/* --- Logique de l'IA (Minimax) --- */
function minimax(grille, profondeur, alpha, beta, estMaximisant) {
    if (verifierVictoire(grille, joueurIA, false)) return 1000000;
    if (verifierVictoire(grille, joueurHumain, false)) return -1000000;
    if (estPlateauPlein(grille) || profondeur === 0) return evaluerScore(grille, joueurIA);

    const coupsValides = getCoupsValides(grille);

    if (estMaximisant) {
        let meilleurScore = -Infinity;
        for (let coup of coupsValides) {
            let grilleTemp = copierGrille(grille);
            placerJeton(grilleTemp, trouverLigneVide(coup, grilleTemp), coup, joueurIA);
            meilleurScore = Math.max(meilleurScore, minimax(grilleTemp, profondeur - 1, alpha, beta, false));
            alpha = Math.max(alpha, meilleurScore);
            if (alpha >= beta) break;
        }
        return meilleurScore;
    } else {
        let meilleurScore = Infinity;
        for (let coup of coupsValides) {
            let grilleTemp = copierGrille(grille);
            placerJeton(grilleTemp, trouverLigneVide(coup, grilleTemp), coup, joueurHumain);
            meilleurScore = Math.min(meilleurScore, minimax(grilleTemp, profondeur - 1, alpha, beta, true));
            beta = Math.min(beta, meilleurScore);
            if (alpha >= beta) break;
        }
        return meilleurScore;
    }
}

function evaluerScore(grille, joueur) {
    let score = 0;
    const joueurAdverse = 3 - joueur;

    score += calculerScoreAlignements(grille, joueur);
    score -= calculerScoreAlignements(grille, joueurAdverse);

    return score;
}

function calculerScoreAlignements(grille, joueur) {
    let score = 0;
    const adverse = 3 - joueur;

    // Horizontal
    for (let i = 0; i < lignes; i++) {
        for (let j = 0; j <= colonnes - 4; j++) {
            const segment = [grille[i][j], grille[i][j + 1], grille[i][j + 2], grille[i][j + 3]];
            score += evaluerSegment(segment, joueur, adverse);
        }
    }

    // Vertical
    for (let j = 0; j < colonnes; j++) {
        for (let i = 0; i <= lignes - 4; i++) {
            const segment = [grille[i][j], grille[i + 1][j], grille[i + 2][j], grille[i + 3][j]];
            score += evaluerSegment(segment, joueur, adverse);
        }
    }

    // Diagonale (gauche à droite)
    for (let i = 0; i <= lignes - 4; i++) {
        for (let j = 0; j <= colonnes - 4; j++) {
            const segment = [grille[i][j], grille[i + 1][j + 1], grille[i + 2][j + 2], grille[i + 3][j + 3]];
            score += evaluerSegment(segment, joueur, adverse);
        }
    }

    // Diagonale (droite à gauche)
    for (let i = 0; i <= lignes - 4; i++) {
        for (let j = 3; j < colonnes; j++) {
            const segment = [grille[i][j], grille[i + 1][j - 1], grille[i + 2][j - 2], grille[i + 3][j - 3]];
            score += evaluerSegment(segment, joueur, adverse);
        }
    }

    return score;
}

function evaluerSegment(segment, joueur, adverse) {
    const nbJoueur = segment.filter(c => c === joueur).length;
    const nbAdverse = segment.filter(c => c === adverse).length;
    const nbVide = segment.filter(c => c === 0).length;

    if (nbJoueur === 4) return 1000000;
    if (nbAdverse === 4) return -1000000;
    if (nbJoueur === 3 && nbVide === 1) return 10000;
    if (nbAdverse === 3 && nbVide === 1) return -10000;
    if (nbJoueur === 2 && nbVide === 2) return 100;
    if (nbAdverse === 2 && nbVide === 2) return -100;

    return 0;
}

function getCoupsValides(grille) {
    const coups = [];
    for (let j = 0; j < colonnes; j++) {
        if (grille[0][j] === 0) {
            coups.push(j);
        }
    }
    return coups;
}

function verifierVictoire(grille, joueur, storeWinningTokens = true) {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1]
    ];

    if (storeWinningTokens) {
        jetonsGagnants = [];
    }

    for (let i = 0; i < lignes; i++) {
        for (let j = 0; j < colonnes; j++) {
            if (grille[i][j] === joueur) {
                for (let [di, dj] of directions) {
                    if (i + 3 * di >= 0 && i + 3 * di < lignes && j + 3 * dj >= 0 && j + 3 * dj < colonnes) {
                        if (grille[i + di][j + dj] === joueur &&
                            grille[i + 2 * di][j + 2 * dj] === joueur &&
                            grille[i + 3 * di][j + 3 * dj] === joueur) {
                            
                            if (storeWinningTokens) {
                                jetonsGagnants.push({ ligne: i, colonne: j });
                                jetonsGagnants.push({ ligne: i + di, colonne: j + dj });
                                jetonsGagnants.push({ ligne: i + 2 * di, colonne: j + 2 * dj });
                                jetonsGagnants.push({ ligne: i + 3 * di, colonne: j + 3 * dj });
                            }
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

function copierGrille(grille) {
    return grille.map(ligne => [...ligne]);
}

function placerJeton(grille, ligne, colonne, joueur) {
    grille[ligne][colonne] = joueur;
}

/* --- Événements et initialisation --- */
boutonRejouer.addEventListener('click', initialiserJeu);

boutonsDifficulte.forEach(bouton => {
    bouton.addEventListener('click', (event) => {
        // Supprime la classe 'active' de tous les boutons
        boutonsDifficulte.forEach(b => b.classList.remove('active'));
        // Ajoute la classe 'active' au bouton cliqué
        event.target.classList.add('active');
        // Met à jour la profondeur de l'IA et réinitialise le jeu
        profondeurIA = parseInt(event.target.dataset.profondeur);
        initialiserJeu();
    });
});

// Démarrer le jeu
initialiserJeu();