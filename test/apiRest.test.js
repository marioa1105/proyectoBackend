const Producto = require ('../api/producto');
const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;


describe("test api rest",function(){
    let id= "";
    let total =0;
    describe('POST', () => {
        it("Verifica agregar",async function(){
            let response = await request.post('/api/productos/guardar').send({title : "ProductoMocha",
            price: 10,
            thumbnail:"ImagenMocha"});
            id = response.body.id;
            console.log(id);
            expect(response.status).to.eql(200);          
        });
    });
    
    describe('GET', () => {
        it("Verificar listar",async function(){            
            let response = await request.get('/api/productos/listar');
            
            expect(response.body.length).not.eql(0);
        });
    });
    
    describe('GET', () => {
        it("Verificar listar",async function(){            
            let response = await request.get('/api/productos/listar');
            
            expect(response.status).to.eql(200);
        });
    });
});