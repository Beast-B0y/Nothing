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
    "magasin", "hopital", "pharmacie", "eglise", "mosquee", "synagogue", "temple",
    "avion", "train", "bateau", "bus", "velo", "moto", "camion", "voilier", "fusee",
    "professeur", "eleve", "classe", "examen", "devoir", "lecon", "bibliotheque",
    "medecin", "infirmier", "patient", "medicament", "operation", "maladie", "sante",
    "boulanger", "patissier", "boucher", "charcutier", "poissonnier", "fromager",
    "ecrivain", "artiste", "musicien", "acteur", "realisateur", "peintre", "sculpteur",
    "chanteur", "danseur", "comedien", "humoriste", "magicien", "prestidigitateur",
    "chemise", "pantalon", "chaussure", "robe", "jupe", "manteau", "pull", "gant",
    "chapeau", "echarpe", "lunettes", "montre", "bijou", "parfum", "cosmetique",
    "meuble", "lampe", "miroir", "tapis", "rideau", "coussin", "couverture",
    "tablette", "camera","pomme", "banane", "orange", "fraise", "raisin", "kiwi", "mangue", "ananas", "pasteque",
    "citron", "pamplemousse", "mandarine", "clementine", "avocat", "tomate",
    "carotte",  "oignon", "ail", "salade", "epinard", "brocoli", "chou",
    "mais", "riz", "pates", "pain", "fromage", "lait",
    "oeuf", "viande", "poisson", "eau", "cafe", 
    "chocolat", "bonbon", "gateau", "biscuit", "glace", "yaourt", "miel",
    "confiture", "sucre", "sel", "poivre", "huile", "vinaigre", "moutarde",
    "mayonnaise", "sauce", "epice", "cereale",
     "noix", "amande", "noisette", "pistache",
    "tournesol", "citrouille", "courgette", "aubergine", "poivron", "champignon",
    "olive", "cornichon","echalote", "poireau", "asperge",
    "artichaut", "epinard", "betterave", "radis", "navet"
];

let secretWord;
let wordDisplay = document.getElementById("word-display");
let resultDiv = document.getElementById("result");
let attempts = 8;
let guessedLetters = [];
let incorrectLetters = [];

function initializeGame() {
    // Choix d'un nouveau mot secret (plus robuste)
    let newSecretWord;
    if (words.length > 0) { // Vérifier si la liste de mots n'est pas vide
        do {
            newSecretWord = words[Math.floor(Math.random() * words.length)];
        } while (newSecretWord === secretWord);
        secretWord = newSecretWord;
    } else {
        console.error("La liste de mots est vide !");
        return; // Arrêter l'initialisation si la liste est vide
    }


    wordDisplay.textContent = "_".repeat(secretWord.length);
    incorrectLetters = [];
    guessedLetters = [];
    document.getElementById("word-length").textContent = `Le mot contient ${secretWord.length} lettres.`;
    document.getElementById("guessed-letters").textContent = "Lettres testées : ";
    resultDiv.textContent = "";
    attempts = 8;
    document.querySelector('.attempts-left').textContent = `(Essais restants : ${attempts})`;
}

function guessLetter() {
    let guess = document.getElementById("guess").value.toLowerCase();

    if (guess === "") {
        resultDiv.textContent = "Veuillez entrer une lettre.";
        return;
    }

    if (!guessedLetters.includes(guess) && !incorrectLetters.includes(guess)) {
        if (secretWord.includes(guess)) {
            guessedLetters.push(guess);
            updateWordDisplay();
            if (wordDisplay.textContent === secretWord) {
                resultDiv.textContent = "Bravo, vous avez trouvé le mot !";
                attempts = 0; // Victoire, on bloque les essais
            }
        } else {
            incorrectLetters.push(guess);
            document.getElementById("incorrect-letters").textContent = incorrectLetters.join(", ");
            resultDiv.textContent = "Lettre incorrecte !";
            attempts--;
            document.querySelector('.attempts-left').textContent = `(Essais restants : ${attempts})`;
        }

        let allGuessedLetters = guessedLetters.concat(incorrectLetters).sort();
        document.getElementById("guessed-letters").textContent = "Lettres testées : " + allGuessedLetters.join(", ");

    } else {
        resultDiv.textContent = "Lettre déjà testée !";
    }

    if (attempts === 0 && wordDisplay.textContent !== secretWord) {
        resultDiv.textContent = "Vous avez perdu, le mot était " + secretWord + " !";
    }
    document.getElementById("guess").value = "";
}

function updateWordDisplay() {
    let displayedWord = "";
    for (let i = 0; i < secretWord.length; i++) {
        if (guessedLetters.includes(secretWord[i])) {
            displayedWord += secretWord[i];
        } else {
            displayedWord += "_";
        }
    }
    wordDisplay.textContent = displayedWord;
}

initializeGame();