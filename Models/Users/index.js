const mongoose = require("mongoose");

const shematUser = mongoose.Schema({
    nom:{
        type: String,
        required:true
    },
    prenom:{
        type: String,
        required:true
    },
    email:{
            type: String,
            required: true,
            unique: true
    },
    password:{
        type: String,
        required:true
    },
    nomEntreprise:String,
    tel:Number,
    lieu:String,
    photo:String,
    categories:[{
        type: String,
        required:true
    }],
    bio:String,
    produits:[{type: mongoose.Types.ObjectId, ref:"produit"}],
    discution:[{type: mongoose.Types.ObjectId, ref:"Conversation"}],
    panier:[{type: mongoose.Types.ObjectId, ref:"panier"}]
})

module.exports = mongoose.model("user",shematUser);