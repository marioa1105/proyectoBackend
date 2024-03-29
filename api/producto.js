const Factory = require('../DAO/factory/productoFactory');
const env = require('../config/config');

const log4js = require("log4js");
const config = require('../helpers/Logger');
log4js.configure(config);

const ProductoData = Factory.getFactory(env.PROVIDER);
class Producto{     
    constructor(){
        this.title = "";
        this.price = 0;
        this.thumbnail = "";
        this.id = -1;
        this.consolaInfo= log4js.getLogger('consolaInfo');
        this.fileErr = log4js.getLogger('fileErr');
        this.fileWarn = log4js.getLogger('fileWarn');
    } 
    
    async saveProduct(item){
        try{                        
            this.consolaInfo.info('agregando producto');
        
            
            let nuevo = await ProductoData.save(item);
            this.consolaInfo.info('producto guardado');
            
            return nuevo;
        }
        catch(err){
            this.consolaInfo.error('Error al grabar producto ' + err.message);
            this.fileErr.error('Error al grabar producto ' + err.message);
            this.fileWarn.warn('Error al grabar producto ' + err.message);
            throw Error(`Error al grabar producto`);
        }
        
    }
    getProducts(){
        try{
            
            let items = new Array();
            //this.consolaInfo.info('Valida productos existentes');
            items = ProductoData.getAll();
            if (items == 0){
                this.fileWarn.warn('No hay productos cargados')
                throw new Error("No hay productos cargados");
            }
            return items;
        }
        catch(err){
            this.consolaInfo.error('Error al recuperar productos ' + err.message);
            this.fileErr.error('Error al recuperar productos '  + err.message);
            this.fileWarn.warn('Error al recuperar productos '  + err.message);
            throw Error(err.message);
        }
    }
    async getProductById(id){
        try{
            
            let obj = await ProductoData.getById(id);
            //this.consolaInfo.info('Valida si existe el producto');
            if(typeof(obj) == undefined){
                
                throw new Error("Producto no encontrado");            
            }
            return obj;
        }
        catch(err){
            //this.consolaInfo.error('Error al recuperar el producto ' + err.message);
            //this.fileErr.error('Error al recuperar el producto '  + err.message);
            //this.fileWarn.warn('Error al recuperar el producto '  + err.message);
            throw Error(err.message);
        }
        
    }
    async updateProduct(prod, id){
        try{
            
            prod.id = id;
            await ProductoData.update(prod);
            
            return this.getProducts();
        }catch(error){
            throw error;
        }
    }
    async deleteProduct(id){
        try{
            
            await ProductoData.delete(id);
            return this.getProducts();
        }catch(error){
            throw error;
        }
    }
}

module.exports = Producto;


