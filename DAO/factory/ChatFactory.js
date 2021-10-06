let instance = null;
class ChatFactory{
    constructor(){}
    static getFactory(tipo){
        let modulo = require(`../${tipo}/ChatData.js`)
        if(instance == null){
            instance = new modulo
        }
        return instance;                
    }
}

module.exports = ChatFactory;