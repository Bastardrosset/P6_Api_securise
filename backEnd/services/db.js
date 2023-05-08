// Base de Données
const mongoose = require('mongoose');

// Informations sensibles
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD
const DB = process.env.DB
const ACCESSMONGO = process.env.ACCESSMONGO

// adresse de la base de données
const uri = `mongodb+srv://${LOGIN}:${PASSWORD}@${ACCESSMONGO}/${DB}`

// Methode d'indentification a la base de donnée
mongoose
  .connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


module.exports = mongoose;