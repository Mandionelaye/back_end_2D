const mongoose = require("mongoose");

const shematProduit = mongoose.Schema({
  
    TypeDeCategorie:{
        type: String,
        required:true
    },
    description:String,
    photoProduit:{
        type: String,
        required:true
    },
    prix:{
        type: Number,
        required:true
    },
    users:[{type: mongoose.Types.ObjectId, ref: "user"}]
})

module.exports = mongoose.model("produit",shematProduit)