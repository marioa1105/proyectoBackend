//const Chat = require('../api/chat');
const Model = require('../model/Chat');
const mongoose = require('mongoose');
/*const {sqlite3Config} = require('./config');
const knex = require('knex')(sqlite3Config);*/
const {mongo} = require('./config');

class ChatData{
    constructor(){
        mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=> {
                console.log('Conexion exitosa chat');
            });        
    }

    async save(chat){
        try{
            await Model.create(chat); /*knex('chat').insert(chat);*/
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
            /*
            let rows = knex('chat').select('*');            
            for (let row of rows) {
                let chat = new  Chat();
                chat.email = row['email'];
                chat.date = row['date'];
                chat.message = row['message'];
                lista.push(chat);
            }*/
            return lista;
        }
        catch(err){
            throw new Error(`Error al recuperar los mensajes: ${err.message}`);
        }
        
    }
}

module.exports = new ChatData();