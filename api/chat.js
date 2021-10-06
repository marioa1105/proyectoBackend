//const Archivo = require('../helpers/Archivos.js');
const Factory = require('../DAO/factory/ChatFactory');
const chatData = Factory.getFactory('mongo');

const { normalize, schema } = require('normalizr');
class Author{
    constructor(){
        this.id;
        this.nombre;
        this.apellido;
        this.edad;
        this.alias;
        this.avatar;
        this.date;
    }

}
class Chat{
    constructor(){
        //this.email="";
        //this.date = new Date();
        this.text ="";
        this.author = new Author();
        //this.messages=[];
        //this.dataFile = new Archivo('chat.txt');
    }
    async getMessages(){  
        let data = await chatData.getAll();
        let messagesDto = {
            id: 1000,
            messages: data
        };
        
        const schemaAuthor = new schema.Entity('author',{},{idAttribute: 'email'});
        const schemaMessage = new schema.Entity('message', 
                            {
                                author: schemaAuthor
                            });
        
        const schemaMessages = new schema.Entity('messages', {
            message: [schemaMessage]
        });
        const messageNorm = normalize(messagesDto,schemaMessages);
       
        return messageNorm;//this.messages;
    }
    async addMessage(message){                
        //this.messages.push(message);        
        await chatData.save(message);
        //await this.dataFile.save(this.messages);
    }
}
module.exports = Chat;