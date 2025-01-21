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



// ================= FORMULAIRE DE CONTACT ==================

// Sélectionner les éléments du formulaire "Contact"
const formContact = document.querySelector(".form_contact");
if (formContact) {
    const nomContactInput = document.getElementById("nom_contact");
    const prenomContactInput = document.getElementById("prenom_contact");
    const emailContactInput = document.getElementById("email_contact");
    const telephoneContactInput = document.getElementById("telephone_contact");

    const contactInputs = [nomContactInput, prenomContactInput, emailContactInput, telephoneContactInput];

    // Fonction pour afficher une erreur
    function showError(input, message) {
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.marginTop = '5px';
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
        input.style.borderColor = 'red';
    }

    // Fonction pour effacer une erreur
    function clearError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        input.style.borderColor = ''; // Réinitialisation de la bordure
    }

    // Fonction pour valider un champ individuel (Contact)
    function validateContactInput(input) {
        const value = input.value.trim();
        let isValid = true;

        if (value === '' && input.hasAttribute('required')) {
            showError(input, `Le champ "${input.placeholder}" est obligatoire.`);
            isValid = false;
        } else {
            clearError(input);
        }

        // Validation spécifique pour l'email
        if (input === emailContactInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(input, 'Veuillez entrer une adresse email valide.');
                isValid = false;
            } else {
                clearError(input);
            }
        }

        // Validation spécifique pour le téléphone
        if (input === telephoneContactInput) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(value)) {
                showError(input, 'Veuillez entrer un numéro de téléphone valide (10 chiffres).');
                isValid = false;
            } else {
                clearError(input);
            }
        }

        return isValid;
    }

    // Validation en temps réel pour le formulaire "Contact"
    contactInputs.forEach((input) => {
        input.addEventListener('input', () => {
            validateContactInput(input);
        });
    });

    // Gestion de la soumission du formulaire "Contact"
    formContact.addEventListener('submit', (e) => {
        e.preventDefault();

        const isFormContactValid = contactInputs.every((input) => validateContactInput(input));

        if (isFormContactValid) {
            alert("Merci pour votre message, nous vous répondrons bientôt !");
            formContact.reset();

            // Supprimer les erreurs restantes après réinitialisation
            contactInputs.forEach(clearError);
        }
    });
}

// Script pour la page "Hôte"

// Sélection des éléments du formulaire hôte
const formHost = document.querySelector('.contact-form');
const nomInput = document.getElementById('nom');
const prenomInput = document.getElementById('prenom');
const emailHostInput = document.getElementById('email');
const telephoneInput = document.getElementById('telephone');
const villeInput = document.getElementById('ville');
const typeBienInput = document.getElementById('type de bienvenue');
const descriptionInput = document.querySelector('textarea');
const checkboxInputs = document.querySelectorAll('.checkbox-group input[type="checkbox"]');

// Fonction pour afficher une erreur
function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.marginTop = '5px';
        input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
    input.style.borderColor = 'red';
}

// Fonction pour effacer une erreur
function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    input.style.borderColor = ''; // Réinitialisation de la bordure
}

// Fonction pour valider un champ individuel
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;

    // Validation pour les champs obligatoires
    if (value === '' && input.hasAttribute('required')) {
        showError(input, `Le champ "${input.placeholder}" est obligatoire.`);
        isValid = false;
    } else {
        clearError(input);
    }

    // Validation pour l'email
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(input, 'Veuillez entrer une adresse email valide.');
            isValid = false;
        } else {
            clearError(input);
        }
    }

    // Validation pour le numéro de téléphone
    if (input === telephoneInput) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
            showError(input, 'Veuillez entrer un numéro de téléphone valide (10 chiffres).');
            isValid = false;
        } else {
            clearError(input);
        }
    }

    return isValid;
}

// Validation en temps réel pour les champs
[...document.querySelectorAll('.contact-form input, .contact-form textarea')].forEach((input) => {
    input.addEventListener('input', () => {
        validateInput(input);
    });
});

// Gestion de la soumission du formulaire hôte
formHost.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche l'envoi du formulaire par défaut

    const isFormValid = [...document.querySelectorAll('.contact-form input, .contact-form textarea')].every((input) =>
        validateInput(input)
    );

    if (isFormValid) {
        alert('Merci ! Votre annonce a été soumise avec succès. Nous reviendrons vers vous dans les plus brefs délais.');
        formHost.reset(); // Réinitialiser le formulaire après soumission
        document.querySelectorAll('.error-message').forEach((error) => error.remove());
    }
});

