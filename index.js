require("dotenv").config();

// LANCEMENT EXPRESS
const express = require("express");
const app = express();

// LANCEMENT SERVEUR
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// LANCEMENT SOCKET.IO
const { Server } = require("socket.io");
const io = new Server(server);

// REQUIRE PATH
const path = require("path");

// RECUPERATION CLASSES ET SERVICES
const User = require("./app/class/user");
const generateRandomId = require("./app/service/randomId");

// LANCEMENT EJS
app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static(path.join(__dirname, "./public")));

// ROUTER
const router = require("./app/router");
app.use("/", router);

// SOCKET.IO
io.on("connection", (socket) => {

  // Connexion d'un nouvel utilisateur
  const user = new User();
  user.id = generateRandomId();
  socket.on("newUser", (dataUser) => {
    user.pseudo = dataUser.pseudo;
    user.picture = dataUser.picture;

    socket.broadcast.emit("newUserServer", user);
  });

  // Déconnexion d'un utilisateur
  socket.on("disconnect", () => {
    socket.broadcast.emit("exitUserServer", user);
  });

  // Envoi et réception d'un message
  socket.on("messageUser", (msg) => {
    socket.broadcast.emit("messageServer", { msg, user });
  });
});

// ECOUTE DU SERVEUR
server.listen(port, () => {
  console.log(`Application running on http://localhost:${ port }/`);
});
