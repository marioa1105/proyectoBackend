const mongoose = require('mongoose');
const schemaAuthor = mongoose.Schema({    
        id:{type:String},
        nombre:{type:String},
        apellido:{type:String},
        edad:{type:Number},
        alias:{type:String},
        avatar:{type:String}
        
    });
const schema = mongoose.Schema({
    text:{type:String},
    author: {
        type:schemaAuthor, default:{}
    },
    date:{type:Date, default: Date.now}
    /*email: {type:String},
    date:{type:Date, default: Date.now},
    message:{type:String}*/
});

const Chat = mongoose.model("mensajes_normalizr",schema);

module.exports = Chat;