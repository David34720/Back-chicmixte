# ROADMAP

---

Nous devons faire une architecture de base d'une application express, qui pourra se connecter à une BDD.

0. [x] Initialiser git `git init`

1. [x] Initialiser l'app avec `npm init` ou `npm init -y`
2. [x] Créer une fichier `.gitignore`
3. [x] Modifier le numéro de version dans le package.json et nommer le projet
4. [x] Créer un fichier `.env` et son copain le `.env.example`
5. [x] Installer les dépendances `express dotenv pg ejs`
6. [x] Installer les dèv dépendances `eslint prettier nodemon`
7. [x] Créer le point d'entrée de l'application
8. [x] Créer des scripts de dèv dans `package.json`
9. [x] Faire une archi avec les répertoires `app` `views partials` `controllers` `routers` `DB`
10.[x] Créer la BDD
    - `sudo -i -u postgres psql`
    - `CREATE ROLE oquiz WITH LOGIN PASSWORD 'oquiz';`
    - `CREATE DATABASE oquiz OWNER oquiz;`
11. [x] Créer un dataMapper
12. [x] Faire une route
13. [ ] Créer un middleware errorHandler (404, errors ...)
14. [x] Ajouter config `prettier` et `eslint`
15. [ ] `git push`
