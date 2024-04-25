const modelUser = require('../../Models/Users/index');
const modelproduit = require('../../Models/produit/index');


exports.search = async(req, res) =>{
    const {Search}= req.query;
     try{
        const resUse= await modelUser.find()
        const resPr= await modelproduit.find()
        const all = await [...resUse, ...resPr]
        res.status(200).json(all)
     } catch(err){
         res.status(500).send(err)
     }
}