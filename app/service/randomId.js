/**
 * Génère une id aléatoire de 5 caractères
 * @returns {string}
 */
function generateRandomId() {
  var possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var id = "";

  for (var i = 0; i < 5; i++) {
    id += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
  }

  return id;
}

module.exports = generateRandomId;
