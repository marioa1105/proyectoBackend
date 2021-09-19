const Producto = require('../api/producto');
const mongoose = require('mongoose');
const Model = require('../model/Productos');
const {mongo} = require('./config');
const {ObjectId} = require('mongodb');

/*const {mySqlConfig} = require('./config');
const knex = require('knex')(mySqlConfig);*/

class ProductoData{
    constructor(){
        mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=> {
                console.log('Conexion exitosa');
            });
        /*knex.schema.hasTable('productos').then(existsTable =>{
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
        });*/
    }
    async getObjectByRow(row){
        let producto = {
            title: row['title'],
            id: row['id'],
            price: row['price'],
            thumbnail: row['thumbnail']
        };
        return producto;
    }
    async save(producto){
        try{                        
            await Model.create(producto);
            /*await knex('productos').insert(producto);*/
            return true;
        }
        catch(err){
            throw new Error(`Error al insertar: ${err.message}`);
        }
    }
    async getAll(){
        let lista = new Array();
        try{
            lista = await Model.find({});
            /*let rows = await knex('productos').select('*');            
            for (let row of rows) {     
                let item = await this.getObjectByRow(row)           
                lista.push(item);
            }*/
            return lista;
        }
        catch(err){
            throw new Error(`Error al recuperar los productos: ${err.message}`);
        }        
    }
    async getById(id){
        try{
            let _Id = ObjectId(id);
            let producto = await Model.findOne({_id: _Id.id});
            /*let row  = await knex('productos').where('id', id);
            let producto = this.getObjectByRow(row[0]);*/
            return producto;
        }
        catch(err){
            throw new Error(`Error al recuperar el producto [${id}]: ${err.message}`);
        }
    }
    async update(producto){
        try{
            await Model.updateOne({_id:producto.id},
                                    {title: producto.title,
                                    price: producto.price,
                                    thumbnail: producto.thumbnail});
            /*await knex('productos').where('id',producto.id).update({
                title: producto.title,
                price: producto.price,
                thumbnail: producto.thumbnail
            });*/
        }
        catch(err){
            throw new Error(`Error al actualizar el producto: ${err.message}`);
        }
    }
    async delete(id){
        try{
            let _Id = ObjectId(id);
            await Model.deleteOne({_id: _Id.id});
            //await knex('productos').where('id',id).del();
        }
        catch(err){
            throw new Error(`Error al actualizar el producto: ${err.message}`);
        }
    }
    
}

module.exports = ProductoData;