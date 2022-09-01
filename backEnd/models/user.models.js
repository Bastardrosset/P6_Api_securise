const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // mongoose-unique-validator permet 

// Modele utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // uniqueValidator appliquer au schéma userSchema avant d'en faire un model

module.exports = mongoose.model('User', userSchema);