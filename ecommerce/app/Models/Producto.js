'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
//import { BaseModel } from '@adonisjs/lucid/src/Database'
const Model = use('Model')
const Database = use('Database')
class Producto extends Model {
    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
        
    }
    static update(edit,id){
        
        return  Database.query()
                    .from('productos')
                    .where('id', id)
                    .update({ title: edit.title, thumbnail: edit.thumbnail, price: edit.price });
    }
    static delete(id){
        
        return  Database.query()
                    .from('productos')
                    .where('id', id)
                    .delete();
    }
}

module.exports = Producto
