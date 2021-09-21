const ProductoData = require('../data/ProductosData');
const log4js = require("log4js");
const config = require('../helpers/Logger');
log4js.configure(config);
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
            let Data = new ProductoData();
            
            let nuevo = await Data.save(item);
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
            let Data = new ProductoData();
            let items = new Array();
            //this.consolaInfo.info('Valida productos existentes');
            items = Data.getAll();
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
            let Data = new ProductoData();
            let obj = await Data.getById(id);
            //this.consolaInfo.info('Valida si existe el producto');
            if(typeof(obj) == undefined){
                
                throw new Error("Producto no encontrado");            
            }
            return obj;
        }
        catch(err){
            this.consolaInfo.error('Error al recuperar el producto ' + err.message);
            this.fileErr.error('Error al recuperar el producto '  + err.message);
            this.fileWarn.warn('Error al recuperar el producto '  + err.message);
            throw Error(err.message);
        }
        
    }
    async updateProduct(prod, id){
        try{
            let Data = new ProductoData();
            prod.id = id;
            await Data.update(prod);
            
            return this.getProducts();
        }catch(error){
            throw error;
        }
    }
    async deleteProduct(id){
        try{
            let Data = new ProductoData();
            await Data.delete(id);
            return this.getProducts();
        }catch(error){
            throw error;
        }
    }
}

module.exports = Producto;


