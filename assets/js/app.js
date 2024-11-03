
class CustomNotification {
    constructor(message, level = 'success', duration = 3000) {
        this.message = message;
        this.level = level;
        this.duration = duration;
        this.notif = null; // Pour stocker l'élément notification
        this.notify();
    }

    create() {
        const div = document.createElement('div');
        div.innerText = this.message;
        div.classList.add('notification');
        div.classList.add(this.level);

        this.notif = div;
    }

    notify() {
        this.create();

        const notificationContainer = document.querySelector('.notifications');
        
        if (!notificationContainer) {
            console.error('Le conteneur .notifications est introuvable');
            return;
        }

        notificationContainer.append(this.notif);

        setTimeout(() => {
            this.notif.remove();
        }, this.duration);
    }
}

// Utilisation de la classe CustomNotification
// setTimeout(() => {
//     new CustomNotification('Bienvenue sur Laly\'s Game !', 'success', 5000);
// }, 200);
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const characterSelection = document.querySelector(".character-selection");

    // Ouvre la modale
    window.openModal = function() {
        // Faire une requête pour obtenir les personnages de type id9
        fetch('/characters')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Vider le contenu actuel
                    characterSelection.innerHTML = '';

                    // Parcourir les personnages et les ajouter à la modale
                    data.characters.forEach(character => {
                        const characterCard = document.createElement('div');
                        characterCard.classList.add('character-card');
                        characterCard.setAttribute('data-img', character.img);

                        characterCard.innerHTML = `
                            <div class="character-image" style="background-image: url('${character.img}');"></div>
                            <p>${character.name}</p>
                            <p class="character-description">${character.context}</p>
                        `;

                        characterSelection.appendChild(characterCard);
                    });

                    // Afficher la modale
                    modal.style.display = "block";
                } else {
                    alert('Erreur lors du chargement des personnages.');
                }
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Ferme la modale
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

   
