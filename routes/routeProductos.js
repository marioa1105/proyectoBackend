const express = require('express');
const route = express.Router();
const Producto = require('../api/producto')
//let objProductos = new Producto();
route.get('/',(req,res)=>{

});


route.get('/productos',(req,res)=>{
    try{
        
        let items = Producto.getProducts();
        res.json(items);

    }catch(err){
        
        res.status(404).json({error: err.message});
    }   
});

route.get('/productos/:id',(req,res)=>{
    try{
        console.log('getbydi')
        let item = Producto.getProductById(req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.post('/productos',(req,res)=>{
    try{    
          
        let item = Producto.saveProduct(req.body);
        res.redirect('../productos/vista');
        //res.render('../views/producto/productos');
        //res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.put('/productos/:id',(req,res)=>{
    try{        
        let item = Producto.updateProduct(req.body, req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.delete('/productos/:id',(req,res)=>{
    try{        
        let item = Producto.deleteProduct(req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});



module.exports =  route;