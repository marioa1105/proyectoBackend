const mongoose = require('mongoose');
const schema = mongoose.Schema({
    UserName:{type:String},
    Password:{type:String}
});

const Usuarios = mongoose.model('usuarios',schema);

module.exports = Usuarios;