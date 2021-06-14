# Groupomania - P7 - OpenClassRooms

Dernier projet de la formation Dev Web Fullstack JS.
Création d'un réseau social d'entreprise.


### Objectifs demandés

* Site responsive et création de compte simple et rapide

* Suppression du compte

* Accès à un forum de partage de texte et/ou de contenus multimédias

* Publications dasn l'ordre descendant

* Un administrateur poru modérer les contenus

### Technologies utilisées

##### Frontend

* VueJS 2, Vuex, vue-router 

##### Backend

* NodeJS, Express, Sequelize

##### Base de Données

* MySQL (demandé par le client)

## Pour lancer le projet

#### Frontend

Ouvrez le dossier *frontent* dans votre terminal puis éxecutez la commande :

`npm install`

puis

`npm run serve`

#### Backend 

Un fichier *.env_Prod* est fourni, suivez les intructions et renommez-le *.env*.

Ouvrez le dossier *backend* dans votre terminal puis éxecutez la commande :

`npm install`

puis

`nodemon serve`

#### DataBase

Suivez les instructions dans le fichier *.env_Prod* (qui est normalement renommé en *.env*).

Si votre serveur est déjà lancé, relancez-le sinon taper la commande `nodemon serve`, Sequelize créera automatiquement les tables. 

#### Création d'un administrateur 

Pour cela, les serveurs frotn et back doivent être lancé et vous devez être connecté au site via votre navigateur. Créer un utilisateur. une fois cette utilisateur créé connectez-vous à votre serveur MySQL et éxecutez cette commande `UPDATE ``USER`` SET ``isAdmin`` = '1' WHERE ``id`` = 'saisissez l'id de l'utilisateur devant être administrateur'`

