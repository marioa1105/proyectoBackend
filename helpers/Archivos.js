const fs = require('fs');
class Archivo{
    constructor(fileName){
        this.fileName = `./${fileName}`;
    }
    async save(obj){
        try{            
            let data = JSON.stringify(obj,null,'\t');
            await fs.promises.writeFile(this.fileName, data);
        }catch(error){
            throw error;
        }
    }
    async read(){                    
        let data;
        try{            
            data = await fs.promises.readFile(this.fileName,'utf-8');
            
        }catch(error){   
                   
            data = [];
            data = JSON.stringify(data);
        }  
        
        return data;                      
    }
    async delete(){
        try{
            
            await fs.promises.unlink(this.fileName);            
            
        }catch(error){
            if(!(error.errno == -4058 && error.code == 'ENOENT'))            
                throw 'Error eliminando el archivo'
        }
    }
}

module.exports = Archivo;