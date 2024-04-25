const modelUsers = require('../../Models/Users/index');
const model = require('../../Models/panier/index');

// creation d'un panier

const createPanier = (req, res) =>{
    model.create(req.body)
    .then((doc1)=>{
        // modifier le user pour l'ajouter son id panier
        modelUsers.findOneAndUpdate({"_id": req.params.id}, {$push: {panier: doc1._id}}, {new:true, runValidators:true})
        .then((doc2)=>{
            //modifier le panier pour ajouter l'id du user
            model.updateMany({"_id": doc2.panier}, { $push : {users: doc2._id, }}, {new:true, runValidators:true})
            .then((doc3)=>{
                console.log("panier creer");
                res.status(200).json(doc3);
            })
            .catch((err)=>{console.error("error ligne 18:"+err)}) 
        })
        .catch((err)=>{console.error("error ligne 20:"+err)}) 
    })
    .catch((err)=>{console.error("error ligne 22:"+err)}) 
}

// afficher un panier

const affichePanier = (req, res) =>{
    model.findById(req.params.id).populate([
        {path:"ProduitsCommander", select :['photoProduit','description', 'prix']},
        {path:"users", select :["nom", "prenom", "photo"]}])
      .then((doc)=>{
        res.status(200).json(doc);
        })
        .catch((err)=>console.error("error ligne 34:"+err))
}

// ajouter un produit dans le panier

const addProduitPanier = async(req, res) =>{
  const produit = await model.findOne({ _id: req.params.id, "numProduits.id": req.body.id });
    if(produit){
        console.log("produit exite");
        return res.status(201).json({
            message:`Ce produit est deja commander ${produit}`
        }) 
    };

    model.findOneAndUpdate({"_id": req.params.id}, {$push: {ProduitsCommander: req.body.id, numProduits: {id:req.body.id, cont:1}}},{new: true, runValidators: true})
    .then((doc)=>{
        res.status(200).json(doc);
        console.log("ajouter dans panier");
      })
      .catch((err)=>console.error("error ligne 45:"+err))
}
 
//ajouter de quantiter

const addQuanProduit = (req, res) =>{
    model.findOneAndUpdate({ _id:req.params.id , "numProduits.id": req.body.id}, 
     { $set: {"numProduits.$.cont": req.body.cont}},   { new: true }
    )
    .then((doc)=>{
        res.status(200).json(doc);
        })
        .catch((err)=>console.error("error ligne 57:"+err))

}
 

// supprimer un produit dans le panier

const deleteProduitPanier = (req, res) =>{
    model.updateOne({"_id": req.params.id}, {$pull: {numProduits: req.body.id, ProduitsCommander: req.body.id}},{new: true, runValidators: true})
    .then((doc)=>{
        res.status(201).json({
          message: true,
        })
        console.log("supp produit panier");
      })
      .catch((err)=>console.error("error ligne 58:"+err))
}

// affichage simple du panier

const afficheNormalPanier = (req, res) =>{
    model.findById(req.params.id)
    .then((doc)=>{
        res.status(200).json(doc);
      })
      .catch((err)=>console.error("error c:"+err))
}

module.exports = {createPanier, addProduitPanier, afficheNormalPanier, affichePanier, deleteProduitPanier, addQuanProduit}