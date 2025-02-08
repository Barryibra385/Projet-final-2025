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
    let errorElement = input.parentElement.querySelector('.error-message'); // Chercher le message d'erreur existant
    if (!errorElement) {
        // Créer un nouveau message d'erreur s'il n'existe pas déjà
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.marginTop = '5px';
        input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message; // Mettre à jour le message d'erreur
    input.style.borderColor = 'red';
}

// Fonction pour effacer une erreur
function clearError(input) {
    const errorElement = input.parentElement.querySelector('.error-message'); // Chercher le message d'erreur existant
    if (errorElement) {
        errorElement.remove(); // Supprimer le message d'erreur s'il existe
    }
    input.style.borderColor = ''; // Réinitialiser la bordure
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
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach((input) => {
    input.addEventListener('input', () => {
        validateInput(input); // Valider le champ à chaque saisie
    });
});

if (formHost) {
    // Gestion de la soumission du formulaire hôte
    formHost.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche l'envoi du formulaire par défaut

        const isFormValid = [...document.querySelectorAll('.contact-form input, .contact-form textarea')].every((input) =>
            validateInput(input)
        );

        if (isFormValid) {
            alert('Merci ! Votre annonce a été soumise avec succès. Nous reviendrons vers vous dans les plus brefs délais.');
            formHost.reset(); // Réinitialiser le formulaire après soumission
            document.querySelectorAll('.error-message').forEach((error) => error.remove()); // Supprimer les messages d'erreur
        }
    });
}

    
// -------- Gestion du formulaire de connexion --------

// Sélectionner le formulaire de connexion uniquement
const loginForm = document.querySelector("#login-form");

if (loginForm) {
    const emailInput = loginForm.querySelector("#login-email");
    const passwordInput = loginForm.querySelector("#login-password");

    // Fonction pour valider l'email
    function validateLoginEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Vérifie si l'email est au bon format
        return regex.test(email);
    }

    // Gérer la soumission du formulaire de connexion
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        let errors = [];

        // Validation des champs
        if (!validateLoginEmail(email)) {
            errors.push("Veuillez entrer une adresse email valide.");
        }

        if (password.length < 6) {
            errors.push("Le mot de passe doit contenir au moins 6 caractères.");
        }

        // Afficher les erreurs ou simuler une connexion réussie
        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            alert("Connexion réussie ! Bienvenue chez KAIBON !");
            loginForm.reset();
            // Redirection ou autre action après la connexion
            window.location.href = "index.html"; // Exemple de redirection
        }
    });

    // Ajout d'un effet de focus pour les champs de saisie
    const loginInputs = loginForm.querySelectorAll("input");
    loginInputs.forEach((input) => {
        input.addEventListener("focus", () => {
            input.style.borderColor = "#00aaff"; // Change la couleur de la bordure lors du focus
        });

        input.addEventListener("blur", () => {
            input.style.borderColor = "#ccc"; // Réinitialise la couleur après le focus
        });
    });

    // Fonctionnalité "Mot de passe oublié ?"
    const forgotPasswordLink = document.createElement("a");
    forgotPasswordLink.href = "#";
    forgotPasswordLink.textContent = "Mot de passe oublié ?";
    forgotPasswordLink.style.display = "block";
    forgotPasswordLink.style.textAlign = "right";
    forgotPasswordLink.style.marginTop = "10px";
    forgotPasswordLink.style.color = "#00aaff";
    forgotPasswordLink.style.textDecoration = "none";

    // Ajouter le lien après le champ de mot de passe UNIQUEMENT dans le formulaire de connexion
    passwordInput.parentElement.appendChild(forgotPasswordLink);

    // Gérer le clic sur "Mot de passe oublié ?"
    forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();

        // Demander à l'utilisateur de saisir son e-mail
        const resetEmail = prompt("Veuillez entrer votre adresse email pour réinitialiser votre mot de passe :");

        if (resetEmail && validateLoginEmail(resetEmail)) {
            alert(`Un lien de réinitialisation a été envoyé à ${resetEmail}.`);
        } else if (resetEmail) {
            alert("Veuillez entrer une adresse email valide.");
        }
    });
}

// -------- Gestion du formulaire d'inscription --------

// Supposons que le formulaire d'inscription a l'ID "registration-form"
// Pour s'assurer que la fonctionnalité "Mot de passe oublié ?" ne soit pas appliquée, nous l'isolons totalement

