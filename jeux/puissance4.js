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

        if (plateauEstPlein(grille)) {
            afficherResultat(0); // Match nul
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

            if (plateauEstPlein(grille)) {
                afficherResultat(0); // Match nul
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

function plateauEstPlein(grille) {
    for (let j = 0; j < colonnes; j++) {
        if (grille[0][j] === 0) {
            return false; // Il reste des cases vides
        }
    }
    return true; // Le plateau est plein
}

function trouverMeilleurCoup(grille) {
    let coupsPossibles = getCoupsPossibles(grille);
    let meilleurScore = -Infinity;
    let meilleurCoup = -1;

    for (let coup of coupsPossibles) {
        let nouvelleGrille = copierGrille(grille);
        placerJeton(nouvelleGrille, getLigneVide(nouvelleGrille, coup), coup, 1);

        let score = minimax(nouvelleGrille, 4, 2); // Profondeur augmentée à 4

        if (score > meilleurScore) {
            meilleurScore = score;
            meilleurCoup = coup;
        }
    }

    return meilleurCoup;
}

function minimax(grille, profondeur, joueur) {
    if (verifierGagnant(grille, 1) || verifierGagnant(grille, 2) || profondeur === 0 || plateauEstPlein(grille)) {
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
    let score = 0;

    // Vérifier les alignements de 4 pour gagner/perdre
    score += evaluerLigne(grille, 1); // Score du joueur
    score -= evaluerLigne(grille, 2); // Score de lIA

    return score;
}

function evaluerLigne(grille, joueur) {
    let score = 0;
    const adverse = 3 - joueur;

    // Horizontalement
    for (let i = 0; i < lignes; i++) {
        for (let j = 0; j <= colonnes - 4; j++) {
            let ligne = [grille[i][j], grille[i][j + 1], grille[i][j + 2], grille[i][j + 3]];
            score += calculerScoreLigne(ligne, joueur, adverse);
        }
    }

    // Verticalement
    for (let j = 0; j < colonnes; j++) {
        for (let i = 0; i <= lignes - 4; i++) {
            let ligne = [grille[i][j], grille[i + 1][j], grille[i + 2][j], grille[i + 3][j]];
            score += calculerScoreLigne(ligne, joueur, adverse);
        }
    }

    // Diagonale (de gauche à droite)
    for (let i = 0; i <= lignes - 4; i++) {
        for (let j = 0; j <= colonnes - 4; j++) {
            let ligne = [grille[i][j], grille[i + 1][j + 1], grille[i + 2][j + 2], grille[i + 3][j + 3]];
            score += calculerScoreLigne(ligne, joueur, adverse);
        }
    }

     // Diagonale (de droite à gauche)
     for (let i = 0; i <= lignes - 4; i++) {
        for (let j = colonnes - 1; j >= 3; j--) {
            let ligne = [grille[i][j], grille[i + 1][j - 1], grille[i + 2][j - 2], grille[i + 3][j - 3]];
            score += calculerScoreLigne(ligne, joueur, adverse);
        }
    }

    return score;
}

function calculerScoreLigne(ligne, joueur, adverse) {
    let score = 0;
    let nbJoueur = 0;
    let nbAdverse = 0;
    let nbVide = 0;

    for (let caseValue of ligne) {
        if (caseValue === joueur) {
            nbJoueur++;
        } else if (caseValue === adverse) {
            nbAdverse++;
        } else {
            nbVide++;
        }
    }

    if (nbJoueur === 4) {
        return 1000000; // Victoire instantanée
    } else if (nbAdverse === 4) {
        return -1000000; // Défaite instantanée
    } else if (nbJoueur === 3 && nbVide === 1) {
        return 10000; // Presque gagnant
    } else if (nbAdverse === 3 && nbVide === 1) {
        return -10000; // Presque perdant
    } else if (nbJoueur === 2 && nbVide === 2) {
        return 100; // Potentiel de gain
    } else if (nbAdverse === 2 && nbVide === 2) {
        return -100; // Potentiel de perte
    }

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
    if (joueur === 0) {
        alert("Match nul !");
    } else {
        alert(`Le joueur ${joueur} a gagné !`);
    }
}

function desactiverCases() {
    plateau.removeEventListener('click', jouer);
}

function activerCases() {
    plateau.addEventListener('click', jouer);
}

const boutonRejouer = document.getElementById('rejouer');

boutonRejouer.addEventListener('click', () => {
  // Réinitialiser la grille
  grille = [];
  plateau.innerHTML = ''; // Effacer le contenu du plateau

  // Recréer le plateau de jeu
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

  joueurActuel = 1; // Réinitialiser le joueur actuel
  activerCases(); // Activer les cases pour le nouveau jeu
});