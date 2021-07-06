//const Archivo = require('../helpers/Archivos.js');
const chatData = require('../data/ChatData');
class Chat{
    constructor(){
        this.email="";
        this.date = new Date();
        this.message ="";
        //this.messages=[];
        //this.dataFile = new Archivo('chat.txt');
    }
    async getMessages(){  
        let data = await chatData.getAll();
        //this.messages = JSON.parse(data);
        return data;//this.messages;
    }
    async addMessage(message){                
        //this.messages.push(message);        
        await chatData.save(message);
        //await this.dataFile.save(this.messages);
    }
}
module.exports = Chat;