const registrationForm = document.querySelector("#registration-form");

if (registrationForm) {
    // Validation et gestion spécifiques au formulaire d'inscription
    const fullNameInput = registrationForm.querySelector("#fullname");
    const emailInput = registrationForm.querySelector("#email");
    const phoneInput = registrationForm.querySelector("#phone-number");
    const passwordInput = registrationForm.querySelector("#password");
    const confirmPasswordInput = registrationForm.querySelector("#confirm-password");

    // Fonction pour valider l'email
    function validateRegistrationEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Fonction pour valider le numéro de téléphone
    function validatePhone(phone) {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    }

    // Gérer la soumission du formulaire d'inscription
    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        let errors = [];

        // Vérifications des champs
        if (fullName === "") {
            errors.push("Veuillez entrer votre nom et prénom.");
        }

        if (!validateRegistrationEmail(email)) {
            errors.push("Veuillez entrer une adresse email valide.");
        }

        if (!validatePhone(phone)) {
            errors.push("Veuillez entrer un numéro de téléphone valide (10 chiffres).");
        }

        if (password.length < 6) {
            errors.push("Le mot de passe doit contenir au moins 6 caractères.");
        }

        if (password !== confirmPassword) {
            errors.push("Les mots de passe ne correspondent pas.");
        }

        // Affichage des erreurs ou confirmation de l'inscription
        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            alert("Inscription réussie ! Bienvenue chez KAIBON !");
            registrationForm.reset(); // Réinitialise le formulaire après succès
        }
    });
}

// Gestion du formulaire de réservation
const reservationForm = document.querySelector("#reservation-form");

if (reservationForm) {
    const destinationInput = document.getElementById("destination");
    const arrivalInput = document.getElementById("arrival");
    const departureInput = document.getElementById("departure");
    const guestSelectors = document.querySelectorAll(".guest-row");

    guestSelectors.forEach((row) => {
        const minusButton = row.querySelector(".minus");
        const plusButton = row.querySelector(".plus");
        const input = row.querySelector("input");

        minusButton.addEventListener("click", () => {
            const currentValue = parseInt(input.value, 10);
            if (currentValue > 0) {
                input.value = currentValue - 1;
            }
        });

        plusButton.addEventListener("click", () => {
            const currentValue = parseInt(input.value, 10);
            input.value = currentValue + 1;
        });
    });

    function validateDates(arrival, departure) {
        const arrivalDate = new Date(arrival);
        const departureDate = new Date(departure);
        return departureDate > arrivalDate;
    }

    reservationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const destination = destinationInput.value.trim();
        const arrival = arrivalInput.value;
        const departure = departureInput.value;
        const adults = parseInt(reservationForm.querySelector("input[name='adults']").value, 10);
        const children = parseInt(reservationForm.querySelector("input[name='children']").value, 10);
        const rooms = parseInt(reservationForm.querySelector("input[name='rooms']").value, 10);

        let errors = [];

        if (destination === "") {
            errors.push("Veuillez entrer une destination.");
        }

        if (!validateDates(arrival, departure)) {
            errors.push("La date de départ doit être après la date d'arrivée.");
        }

        if (adults === 0 && children === 0) {
            errors.push("Veuillez sélectionner au moins un invité.");
        }

        if (rooms === 0) {
            errors.push("Veuillez sélectionner au moins une chambre.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            alert("Votre réservation a été enregistrée avec succès !");
            reservationForm.reset();
        }
    });
}



// code js pour la meteo
const apiKey = '7b69f8df42046728f5a5214a1f96f8ae'; //la clé API OpenWeatherMap
    const city = "strasbourg"; // Ville de ton choix
 
    // URL de l'API OpenWeatherMap
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
 
    function afficherMeteo(data) {
        const location = document.getElementById("localisation");
        const temperature = document.getElementById("temperature");
        const description = document.getElementById("description");
        const humidity = document.getElementById("humidity");
 
        location.textContent = `Ville: ${data.name}`;
        temperature.textContent = `Température: ${data.main.temp}°C`;
        description.textContent = `Description: ${data.weather[0].description}`;
        humidity.textContent = `Humidité: ${data.main.humidity}%`;
    }
 
    function obtenirMeteo() {
        fetch(apiURL)
            .then(response => response.json())
            .then(data => afficherMeteo(data))
            .catch(error => {
                console.error('Erreur:', error);
                document.getElementById("meteo").innerHTML = "<p>Impossible de récupérer les données météo.</p>";
            });
    }
 
    // Appeler la fonction pour charger la météo dès que la page est chargée
    window.onload = obtenirMeteo;





    // http://127.0.0.1:5500/db.json

