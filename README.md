# Projet AdR Frontend

Le frontend est codé en [ReactJS](https://fr.reactjs.org/), un framework `Javascript` permettant de faire des app complexes et rapides, reposant sur le concept de `DOM virtuel`.

# Sommaire

* [Installation](#installation)
* [Déploiement](#déploiement)
* [Doc de Create React App](#doc-de-create-react-app)


## Installation

Setup pour développer le frontend en local
* faire un `git pull` dans le dossier du `frontend`
* (installer nodejs)
* faire un `npm install` pour installer les packages du package.json
* créer un fichier `config.js` dans le dossier `src` à partir du fichier `config.js.dist` : remplacer les valeur d'environnement de dev correspondantes
* faire un `npm start` pour lancer un serveur de développement `react-scripts` à l'adresse `localhost:3000` et se refresh à chaque changement.
* Prier pour que ça marche (normalemennt c'est ok)

## Déploiement

Déployer le frontend sur le serveur de l'AdR
* faire `cd /var/www/projet-adr/frontend` pour se placer dans le bon dossier
* faire un `sudo git pull` (sudo nécessaire sinon pas les droits)
* faire un `sudo npm install` si jamais le `package.json` a été modifié
* faire un `sudo npm run build` pour build la version de production de l'application react (ça compile le React en du javascript compréhensible pour un navigateur)

Et c'est tout! normalement le dossier `build` est directement relié au serveur `Apache`


## Doc de Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

