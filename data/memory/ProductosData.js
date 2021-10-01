
const { v4: uuidv4 } = require('uuid');
const DTO = require('../../DTO/ProductoDTO');
class ProductoData{
    
    constructor(){   
        console.log("memory");
        this.productos = new Array();
    }
    async getObjectByRow(row){
        let producto = new DTO(row.id,row.title,row.price,row.thumbnail);
        
        return producto;
    }
    async save(producto){
        try{                        
            producto.id = uuidv4();                      
            this.productos.push(producto);            
            return producto;
        }
        catch(err){
            throw new Error(`Error al insertar: ${err.message}`);
        }
    }
    async getAll(){
        let lista = new Array();
        try{
            
            
            for (let row of this.productos) {     
                let item = await this.getObjectByRow(row)           
                lista.push(item);
            }
            return lista;
        }
        catch(err){
            throw new Error(`Error al recuperar los productos: ${err.message}`);
        }        
    }
    async getById(id){
        try{                                   
            let row  = this.productos.find(x => x.id == id);
            let producto = this.getObjectByRow(row);            
            return producto;
        }
        catch(err){
            throw new Error(`Error al recuperar el producto [${id}]: ${err.message}`);
        }
    }
    async update(producto){
        try{
            let index = this.productos.findIndex(x => x.id == producto.id);
            this.productos[index].title = producto.title;
            this.productos[index].price = producto.price;
            this.productos[index].thumbnail = producto.thumbnail;
            return this.productos;
        }
        catch(err){
            throw new Error(`Error al actualizar el producto: ${err.message}`);
        }
    }
    async delete(id){
        
        try{
            let aux = new Array();
            for (let row of this.productos) {     
                if (row.id != id){
                    aux.push(row);
                }                
            }
            this.productos = aux;
        }
        catch(err){
            throw new Error(`Error al eliminar el producto: ${err.message}`);
        }
    }
    
}

module.exports = ProductoData;