const container = document.querySelector(".commentaire");

fetch("db.json")
.then(function(response){
    return response.json()
})
.then(function(data){

    let html = "";

    data.forEach(function(user){
        html += `
        <div class="card-avis">
            <p>Nom : ${user.nom}</p>
            <p>Note : ${user.note}</p>
            <p>Commentaire : ${user.commentaire}</p>
            <p>Date : ${user.date}</p>
        </div> 
        `

    })
    console.log(html)

    container.innerHTML = html;
})


// http://127.0.0.1:5500/db.json

const container2 = document.querySelector(".service");

fetch("db2.json")
.then(function(response2){
    return response2.json()
})
.then(function(data2){

    let html2 = "";

    data2.forEach(function(user2){
        html2 += `
        <div class="card-avis">
            <p>Nom : ${user2.nom}</p>
            <p>Prix : ${user2.prix}</p>
            <p>Description : ${user2.description}</p>
        </div> 
        `
    })
    console.log(html2)

    container2.innerHTML = html2;
})





document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const overlay = document.getElementById("cookie-overlay");
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const declineBtn = document.getElementById("decline-cookies");
    const preferencesBtn = document.getElementById("preferences-cookies");

    const modal = document.getElementById("cookie-modal");
    const savePreferencesBtn = document.getElementById("save-preferences");
    const closeModalBtn = document.getElementById("close-modal");

    // Désactiver la navigation dès le début
    function disableNavigation() {
        body.classList.add("no-click");
        overlay.style.display = "block";
    }

    // Activer la navigation après un choix
    function enableNavigation() {
        body.classList.remove("no-click");
        overlay.style.display = "none";
    }

    // Vérifie si un cookie existe
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Fonction pour créer un cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + "; path=/" + expires;
    }

    // Vérifier si l'utilisateur a déjà fait un choix
    function checkCookieConsent() {
        if (getCookie("cookiesAccepted") || getCookie("preferencesSet")) {
            enableNavigation(); // Débloquer la navigation
            banner.style.display = "none";
        } else {
            disableNavigation(); // Bloquer la navigation
            banner.style.display = "flex";
        }
    }

    // Accepter tous les cookies
    acceptBtn.addEventListener("click", function () {
        setCookie("cookiesAccepted", "true", 365);
        enableNavigation();
        banner.style.display = "none";
    });

    // Refuser tous les cookies
    declineBtn.addEventListener("click", function () {
        setCookie("cookiesAccepted", "false", 365);
        enableNavigation();
        banner.style.display = "none";
    });

    // Ouvrir le modal des préférences
    preferencesBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Fermer le modal
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Enregistrer les préférences utilisateur
    savePreferencesBtn.addEventListener("click", function () {
        setCookie("preferencesSet", "true", 365);
        setCookie("analytics", document.getElementById("analytics-cookies").checked, 365);
        setCookie("ads", document.getElementById("ads-cookies").checked, 365);
        setCookie("functional", document.getElementById("functional-cookies").checked, 365);
        enableNavigation();
        banner.style.display = "none";
        modal.style.display = "none";
    });

    checkCookieConsent(); // Vérifier au chargement de la page
});




document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.getElementById("cookie-banner").classList.add("show");
        document.getElementById("cookie-banner").style.display = "block";
        
    }, 5000); // 5000 millisecondes = 5 secondes
});



document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        let cookieBanner = document.getElementById("cookie-banner");
        cookieBanner.classList.add("show");
        cookieBanner.style.display = "block";

        // Active les éléments après affichage du bandeau
        enableCookieInteractions();
    }, 5000); // Affichage après 5 secondes

    function enableCookieInteractions() {
        let cookiePolicyLink = document.getElementById("cookie-policy-link");
        let preferencesButton = document.getElementById("manage-preferences");
        let preferencesContent = document.getElementById("preferences-content");

        // Vérifie que les éléments existent
        if (cookiePolicyLink) {
            cookiePolicyLink.style.pointerEvents = "auto"; // Active les clics
            cookiePolicyLink.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        }

        if (preferencesButton && preferencesContent) {
            preferencesButton.style.pointerEvents = "auto"; // Active les clics
            preferencesButton.addEventListener("click", function () {
                preferencesContent.style.display = preferencesContent.style.display === "block" ? "none" : "block";
            });
        }
    }
});




