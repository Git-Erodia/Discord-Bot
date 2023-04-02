
![Logo](https://raw.githubusercontent.com/Git-Erodia/Discord-Bot/main/img/logo.png)

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


# Git-Erodia / Discord-Bot
Ce bot à été réaliser très rapidement pour le serveur Minecraft Bedrock Edition @Erodia.

Celui-ci est malheureusement avec l'API Discord-JS sous la version 13.0.
*Une mise-à-jour vers la dernière version de l'api est prévue sous peux*

## Langage
#### Javascript
![JavaScript](https://raw.githubusercontent.com/Git-Erodia/Discord-Bot/main/img/javascript.png)
## Fonctionnalités

- Informations concernant le serveur (Query)
- Module de Ticket
- Module de Warn avancé
- Module de gestion de fichier JSON
- Module de gestion de la hiérarchie
- Module basic d'Anti-Raid
- Liaison de membres de l'équipe via leur pseudonyme en jeu

### Commandes
- BanList *(Obtenir la liste des personnes banni(e) sur discord et en jeu)*
- Connection *(Obtenir des informations sur l'adresse IP et le port du serveur)*
- Info *(Obtenir des informations sur un joueur existant en jeu)*
- Ping *(Permet d'évaluer la latence entre les différentes API et reqûetes du bot)*
- Raid *(Permet d'activer certaine option du mode raid et dans désactivé)*
- Sanction *(Permet de timeout un membre pendant une certaine durée)*
- Say *(Permet d'envoyer un message en embed via le bot)*
- Ticket *(Permet d'ajouter une personne a un ticket)*

#### Commandes de Raid
- AntiBot *(Expulsera automatiquement un bot si une personne autre que la personne possédant la couronne du serveur Discord, il laisse passé les bots ayant une certification, mais il envoie un message au administrateur)*
- AntiCreateChannel *(Supprimera automatiquement tout les salons qui porte le même nom et qui on été crée par la personne 3 fois de suite)*
- AntiCreateRole *(Supprimera automatiquement tout les roles qui porte le même nom et qui on été crée par la personne 3 fois de suite)*
- AntiDeleteChannel *(Il Recrée automatiquement tout les salons qui ont été supprimé)*
- AntiDeleteRole *(Il Recrée automatiquement tout les roles qui ont été supprimé)*
- AntiGuildManage *(Il modifie automatiquement le nom du serveur Discord si celui-ci a été changer & modifie aussi les paramètres de notification)*
- AntiLink *(Supprime automatiquement un lien lorsqu'un message est envoyé par un membre sans permission [Ajout de Warn a chaque avertissement, 3 avertissement dans la même journée et un timeout de 5 minutes commences])*
- AntiWebHook *(Supprimera automatiquement un Discord WebHook lors de sont utilisation si activé)*
## Installation

Pour utiliser le bot, il vous faut [NodeJS](https://nodejs.org/fr)

```bash
  git clone --branch="main" https://github.com/Git-Erodia/Discord-Bot
  cd Discord-Bot
  npm install
  node index.js
```
    
## Running

Pour commencer, exécutez la commande suivante

```bash
  npm index.js
```


## Screenshot
![Screenshot](https://raw.githubusercontent.com/Git-Erodia/Discord-Bot/main/img/screenshot.PNG)


## Feedback

Si vous avez des commentaires, n'hésitez pas à nous contacter à l'adresse suivante : contact@erodia.fr
## Auteurs

- [@Zwuiix-cmd](https://www.github.com/Zwuiix-cmd)
- [@UnNyanCat](https://github.com/UnNyanCat)
## Utilisé par

Ce projet est utilisé par les entreprises suivantes :

- Erodia