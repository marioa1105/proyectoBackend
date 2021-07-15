const mongoose = require('mongoose');
const schema = mongoose.Schema({
    email: {type:String},
    date:{type:Date, default: Date.now},
    message:{type:String}
});

const Chat = mongoose.model("mensajes",schema);

module.exports = Chat;