document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        let cookieBanner = document.getElementById("cookie-banner");
        if (cookieBanner) {
            cookieBanner.classList.add("show");
            cookieBanner.style.display = "block";
        }
    }, 5000); // Affichage après 5 secondes

    function enableCheckboxes() {
        let checkboxes = document.querySelectorAll("#preferences-content input[type='checkbox']");
        checkboxes.forEach(checkbox => {
            checkbox.removeAttribute("disabled"); // Supprime l'attribut disabled
            checkbox.style.pointerEvents = "auto"; // Rend cliquable
            checkbox.style.opacity = "1"; // Assure qu'elles sont visibles
        });
    }

    let preferencesButton = document.getElementById("manage-preferences");
    let preferencesContent = document.getElementById("preferences-content");

    if (preferencesButton && preferencesContent) {
        preferencesButton.addEventListener("click", function () {
            let isVisible = preferencesContent.style.display === "block";
            preferencesContent.style.display = isVisible ? "none" : "block";
            
            // ✅ Active immédiatement les cases lorsqu'on ouvre les préférences
            if (!isVisible) {
                enableCheckboxes();
            }
        });
    }

    let savePreferencesButton = document.getElementById("save-preferences");

    if (savePreferencesButton) {
        savePreferencesButton.addEventListener("click", function () {
            let checkboxes = document.querySelectorAll("#preferences-content input[type='checkbox']");
            let hasChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

            if (hasChecked) {
                document.body.style.overflow = "auto"; // Autorise la navigation après choix
                document.getElementById("cookie-banner").style.display = "none"; // Masquer le bandeau
            } else {
                alert("Veuillez sélectionner au moins une option.");
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let cookieBanner = document.getElementById("cookie-banner");
    let preferencesButton = document.getElementById("manage-preferences");
    let preferencesContent = document.getElementById("preferences-content");
    let savePreferencesButton = document.getElementById("save-preferences");

    // Vérifier si un choix a déjà été fait
    if (localStorage.getItem("cookiesAccepted")) {
        return; // Si un choix a été fait, ne pas afficher le bandeau
    }

    // Afficher le bandeau après 5 secondes
    setTimeout(function () {
        if (cookieBanner) {
            cookieBanner.classList.add("show");
            cookieBanner.style.display = "block";
        }
    }, 5000);

    function enableCheckboxes() {
        let checkboxes = document.querySelectorAll("#preferences-content input[type='checkbox']");
        checkboxes.forEach(checkbox => {
            checkbox.removeAttribute("disabled"); // Active les cases
            checkbox.style.pointerEvents = "auto"; // Permet de cliquer
            checkbox.style.opacity = "1"; // Assure la visibilité
        });
    }

    if (preferencesButton && preferencesContent) {
        preferencesButton.addEventListener("click", function () {
            let isVisible = preferencesContent.style.display === "block";
            preferencesContent.style.display = isVisible ? "none" : "block";
            
            if (!isVisible) {
                enableCheckboxes(); // Active les cases lors de l'ouverture
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        let savePreferencesButton = document.getElementById("save-preferences");
    
        if (savePreferencesButton) {
            savePreferencesButton.addEventListener("click", function () {
                let checkboxes = document.querySelectorAll("#preferences-content input[type='checkbox']");
                let hasChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
                if (!hasChecked) {
                    alert("Veuillez sélectionner au moins une option.");
                    return; // Arrête l'exécution ici si aucune option n'est sélectionnée
                }
    
                // Sauvegarde le choix de l'utilisateur
                localStorage.setItem("cookiesAccepted", "true");
    
                // Enregistrer les préférences cochées
                checkboxes.forEach(checkbox => {
                    localStorage.setItem(checkbox.id, checkbox.checked);
                });
    
                document.body.style.overflow = "auto"; // Autorise la navigation
                document.getElementById("cookie-banner").style.display = "none"; // Masquer le bandeau
            });
        }
    });
    
    
});



