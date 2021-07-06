const Chat = require('../api/chat');
const {sqlite3Config} = require('./config');
const knex = require('knex')(sqlite3Config);

class ChatData{
    constructor(){
        knex.schema.hasTable('chat').then(existsTable =>{
            if (!existsTable){
                knex.schema.createTable('chat', function(table) {
                    table.increments('id');
                    table.string('email',150).notNullable();
                    table.datetime('date');
                    table.string('message');
                }).then(() => {
                    console.log('tabla chat creada!');
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

    async save(chat){
        try{
            await knex('chat').insert(chat);
            return true;
        }
        catch(err){
            throw new Error(`Error al insertar: ${err.message}`);
        }
        
    }
    async getAll(){
        let lista = new Array();
        try{
            let rows = await knex('chat').select('*');            
            for (let row of rows) {
                let chat = new  Chat();
                chat.email = row['email'];
                chat.date = row['date'];
                chat.message = row['message'];
                lista.push(chat);
            }
            return lista;
        }
        catch(err){
            throw new Error(`Error al recuperar los mensajes: ${err.message}`);
        }
        
    }
}

module.exports = new ChatData();