const plateau = document.getElementById('plateau');
const lignes = 6;
const colonnes = 7;
let joueurActuel = 1;
let grille = [];

// Création du plateau de jeu
for (let i = 0; i < lignes; i++) {
    grille[i] = [];
    for (let j = 0; j < colonnes; j++) {
        grille[i][j] = 0;
        const caseDiv = document.createElement('div');
        caseDiv.classList.add('case');
        caseDiv.dataset.ligne = i;
        caseDiv.dataset.colonne = j;
        caseDiv.addEventListener('click', jouer);
        plateau.appendChild(caseDiv);
    }
}

function jouer(event) {
    const colonne = parseInt(event.target.dataset.colonne);
    let ligneVide = getLigneVide(grille, colonne);

    if (ligneVide !== -1) {
        placerJeton(grille, ligneVide, colonne, joueurActuel);
        mettreAJourCase(ligneVide, colonne, joueurActuel);

        if (verifierGagnant(grille, joueurActuel)) {
            afficherResultat(joueurActuel);
            desactiverCases();
            return;
        }

        joueurActuel = 3 - joueurActuel;

        // IA joue
        desactiverCases();
        setTimeout(() => {
            let meilleurCoup = trouverMeilleurCoup(grille);
            let ligneVideIA = getLigneVide(grille, meilleurCoup);
            placerJeton(grille, ligneVideIA, meilleurCoup, 2);
            mettreAJourCase(ligneVideIA, meilleurCoup, 2);

            if (verifierGagnant(grille, 2)) {
                afficherResultat(2);
                return;
            }

            joueurActuel = 3 - joueurActuel;
            activerCases();
        }, 500);
    }
}

function getLigneVide(grille, colonne) {
    for (let i = lignes - 1; i >= 0; i--) {
        if (grille[i][colonne] === 0) {
            return i;
        }
    }
    return -1;
}

function verifierGagnant(grille, joueur) {
    // Vérifier horizontalement
    for (let i = 0; i < lignes; i++) {
        for (let j = 0; j <= colonnes - 4; j++) {
            if (grille[i][j] === joueur && grille[i][j + 1] === joueur && grille[i][j + 2] === joueur && grille[i][j + 3] === joueur) {
                return true;
            }
        }
    }

    // Vérifier verticalement
    for (let j = 0; j < colonnes; j++) {
        for (let i = 0; i <= lignes - 4; i++) {
            if (grille[i][j] === joueur && grille[i + 1][j] === joueur && grille[i + 2][j] === joueur && grille[i + 3][j] === joueur) {
                return true;
            }
        }
    }

    // Vérifier diagonale (de gauche à droite)
    for (let i = 0; i <= lignes - 4; i++) {
        for (let j = 0; j <= colonnes - 4; j++) {
            if (grille[i][j] === joueur && grille[i + 1][j + 1] === joueur && grille[i + 2][j + 2] === joueur && grille[i + 3][j + 3] === joueur) {
                return true;
            }
        }
    }

    // Vérifier diagonale (de droite à gauche)
    for (let i = 0; i <= lignes - 4; i++) {
        for (let j = colonnes - 1; j >= 3; j--) {
            if (grille[i][j] === joueur && grille[i + 1][j - 1] === joueur && grille[i + 2][j - 2] === joueur && grille[i + 3][j - 3] === joueur) {
                return true;
            }
        }
    }

    return false;
}

function trouverMeilleurCoup(grille) {
    let coupsPossibles = getCoupsPossibles(grille);
    let meilleurScore = -Infinity;
    let meilleurCoup = -1;

    for (let coup of coupsPossibles) {
        let nouvelleGrille = copierGrille(grille);
        placerJeton(nouvelleGrille, getLigneVide(nouvelleGrille, coup), coup, 1);

        let score = minimax(nouvelleGrille, 3, 2);

        if (score > meilleurScore) {
            meilleurScore = score;
            meilleurCoup = coup;
        }
    }

    return meilleurCoup;
}

function minimax(grille, profondeur, joueur) {
    if (verifierGagnant(grille, 1) || verifierGagnant(grille, 2) || profondeur === 0) {
        return evaluerScore(grille);
    }

    let coupsPossibles = getCoupsPossibles(grille);
    let meilleurScore = joueur === 1 ? -Infinity : Infinity;

    for (let coup of coupsPossibles) {
        let nouvelleGrille = copierGrille(grille);
        placerJeton(nouvelleGrille, getLigneVide(nouvelleGrille, coup), coup, joueur);

        let score = minimax(nouvelleGrille, profondeur - 1, 3 - joueur);
        if (joueur === 1) {
            meilleurScore = Math.max(meilleurScore, score);
        } else {
            meilleurScore = Math.min(meilleurScore, score);
        }
    }

    return meilleurScore;
}

function evaluerScore(grille) {
    // Implémentez votre logique d'évaluation ici (exemple)
    let score = 0;

    // ... (vérifier les alignements de 2 ou 3 jetons)

    return score;
}

function getCoupsPossibles(grille) {
    let coupsPossibles = [];
    for (let j = 0; j < colonnes; j++) {
        if (grille[0][j] === 0) {
            coupsPossibles.push(j);
        }
    }
    return coupsPossibles;
}

function copierGrille(grille) {
    let nouvelleGrille = [];
    for (let i = 0; i < lignes; i++) {
        nouvelleGrille[i] = grille[i].slice();
    }
    return nouvelleGrille;
}

function placerJeton(grille, ligne, colonne, joueur) {
    grille[ligne][colonne] = joueur;
}

function mettreAJourCase(ligne, colonne, joueur) {
    const caseDiv = document.querySelector(`.case[data-ligne="${ligne}"][data-colonne="${colonne}"]`);
    caseDiv.classList.add(`joueur${joueur}`);
}

function afficherResultat(joueur) {
    alert(`Le joueur ${joueur} a gagné !`);
}

function desactiverCases() {
    plateau.removeEventListener('click', jouer);
}

function activerCases() {
    plateau.addEventListener('click', jouer);
}