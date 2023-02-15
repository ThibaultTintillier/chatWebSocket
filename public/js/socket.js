const socket = io();

const textBoxElement = document.querySelector(".messenger__textBox");
const formElement = document.querySelector(".messenger__footer-form");
const inputElement = document.querySelector(".messenger__footer-form-input");

const pseudoElement = document.querySelector(".messenger__header-left-text-pseudo");
const imageElement = document.querySelector(".messenger__header-left-picture");

// CONNEXION D'UN NOUVEL UTILISATEUR
// Connexion d'un utilisateur et création du profil
window.addEventListener("load", () => {
  const pseudo = prompt("Quel est votre pseudo ?");
  pseudoElement.textContent = pseudo;

  // Choix aléatoire de l'image de profil et insertion dans le HTML
  const images = ["aigle", "chat", "chien", "dauphin", "elephant", "faucon", "leopard", "lion", "poisson", "souris", "vache"];
  const arrayLength = images.length;
  const randomNumber = Math.floor(Math.random() * arrayLength);
  const chosenImage = images[randomNumber];
  imageElement.src = `images/${chosenImage}.PNG`;

  socket.emit("newUser", { pseudo, picture: chosenImage });
});

// Envoi des informations du profil à un autre utilisateur et information de connexion
socket.on("newUserServer", (user) => {
  const noticeElement = document.createElement("div");
  noticeElement.textContent = `${user.pseudo} s'est connecté`;
  noticeElement.classList.add("messenger__textBox-message");
  noticeElement.classList.add("newUser");
  textBoxElement.appendChild(noticeElement);
});

// DECONNEXION D'UN UTILISATEUR
// Envoi des informations de déconnexion un autre utilisateur
socket.on("exitUserServer", (user) => {
  if (user.pseudo) {
    const noticeElement = document.createElement("div");
    noticeElement.textContent = `${user.pseudo} s'est déconnecté`;
    noticeElement.classList.add("messenger__textBox-message");
    noticeElement.classList.add("exitUser");
    textBoxElement.appendChild(noticeElement);
  }
});

// ENVOI ET RECEPTION D'UN MESSAGE
// Envoie d'un message aux différents utilisateurs et création du message en local
formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  if (inputElement.value) {
    // Envoi du message
    socket.emit("messageUser", inputElement.value);

    // Création du message
    const message = document.createElement("div");
    message.textContent = inputElement.value;
    message.classList.add("messenger__textBox-message");
    message.classList.add("user");
    textBoxElement.appendChild(message);

    // Vidage de l'input
    inputElement.value = "";
  }
});

// Création du message chez les autres utilisateurs
socket.on("messageServer", (dataMsg) => {

  // Création du la div regroupant le message et l'image
  const box = document.createElement("div");
  box.classList.add("messenger__textBox-othersMessage");
  textBoxElement.appendChild(box);

  // Création de l'image de profil lié au message
  const picture = document.createElement("img");
  picture.src = `images/${dataMsg.user.picture}.PNG`;
  picture.classList.add("messenger__textBox-picture");
  box.appendChild(picture);

  // Création du message
  const message = document.createElement("div");
  message.textContent = dataMsg.msg;
  message.classList.add("messenger__textBox-message");
  message.classList.add("other");
  box.appendChild(message);
});
