const ProductoData = require('../data/ProductosData');
class Producto{     
    constructor(){
        this.title = "";
        this.price = 0;
        this.thumbnail = "";
        this.id = -1;
    } 
    
    saveProduct(item){
        let Data = new ProductoData();
        Data.save(item);
        return item;
    }
    getProducts(){
        let Data = new ProductoData();
        let items = new Array();
        items = Data.getAll();
        if (items == 0){
            throw new Error("No hay productos cargados");
        }
        return items;
    }
    getProductById(id){
        let Data = new ProductoData();
        let obj = Data.getById(id);
        if(obj == null || obj == undefined){
            throw new Error("Producto no encontrado");            
        }
        return obj;
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


