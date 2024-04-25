const express = require('express');
const {createuser, affcheUsers, AffAllUsers, deleteProduit, modifUser} = require("../Controlleurs/Users/controlleurUser");
const {createProduit, afficheProduits, afficheOneProduit} = require('../Controlleurs/Produit/controlleurProduit')
const {connection, dechiffToken} = require('../Controlleurs/connection/connectionControlleurs');
const {CreateConversation, AfficheConversation, DeleteConversation, afficheUneConversation , filterMessage, deleteConvAllMessage} = require("../Controlleurs/Conversations/controlleurComversation");
const {addMessage,afficheMessages,deleteMessage} = require('../Controlleurs/Messages/controlleurMessages');
const {search} = require('../Controlleurs/search/controlleurSearch')
const {createPanier, affichePanier, afficheNormalPanier, addProduitPanier, deleteProduitPanier, addQuanProduit} = require('../Controlleurs/Panier/controlleurPanier')
const route = express.Router();


//connection
route.post('/connection', connection);

//dechiffToken
route.get('/donnee/:token', dechiffToken);

// get all users & produit for the Search
route.get("/All", search);

//users
route.post('/user', createuser);
route.get('/user/:id', affcheUsers);
route.get('/users', AffAllUsers);
route.post('/modifUser/:id', modifUser);
route.put('/userSupp/:id', deleteProduit); 

//Pour les Produits
route.post('/produit/:id', createProduit);
route.get("/produits", afficheProduits);
route.get("/produits/:idp", afficheOneProduit);

//Conversation
route.post('/conversation', CreateConversation);
route.get('/conversations/:id', AfficheConversation);
route.get('/conversation/:id', afficheUneConversation);
route.get('/filterMessage/:id', filterMessage);
//route.post('/filterConv', filtreComv);
route.put('/delAllMssg', deleteConvAllMessage);
route.put('/deleteConversation/:id', DeleteConversation );

//messages
route.post('/message', addMessage);
route.get('/messages/:id', afficheMessages);
route.delete('/message/:id', deleteMessage );

//Pour le panier
route.post('/panier/:id', createPanier);
route.post("/panier/add/:id", addProduitPanier);
route.post("/panier/addCont/:id", addQuanProduit);
route.put("/panier/supp/:id", deleteProduitPanier);
route.get("/paniers/:id", affichePanier);
route.get("/panierNormal/:id", afficheNormalPanier);

module.exports = route;