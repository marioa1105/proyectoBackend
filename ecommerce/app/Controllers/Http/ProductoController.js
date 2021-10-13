'use strict'
const Producto = use('App/Models/Producto');
class ProductoController {
    async listar({request, response}){
        return await Producto.all();
    }
    
    async guardar({request}){
        
        return await Producto.create(request.body);
    }
    async buscarPorId({request, response}){
        
        return await Producto.findBy("id",request.params.id);
    }
    async actualizar({request, response}){
        return await Producto.update(request.body, request.params.id);
    }
    async eliminar({request, response}){
        return await Producto.delete(request.params.id);
    }
}

module.exports = ProductoController
