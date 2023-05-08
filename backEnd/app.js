require('dotenv').config()
const mongoose = require('./services/db');

const express = require('express');
const app = express();
const path = require('path');

// chemin vers les routes sauces
const sauceRoutes = require('./routes/sauces.routes') 
// chemin vers les routes users
const userRoute = require('./routes/user.routes') 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // accès à l'API depuis n'importe quelle origine ( '*' )
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajouter les headers mentionnés aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoyer des requêtes avec les méthodes mentionnées 
    next();
  });


// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // analyseur accepte tout encodage Unicode et met a disposition le body des requetes


// gestionnaire de routage des images
app.use('/images', express.static(path.join(__dirname, 'images')));
// importe la logique des routes sauces
app.use('/api/sauces', sauceRoutes); 
// importe la logique des routes users
app.use('/api/auth', userRoute); 



module.exports = app;