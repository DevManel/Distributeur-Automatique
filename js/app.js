// Menu des boissons
const menu = [
    { nom: "Café", prix: 1.5 },
    { nom: "Thé", prix: 1.2 },
    { nom: "Coca", prix: 2.5 },
    { nom: "Fanta", prix: 2.2 },
    { nom: "Sprite", prix: 2.5 },
    { nom: "Chocolat chaud", prix: 2.0 }
];

// Références aux éléments HTML
const menuDiv = document.getElementById("menu");
const choiceInput = document.getElementById("choice");
const selectButton = document.getElementById("selectButton");
const paymentSection = document.getElementById("paymentSection");
const selectedDrinkText = document.getElementById("selectedDrink");
const moneyInput = document.getElementById("moneyInput");
const insertMoneyButton = document.getElementById("insertMoneyButton");
const resultMessage = document.getElementById("resultMessage");

// Générer dynamiquement le menu
menu.forEach((boisson, index) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");
    menuItem.innerHTML = `
        <span>${index + 1}. ${boisson.nom}</span>
        <span>${boisson.prix.toFixed(2)}€</span>
    `;
    menuDiv.appendChild(menuItem);
});

// Variables pour suivre l'état
let selectedDrink = null;
let montantInsere = 0;

// Gestion du bouton de sélection
selectButton.addEventListener("click", () => {
    const choice = parseInt(choiceInput.value);
    if (isNaN(choice) || choice < 1 || choice > menu.length) {
        resultMessage.innerText = "Veuillez choisir une boisson valide (1-6).";
        return;
    }

    selectedDrink = menu[choice - 1];
    selectedDrinkText.innerText = `Vous avez choisi : ${selectedDrink.nom} (${selectedDrink.prix.toFixed(2)}€).`;
    paymentSection.style.display = "block";
    resultMessage.innerText = "";
    montantInsere = 0; // Réinitialiser le montant inséré
});

// Gestion de l'insertion d'argent
insertMoneyButton.addEventListener("click", () => {
    const montant = parseFloat(moneyInput.value);
    if (isNaN(montant) || montant <= 0) {
        resultMessage.innerText = "Veuillez insérer un montant valide.";
        return;
    }

    montantInsere += montant;
    moneyInput.value = ""; // Effacer le champ
    resultMessage.innerText = `Montant total inséré : ${montantInsere.toFixed(2)}€`;

    if (montantInsere >= selectedDrink.prix) {
        const monnaie = montantInsere - selectedDrink.prix;
        resultMessage.innerText = `Merci pour votre achat ! Voici votre ${selectedDrink.nom}.`;
        if (monnaie > 0) {
            resultMessage.innerText += ` Monnaie rendue : ${monnaie.toFixed(2)}€.`;
        }
        paymentSection.style.display = "none";
    }
});
