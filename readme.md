# Groupomania - P7 - OpenClassRooms

Dernier projet de la formation Dev Web Fullstack JS.
Création d'un réseau social d'entreprise.


### Objectifs demandés

* Site responsive et création de compte simple et rapide

* Suppression du compte

* Accès à un forum de partage de texte et/ou de contenus multimédias

* Publications dans l'ordre descendant

* Un administrateur pour modérer les contenus

### Technologies utilisées

##### Frontend

* VueJS 2.6, Vuex 3.4, vue-router 3.2 et Bootstrap-Vue 2.21

##### Backend

* NodeJS 12, Express 4, Sequelize 6.6

##### Base de Données

* MySQL (demandé par le client)

## Pour lancer le projet

#### Frontend

Ouvrez le dossier *frontent* dans votre terminal puis éxecutez la commande :

`npm install`

puis

`npm run serve`

#### Backend 

Dans le dossier backend, créez un dossier que vous nommerez *images* afin de stockez le contenu multimédia

Un fichier *.env_Prod* est fourni, suivez les intructions et renommez-le *.env*.

Ouvrez le dossier *backend* dans votre terminal puis éxecutez la commande :

`npm install`

puis

`nodemon serve`

#### DataBase

Suivez les instructions dans le fichier *.env_Prod* (qui est normalement renommé en *.env*).

Si votre serveur est déjà lancé, relancez-le sinon taper la commande `nodemon serve`, Sequelize créera automatiquement les tables. 

#### Création d'un administrateur 

Pour cela, les serveurs frotn et back doivent être lancé et vous devez être connecté au site via votre navigateur. Créer un utilisateur. une fois cette utilisateur créé connectez-vous à votre serveur MySQL et éxecutez cette commande ```UPDATE `USER` SET `isAdmin` = '1' WHERE `id` = 'saisissez l'id de l'utilisateur devant être administrateur'```

## Utilisation du projet

Une fois les serveurs lancés rendez-vous sur l'URL que vous indiquera votre terminal au lancement du serveur VueJS.

Pour s'inscrire veuillez renseignez tous les champs :

* Nom et prénom (entre 2 et 24 caractères)
* Une adresse mail valide (.com . net .fr)
* Un mot de passe (entre 8 à 36 caractères, au moins une majuscule, une minuscule et 1 chiffres. Symbole et espace interdit)

##### Un fois connecté

Vous pourrez :

* Voir l'ensemble des publications texte ou multimédia
* Publier du texte ou un une image/GIF
* Supprimer votre/vos puiblications (l'administrateur pourra également supprimer vos publications)
* Voir votre profil
* Supprimer votre profil
* Votre session est persistante (via sessionStorage) jusqu'à fermeture de l'onglet ou de votre navigateur 


#### Bonne navigation