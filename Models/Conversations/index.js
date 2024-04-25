const mongoose = require("mongoose");

const shematConversation = mongoose.Schema(
    {
        members:[{type: mongoose.Types.ObjectId, ref: "user"}],
        Messages:[{type: mongoose.Types.ObjectId, ref: "Message"}]
    },
    {timestamps: true}
)

module.exports = mongoose.model("Conversation",shematConversation)