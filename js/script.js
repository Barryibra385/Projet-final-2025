// le code js qui gère le menu burger
// Sélection des éléments du DOM
const burgerMenu = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');

// Gestion de l'ouverture/fermeture du menu burger
burgerMenu.addEventListener('click', () => {
    menu.classList.toggle('active'); // Affiche ou masque le menu
    burgerMenu.classList.toggle('active'); // Change l'apparence du bouton burger
});

// Gestion de l'ouverture/fermeture des sous-menus (dropdown)
dropdownToggles.forEach((toggle, index) => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le lien de rediriger
        const dropdownMenu = dropdownMenus[index];
        dropdownMenu.classList.toggle('open'); // Affiche ou masque le sous-menu
    });
});

// Fermer le menu si l'utilisateur clique ailleurs
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burgerMenu.contains(e.target)) {
        menu.classList.remove('active');
        burgerMenu.classList.remove('active');
        dropdownMenus.forEach((dropdown) => dropdown.classList.remove('open'));
    }
});



// Module commun pour les validations
const ValidationUtils = {
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    validatePhone(phone) {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    }
};


