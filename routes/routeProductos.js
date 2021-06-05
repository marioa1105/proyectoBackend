const express = require('express');
const route = express.Router();
const Producto = require('../api/producto')
let objProductos = new Producto();
route.get('/',(req,res)=>{

});

route.get('/productos',(req,res)=>{
    try{
        let items = objProductos.getProducts();
        res.json(items);

    }catch(err){
        
        res.status(404).json({error: err.message});
    }   
});

route.get('/productos/:id',(req,res)=>{
    try{
        let item = objProductos.getProductById(req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.post('/productos',(req,res)=>{
    try{    
        console.log(`graba producto`);    
        let item = objProductos.saveProduct(req.body);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.put('/productos/:id',(req,res)=>{
    try{        
        let item = objProductos.updateProduct(req.body, req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.delete('/productos/:id',(req,res)=>{
    try{        
        let item = objProductos.deleteProduct(req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

module.exports = route;