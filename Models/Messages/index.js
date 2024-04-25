const mongoose = require("mongoose");

const shematMessage = mongoose.Schema(
    {
        conversationId:{
            type: String,
        },
        sender:[{type: mongoose.Types.ObjectId, ref: "user"}],
        text:{
            type: String,
        },
        photo:{
            type: String,
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Message",shematMessage)