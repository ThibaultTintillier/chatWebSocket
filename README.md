# Création d'un chat avec socket.io

## Objet

Ce repo présente une messagerie instantannée réalisée dans un but d'apprentissage et de démonstration de compétences.

## Contexte

Ce projet permet de mettre en avant l'utilisation des websockets par l'intermédiaire de socket.io et a été réalisé seul.
Ce projet a été réalisé en janvier 2023.

## Fonctionnalités

Cette appplication permettant de comprendre l'utilisation des websockets et de socket.io, seules les fonctionnalités suivantes ont été implémentées :

- échange de texte (grâce à socket.io),
- connexion et la déconnexion d'un utilisateur (grâce à socket.io),
- choix du pseudo par l'utilisateur,
- choix aléatoire du l'image de profil.

## Technologies

Le projet a été réalisé en HTML/CSS et en JS. Les dépendances suivantes ont été utilisées :

- dotenv,
- ejs
- express
- nodemon
- socket.io

## Aperçu

![Aperçu](/data/readme/aper%C3%A7u.PNG)

## Utilisation

Pour utiliser l'application :

- Télécharger le repo grâce à "git clone".
- Renommer le fichier ".env.example" en ".env" et mettre le numéro de PORT que vous voulez (si le port utilisateur n'est pas modifié, le port par défaut "3000" est utilisé).
- Télécharger les différentes dépendances avec npm ou yarn selon le logiciel utilisé.

```bash
npm i
```

```bash
yarn install
```

- Lancer l'application avec la commande :

```bash
npm run dev
```

- Ouvrir deux pages de navigation et se connecter sur http://localhost:XXXX/ avec XXXX le numéro du port choisi ou cliquer sur le lien fourni dans la console du serveur.
- Sur chaque page, choisir un pseudonyme.
- Converser.
