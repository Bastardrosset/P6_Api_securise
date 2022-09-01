const bcrypt = require('bcrypt'); // bibliothèque pour vous aider à hacher les mots de passe
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');  



// Function de création de compte
exports.signup = (req, res, next) => { // signup crypte le mot de passe, hash() de bcrypt crée un hash crypté du mot de passe utilisateur pour l' enregistrer de manière sécurisée dans la base de données
    bcrypt
    .hash(req.body.password, 10) // le salt 10 équivaux au nombre de fois d'éxécution de l'algo de hachachage
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'User créé !'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

// Function d'identification a un compte
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            // la fonction compare de bcrypt compare le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( // methode sign() défini les données à encoder du TOKEN
                            { userId: user._id }, // 1er argument l'ID
                            'RANDOM_TOKEN_SECRET', // 2eme argument la clé
                            { expiresIn: '24h' } // 3eme argument l'expiration
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };