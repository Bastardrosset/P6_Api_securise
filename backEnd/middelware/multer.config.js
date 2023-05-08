const multer = require('multer');

const MIME_TYPES = { // capture les fichiers d'un certain type d'extension
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { // la fonction destination indique d'enregistrer les fichiers dans le dossier images
    callback(null, 'images');
  },
  filename: (req, file, callback) => { // la fonction filename indique quel nom de fichier utiliser
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');