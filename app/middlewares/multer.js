// middlewares/multer.js
const path = require('path');
const multer = require('multer');

// Configuration de multer pour gérer le stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../assets/img/items')); // Dossier de destination
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Nom du fichier stocké
    }
});

// Initialisation de multer avec la configuration de stockage
const upload = multer({ storage: storage });

module.exports = upload;
