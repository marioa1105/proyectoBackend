const Archivo = require('../helpers/Archivos.js');
class Chat{
    constructor(){
        this.email="";
        this.date = new Date();
        this.message ="";
        this.messages=[];
        this.dataFile = new Archivo('chat.txt');
    }
    async getMessages(){  
        let data = await this.dataFile.read()      
        this.messages = JSON.parse(data);
        return this.messages;
    }
    async addMessage(message){                
        this.messages.push(message);        
        await this.dataFile.save(this.messages);
    }
}
module.exports = Chat;