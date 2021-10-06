const {mySqlConfig} = require('../config');
const knex = require('knex')(mySqlConfig);
const DTO = require('../../DTO/ProductoDTO');
class ProductoData{
    constructor(){        
        knex.schema.hasTable('productos').then(existsTable =>{
            if (!existsTable){
                knex.schema.createTable('productos', function(table) {
                    table.increments('id');
                    table.string('title',150).notNullable();
                    table.float('price');
                    table.string('thumbnail',300);
                }).then(() => {
                    console.log('tabla productos creada!');
                }).catch(error => {
                    console.log('error:', error);
                    throw error;
                }).finally(() => {
                    //console.log('cerrando conexion...');
                    //knex.destroy();
                });
            } 
        });
    }
    async getObjectByRow(row){
        let producto = new DTO(row['id'],row['title'],row['price'],row['thumbnail']);
        
        return producto;
    }
    async save(producto){
        try{                        
            return new Promise((resolve, reject) => {
                

                knex('productos').insert(producto).returning("id")
                        .then(x=> {
                            producto.id = x;
                            resolve(producto);
                        })
                        .catch(err => {
                            reject(err);
                        });
            })                        
            
            
            //return producto;
        }
        catch(err){
            throw new Error(`Error al insertar: ${err.message}`);
        }
    }
    async getAll(){
        let lista = new Array();
        try{
            let rows = await knex('productos').select('*');            
            for (let row of rows) {     
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
            let row  = await knex('productos').where('id', id);
            let producto = this.getObjectByRow(row[0]);            
            return producto;
        }
        catch(err){
            throw new Error(`Error al recuperar el producto [${id}]: ${err.message}`);
        }
    }
    async update(producto){
        try{
            await knex('productos').where('id',producto.id).update({
                title: producto.title,
                price: producto.price,
                thumbnail: producto.thumbnail
            });
        }
        catch(err){
            throw new Error(`Error al actualizar el producto: ${err.message}`);
        }
    }
    async delete(id){
        try{
            await knex('productos').where('id',id).del();
        }
        catch(err){
            throw new Error(`Error al actualizar el producto: ${err.message}`);
        }
    }
    
}

module.exports = ProductoData;