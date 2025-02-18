function jouer(choixJoueur) {
    const choixOrdinateur = genererChoixOrdinateur();
    const resultat = determinerGagnant(choixJoueur, choixOrdinateur);
  
    afficherResultat(choixJoueur, choixOrdinateur, resultat);
  }
  
  function genererChoixOrdinateur() {
    const options = ['pierre', 'feuille', 'ciseaux'];
    const indexAleatoire = Math.floor(Math.random() * 3);
    return options[indexAleatoire];
  }
  
  function determinerGagnant(choixJoueur, choixOrdinateur) {
    if (choixJoueur === choixOrdinateur) {
      return "Égalité !";
    } else if (
      (choixJoueur === 'pierre' && choixOrdinateur === 'ciseaux') ||
      (choixJoueur === 'feuille' && choixOrdinateur === 'pierre') ||
      (choixJoueur === 'ciseaux' && choixOrdinateur === 'feuille')
    ) {
      return "Vous gagnez !";
    } else {
      return "L'ordinateur gagne !";
    }
  }
  
  function afficherResultat(choixJoueur, choixOrdinateur, resultat) {
    const resultatDiv = document.getElementById('resultat');
    resultatDiv.innerHTML = `Vous avez choisi ${choixJoueur}. L'ordinateur a choisi ${choixOrdinateur}. ${resultat}`;
  }