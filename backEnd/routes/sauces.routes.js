







const express = require('express');
const auth = require('../middelware/auth.middelware');
const sauceCtrl = require('../controllers/sauces.controllers');
const multer = require('../middelware/multer.config');

const router = express.Router();

router.get('/', auth, sauceCtrl.getAllSauces); // applique fonction afficher toutes les sauces
router.post('/', auth, multer, sauceCtrl.createSauce); // applique fonction creation sauce a la route
router.get('/:id', auth, sauceCtrl.getOneSauce); // applique fonction appel une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // applique fonction modifie sauce a la route
router.delete('/:id', auth, sauceCtrl.deleteSauce); // applique fonction supprimer sauce
router.post('/:id/like', auth, sauceCtrl.likeSauce); // applique la fonction like sauce


module.exports = router;