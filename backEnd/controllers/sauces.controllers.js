const Sauce = require("../models/Sauce.models"); // chemin vers model de sauce
const fs = require("fs"); // file système

// fonction creation de sauce
exports.createSauce = (req, res, next) => {
  const sauce = new Sauce({
    ...JSON.parse(req.body.sauce),

    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  
  sauce
    .save()
    .then(() => {
     return res.status(201).json({ message: "Objet enregistré !" })
    })
    .catch((error) => {
     return res.status(400).json({ error });
    });
};

// fonction modifie sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete sauceObject._userId;
  Sauce
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized !" });
      } else {
        Sauce
        .updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modifié !" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// fonction supprimer sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not autorized !" });
      } else {
        const filename = sauce.imageUrl.split("images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// fonction récupère une sauce
exports.getOneSauce = (req, res, next) => {
  const { id } = req.params;
  Sauce
  .findById(id)
    .then(sauce => {
      res.status(200).json(sauce)
    })
    .catch(console.error)
};

// fonction appel toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find() // méthode find() permet de renvoyer un tableau contenant tous les Sauces dans la BD
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// fonction like sauce
exports.likeSauce = (req, res, next ) => {
  const { id } = req.params;
  
  const userId = req.body.userId;
  const like = req.body.like;
  Sauce
  .findById(id)
  .then((sauce) => {
    // console.log("sauce as")
    // console.log(sauce)
    let resultSauce = incrementLike(sauce, userId, like)
    res.status(200).send(resultSauce)
  })
}

// fonction ajoute un like
function incrementLike(sauce, userId, like) {

  if(like === 1){
        sauce.usersLiked.push(userId);
        sauce.likes++;
    
  }else if (like == -1){
        sauce.usersDisliked.push(userId);
        sauce.dislikes++;
      
  }else {
    if(sauce.usersLiked.includes(userId)){
      sauce.usersLiked= sauce.usersLiked.filter(item => item != userId)
        // console.log("annulation like")
        sauce.likes--
    }else {
      sauce.usersDisliked= sauce.usersDisliked.filter(item => item != userId)
      // console.log("annulation dislike")
      sauce.dislikes--
    }
  }
  sauce.save(like);
  return sauce;
}
