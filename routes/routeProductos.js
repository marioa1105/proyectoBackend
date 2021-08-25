const express = require('express');
const route = express.Router();
const Producto = require('../api/producto')
let serviceProducto = new Producto();
route.get('/',(req,res)=>{

});


route.get('/productos/listar',(req,res)=>{
    try{
        
        serviceProducto.getProducts().then(items => {res.json(items);});
        

    }catch(err){
        
        res.status(404).json({error: err.message});
    }   
});

route.get('/productos/listar/:id',(req,res)=>{
    try{
        
        serviceProducto.getProductById(req.params.id)
            .then(item => {res.json(item);})
            .catch(err => {res.status(404).json({error: err.message})} );
        

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.post('/productos/guardar',(req,res)=>{
    try{    
        
        item = serviceProducto.saveProduct(req.body);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
}); 

route.put('/productos/actualizar/:id',(req,res)=>{
    try{        
        serviceProducto.updateProduct(req.body, req.params.id).then(item => res.json(item));
        

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.delete('/productos/borrar/:id',(req,res)=>{
    try{        
        serviceProducto.deleteProduct(req.params.id).then(item => res.json(item));        

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

module.exports =  route;