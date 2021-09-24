let instance = null;
class ProductoFactory{
    constructor(){}
    static getFactory(tipo){
        let modulo = require(`../${tipo}/ProductosData.js`)
        if(instance == null){
            instance = new modulo
        }
        return instance;                
    }
}

module.exports = ProductoFactory;