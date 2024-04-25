const modelUsers = require('../../Models/Users/index');
const model = require('../../Models/produit/index');

// creation de produit

const createProduit = (req, res) =>{
    model.create(req.body)
    .then((doc)=>{
        // modification du user pour l'ajout du ID produit
        modelUsers.findOneAndUpdate({"_id": req.params.id}, {$push: {produits: doc._id}}, {new:true, runValidators:true})
        .then((doc1)=>{
            // modification du message en lui ajoutant l'id du User
            model.updateMany({"_id": doc1.produits}, {$push: {users: doc1._id}}, {new:true, runValidators:true})
            .then((doc2)=>{
                //envoie du produit creer
                console.log("produit crée");
                model.findById(doc._id).populate({path:"users", select :["nom", "prenom", "photo"]})
                .then((doc3)=>{
                    res.status(200).json(doc3);
                    console.log(doc3);
                })
            })
            .catch((err)=>{console.error("error ligne 19:"+err)}) 
        })
        .catch((err)=>{console.error("error ligne 21:"+err)}) 
    })
    .catch((err)=>{console.error("error ligne 23:"+err)}) 
}

// affichage de tout les produits

const afficheProduits = (req, res) =>{
    model.find().populate({path:"users", select :["nom", "prenom", "photo"]})
    .then((doc)=>{
        res.status(200).json(doc)
      })
      .catch((err)=>console.error("error ligne 33:"+err))
}

// affichage d'un seule produit

const afficheOneProduit = (req, res) =>{
    model.findById(req.params.idp).populate({path:"users", select :["nom", "prenom", "photo"]})
    .then((doc)=>{
        res.status(200).json(doc);
        })
    .catch((err)=>console.error("error ligne 43:"+err))
}
 
module.exports = {createProduit, afficheProduits, afficheOneProduit}