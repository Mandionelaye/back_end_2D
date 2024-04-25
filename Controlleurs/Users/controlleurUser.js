const model = require("../../Models/Users/index");
const modelProduit = require("../../Models/produit/index")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const photoAvatar = require('../photoDefault/photo');

//creation de Token

const createToken = (id, nom, isAdmin)=>{
    return jwt.sign({
        data:{id, nom, isAdmin}},
        process.env.JWT_SECRET,
         {expiresIn:"360d"}
        )
}

//creation user

const Createuser = async(req, res)=>{

      //virifie si email existe deja
      const email =  await model.findOne({email: req.body.email});
      if(email){
          console.log("email exite");
          return res.status(201).json({
              message:`cette email existe ${email.email}`
          }) 
      };

    //virifier la longueur du mots de passe
    if(req.body.password){
        if(req.body.password.length < 8 ){
            console.log("password court");
            return res.status(201).json({
                message:`mots de passe court`
            })
        };
    }

    //cruptage du password
    const salt =bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    //ajout d'un photo par defaut
    req.body.photo = photoAvatar;

    await model.create(req.body)
    .then((doc)=>{
        //on creer un token pour l'utilisateur
       const token = createToken(doc._id, doc.nom, doc.email)

       res.status(201).json({
        id:doc._id,
        message: "creation avec succes",
        token
       })
        console.log("create nice");
})
    .catch((err)=> console.error("erreur ligne 57: "+err))
} 

//affiche User et ces conversations

const AffcheUsers = async(req, res) =>{
    await model.findById(req.params.id).populate([
        {path:'produits', select:['TypeDeCategorie','description', 'prix', 'photoProduit']}, 
        {path:"discution", select :["distinataire","message"]}, 
        {path:"panier", select :["ProduitsCommander"]}
    ])
    .then((doc)=>{
        res.json(doc);
        console.log("affiche nice");
    })
    .catch((err)=> console.error("erreur ligne 72: "+err))
}

//afficher tout les utilisateur
const AffAllUsers = async(req, res) =>{
    await model.find()
    .then((doc)=>{
        res.json(doc);
        console.log("affiches");
    })
    .catch((err)=> console.error(err))
}

//Modification de l'utilisateur
const modifUser= async(req, res) => {
    const {nom , prenom, bio, photo, entreprise, categories,tel,lieu}=req.body;

    //nom
    nom?
    model.updateOne({"_id":req.params.id}, {nom:nom}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp1");
      })
      .catch((err)=>console.error("error ligne 99:"+err))
     :null

    //Prenom
    prenom?
    model.updateOne({"_id":req.params.id}, {prenom:prenom}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp2");
    })
    .catch((err)=>console.error("error ligne 110:"+err))
    :null

    //Bio
    bio?
    model.updateOne({"_id":req.params.id}, {bio:bio}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp3");
    })
    .catch((err)=>console.error("error ligne 121:"+err))
    :null
    
    //Photo
    photo?
    model.updateOne({"_id":req.params.id}, {photo:photo}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp4");
    })
    .catch((err)=>console.error("error ligne 132:"+err))
    :null

     //nomEntreprise
     entreprise?
     model.updateOne({"_id":req.params.id}, {nomEntreprise:entreprise}
     ,{new:true, runValidators:true})
     .then((doc)=>{
         res.send(doc)
         console.log("supp5");
     })
     .catch((err)=>console.error("error ligne 143:"+err))
     :null

      //categories
      categories?
      model.updateOne({"_id":req.params.id}, {categories:categories}
      ,{new:true, runValidators:true})
      .then((doc)=>{
          res.send(doc)
          console.log("supp6");
      })
      .catch((err)=>console.error("error ligne 154:"+err))
      :null

      //tel
      tel?
      model.updateOne({"_id":req.params.id}, {tel:tel}
      ,{new:true, runValidators:true})
      .then((doc)=>{
          res.send(doc)
          console.log("supp7");
      })
      .catch((err)=>console.error("error ligne 165:"+err))
      :null

     //lieu
     lieu?
      model.updateOne({"_id":req.params.id}, {lieu:lieu}
      ,{new:true, runValidators:true})
      .then((doc)=>{
          res.send(doc)
          console.log("supp7");
      })
      .catch((err)=>console.error("error ligne 176:"+err))
      :null
}

//Modification de l'image du profil
function UdateImg(req, res){
     model.updateOne({_id: req.params.id}, {photo: req.body.photo})
    .then((doc)=>{
        res.status(200).json({
            message:"user modifier"
        });
        console.log("user modifier");
    })
    .catch((err)=> console.error(err))
}

// suppromer un produit

const deleteProduit = async(req, res) =>{
    model.updateOne({"_id": req.params.id}, {$pull: {produits: req.body.id}},{new: true, runValidators: true})
    .then((doc)=>{
        modelProduit.findOneAndDelete({ "_id": req.body.id})
        .then((doc)=>{console.log("produit supprimer");})
        .catch((err)=>console.error("error ligne 198:"+err))
        res.status(200).json(doc)
      })
      .catch((err)=>console.error("error c:"+err))
}

module.exports = {createuser: Createuser, affcheUsers: AffcheUsers, modifUser: modifUser, createToken: createToken, AffAllUsers, deleteProduit:deleteProduit}