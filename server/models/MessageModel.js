const mongoose = require("mongoose");
 
const MessageModel = new mongoose.Schema({
    sender : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "users"
    },
    content : {
        type : String,
        maxlength : 500
    },
    chat : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "chats"
    }                                    
}, { timestamps : true })

const Message = mongoose.model("messages", MessageModel)

module.exports = Message;