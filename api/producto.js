class Producto{     
    constructor(){
        this.title = "";
        this.price = 0;
        this.thumbnail = "";
        this.id = -1;
        this.items= [];
    }
 
    saveProduct(item){
        let id;
        
        if (this.items.length == 0){
            id = 1;
        }else{
            id = this.items.length + 1;
        }

        item.id = id;
        this.items.push(item);
        return item;
    }
    getProducts(){
        if (this.items == 0){
            throw new Error("No hay productos cargados");
        }
        return this.items;
    }
    getProductById(id){
        let obj = this.items.find(x => x.id == id);
        if(obj == null || obj == undefined){
            throw new Error("Producto no encontrado");            
        }
        return obj;
    }
    updateProduct(prod, id){
        try{
            let index = this.items.findIndex(x => x.id == id);
            console.log(index);
            if (index < 0)
                throw new Error("No se encontro el producto");
            prod.id = id;
            this.items.splice(index,1,prod);
            return this.items;
        }catch(error){
            throw error;
        }
    }
    deleteProduct(id){
        try{
            let index = this.items.findIndex(x => x.id == id);
            if (index < 0)
                throw new Error("No se encontro el producto");
            this.items.splice(index,1);
            return this.items;
        }catch(error){
            throw error;
        }
    }
}

module.exports = Producto;