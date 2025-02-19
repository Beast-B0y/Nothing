const words = [
    "maison", "arbre", "chien", "chat", "soleil", "lune", "etoile", "voiture", "livre",
    "table", "chaise", "porte", "fenetre", "ecole", "travail", "famille", "ami", "amour",
    "bonheur", "temps", "ordinateur", "telephone", "television", "radio", "musique",
    "cinema", "sport", "voyage", "nourriture", "vetement", "ville", "pays", "riviere",
    "montagne", "ocean", "fleur", "fruit", "legume", "oiseau", "poisson", "animal",
    "couleur", "forme", "nombre", "lettre", "mot", "phrase", "histoire", "science",
    "art", "argent", "idee", "reve", "secret", "liberte", "paix", "guerre", "vie", "mort",
    "joueur", "match", "ballon", "terrain", "victoire", "defaite", "regle", "arbitre",
    "ecran", "clavier", "souris", "imprimante", "logiciel", "internet", "reseau",
    "page", "site", "information", "image", "video", "son", "texte", "document",
    "bureau", "cuisine", "chambre", "salon", "salle", "toilettes", "jardin", "rue",
    "magasin", "hopital", "pharmacie", "temple",
    "avion", "train", "bateau", "bus", "velo", "moto", "camion", "voilier", "fusee",
    "professeur", "eleve", "classe", "examen", "devoir", "lecon", "bibliotheque",
    "medecin", "infirmier", "patient", "medicament", "operation", "maladie", "sante",
    "boulanger", "patissier", "boucher", "charcutier", "poissonnier", "fromager",
    "ecrivain", "artiste", "musicien", "acteur", "realisateur", "peintre", "sculpteur",
    "chanteur", "danseur", "comedien", "humoriste", "magicien", "prestidigitateur",
    "chemise", "pantalon", "chaussure", "robe", "jupe", "manteau", "pull", "gant",
    "chapeau", "echarpe", "lunettes", "montre", "bijou", "parfum", "cosmetique",
    "meuble", "lampe", "miroir", "tapis", "rideau", "coussin", "couverture",
    "tablette", "camera", "pomme", "banane", "orange", "fraise", "raisin", "kiwi", "mangue", "ananas", "pasteque",
    "citron", "pamplemousse", "mandarine", "clementine", "avocat", "tomate",
    "carotte", "oignon", "ail", "salade", "epinard", "brocoli", "chou",
    "mais", "riz", "pates", "pain", "fromage", "lait",
    "oeuf", "viande", "poisson", "eau", "cafe",
    "chocolat", "bonbon", "gateau", "biscuit", "glace", "yaourt", "miel",
    "confiture", "sucre", "sel", "poivre", "huile", "vinaigre", "moutarde",
    "mayonnaise", "sauce", "epice", "cereale",
    "noix", "amande", "noisette", "pistache",
    "tournesol", "citrouille", "courgette", "aubergine", "poivron", "champignon",
    "olive", "cornichon", "echalote", "poireau", "asperge",
    "artichaut", "epinard", "betterave", "radis", "navet"
];

let secretWord;
let wordDisplay = document.getElementById("word-display");
let resultDiv = document.getElementById("result");
let remainingAttempts = 8; // Nombre d'essais restants
let guessedLetters = [];
let incorrectLetters = [];
const replayButton = document.getElementById("replayButton");

function initializeGame() {
    secretWord = words[Math.floor(Math.random() * words.length)]; // Choix du mot secret
    wordDisplay.textContent = "_".repeat(secretWord.length); // Affichage du mot caché
    incorrectLetters = []; // Réinitialisation des lettres incorrectes
    guessedLetters = []; // Réinitialisation des lettres correctes
    document.getElementById("word-length").textContent = `Le mot contient ${secretWord.length} lettres.`; // Affichage de la longueur du mot
    document.getElementById("guessed-letters").textContent = "Lettres testées : "; // Réinitialisation de l'affichage des lettres testées
    resultDiv.textContent = ""; // Réinitialisation du message de résultat
    remainingAttempts = 8; // Réinitialisation du nombre d'essais
    document.querySelector('.attempts-left').textContent = `(Essais restants : ${remainingAttempts})`; // Affichage des essais restants
    document.getElementById("incorrect-letters").textContent = ""; // Réinitialisation de l'affichage des lettres incorrectes
    replayButton.style.display = "none"; // Masquer le bouton "Rejouer"
}

function guessLetter() {
    let guess = document.getElementById("guess").value.toLowerCase(); // Récupérer la lettre entrée par l'utilisateur

    if (guess.length !== 1 || !/^[a-zA-Z]$/.test(guess)) { // Vérifier si l'entrée est une lettre unique
        resultDiv.textContent = "Veuillez entrer une seule lettre valide.";
        return;
    }

    if (guessedLetters.includes(guess) || incorrectLetters.includes(guess)) { // Vérifier si la lettre a déjà été testée
        resultDiv.textContent = `Lettre '${guess.toUpperCase()}' déjà testée !`;
        document.getElementById("guess").value = "";
        return;
    }

    if (secretWord.includes(guess)) { // Si la lettre est dans le mot secret
        guessedLetters.push(guess); // Ajouter la lettre aux lettres correctes
        updateWordDisplay(); // Mettre à jour l'affichage du mot
    } else { // Si la lettre n'est pas dans le mot secret
        incorrectLetters.push(guess); // Ajouter la lettre aux lettres incorrectes
        document.getElementById("incorrect-letters").textContent = incorrectLetters.join(", "); // Afficher les lettres incorrectes
        resultDiv.textContent = "Lettre incorrecte !";
        remainingAttempts--; // Décrémenter le nombre d'essais restants
        document.querySelector('.attempts-left').textContent = `(Essais restants : ${remainingAttempts})`; // Mettre à jour l'affichage des essais restants
    }

    let allGuessedLetters = guessedLetters.concat(incorrectLetters).sort(); // Combiner et trier toutes les lettres testées
    document.getElementById("guessed-letters").textContent = "Lettres testées : " + allGuessedLetters.join(", "); // Afficher toutes les lettres testées

    // Vérifier si la partie est finie
    if (wordDisplay.textContent === secretWord) { // Si le joueur a trouvé le mot
        resultDiv.textContent = "Bravo, vous avez trouvé le mot : " + secretWord + " !";
        replayButton.style.display = "block"; // Afficher le bouton "Rejouer"
    } else if (remainingAttempts === 0) { // Si le joueur n'a plus d'essais
        resultDiv.textContent = "Vous avez perdu, le mot était : " + secretWord + " !";
        replayButton.style.display = "block"; // Afficher le bouton "Rejouer"
    }

    document.getElementById("guess").value = ""; // Réinitialiser le champ de saisie
}

function updateWordDisplay() {
    let displayedWord = "";
    for (let i = 0; i < secretWord.length; i++) {
        if (guessedLetters.includes(secretWord[i])) { // Si la lettre a été trouvée
            displayedWord += secretWord[i]; // Afficher la lettre
        } else {
            displayedWord += "_"; // Afficher un underscore
        }
    }
    wordDisplay.textContent = displayedWord; // Mettre à jour l'affichage du mot
}

function rejouer() {
    initializeGame(); // Initialiser une nouvelle partie
    replayButton.style.display = "none"; // Masquer le bouton "Rejouer"
}

replayButton.addEventListener("click", rejouer);

initializeGame();