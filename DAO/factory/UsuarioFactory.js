let instance = null;
class UsuarioFactory{
    constructor(){}
    static getFactory(tipo){
        let modulo = require(`../${tipo}/UsuariosData.js`)
        if(instance == null){
            instance = new modulo
        }
        return instance;                
    }
}

module.exports = UsuarioFactory;