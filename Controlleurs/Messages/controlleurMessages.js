const model = require('../../Models/Messages/index');
const modelConversation = require('../../Models/Conversations/index');
const {aes_cry, aes_dec} = require('../../cryptage/aes')

//ajouter un message
exports.addMessage = async(req, res) => {
    const newMessage = new model(req.body);
    //pour crypter le messages avec AES 
    newMessage.text = aes_cry(newMessage.text);
    if(newMessage.photo){
        newMessage.photo = aes_cry(newMessage.photo);
    }

    try{
        newMessage.save()
        .then((docs) => {
            //je modifi la conversation en ajoutant id du message creer

            modelConversation.findOneAndUpdate(
                {"_id": docs.conversationId},
                {$push : {Messages: docs._id}}, 
                {new:true, runValidators:true}
             )
            .then(async(doc) => {
                const messages = await model.findById(docs._id).populate({path:"sender", select :["nom", "prenom", "photo"]});
                messages.text = aes_dec(messages.text)
                res.status(200).json(messages);
                console.log("messages ajouter");
            }).catch((err) => {
                console.error(err);
                res.status(401).json(err);
            });

        }).catch((err) => { 
            console.log(err);
            res.status(401).json(err);
        });

    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
}

//affiche des messages
exports.afficheMessages = async(req, res) => {
        await model.find({conversationId: req.params.id})
        .populate({path: "sender", select: ["nom", "prenom", "photo"]})
        .then((result) => {
            for(let i = 0; i < result.length; i++){
                result[i].text = aes_dec(result[i].text);
                if(result[i].photo){
                    result[i].photo = aes_dec(result[i].photo);
                }
            }
            res.status(200).json(result);
        }).catch((err) => {
            console.error(err);
            res.status(401).json(err);
        });
}

//delete message
exports.deleteMessage = async(req, res) => {
    model.deleteOne({_id:req.params.id})
    .then((result) => {
        res.status(200).json({
            message: 'messages supprime'
        })
        console.log('messages supprime');
    }).catch((err) => {
        console.error(err);
            res.status(401).json(err);
    });
}