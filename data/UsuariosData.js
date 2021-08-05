const mongoose = require('mongoose');
const Model = require('../model/Usuarios');
const {mongo} = require('./config');
class UsuariosData{
    constructor(){
        mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=> {
                console.log('Conexion usuarios');
            });
    }
    async getUsuario(userName){
        let usuario = await Model.findOne({UserName: userName})
        return usuario;
    }
    async save(usuario){
        await Model.create(usuario);
        return true;
    }
}


module.exports = new UsuariosData();