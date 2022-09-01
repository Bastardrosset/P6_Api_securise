const jwt = require('jsonwebtoken');
 
// Function de décryptage du token
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1]; //extraction du token du header Authorization dans requête entrante. La fonction split() récupére tout après l'espace dans le header
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // la fonction verify décode le token et vérifie sa validité
       const userId = decodedToken.userId;
       req // l'Id utilisateur est extrait du TOKEN et ajouté à l'objet Request pour être exploité par les Routes
       .auth = { 
           userId: userId
        };
	    next();
    } catch(error) {
       res.status(401).json({ error });
    }
};