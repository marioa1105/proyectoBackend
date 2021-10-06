
const {buildSchema} = require('graphql');
const Producto = require('../api/producto');
var controller = new Producto();

var schema = buildSchema(`type Query{
    producto(id: String): Producto,
    productos:[Producto]
    },
    type Mutation{
        updateProducto(id:String, price:Float, thumbnail: String, title:String): [Producto],
        guardarProducto(id:String, price:Float, thumbnail: String, title:String): Producto,
        eliminarProducto(id:String): [Producto]
    },
    type Producto{
        id: String,
        price: Float,
        thumbnail: String,
        title: String
    }`
);

var updateProducto = function ({id, price,thumbnail, title}){
     controller.updateProduct({id: id,
        title: title,
        price: price,
        thumbnail: thumbnail},id);
}
var guardarProducto = async function ({price,thumbnail, title}){

    let producto = await controller.saveProduct({
        title: title,
        price: price,
        thumbnail: thumbnail
    });

    return producto;
}
var eliminarProducto = async function eliminarProducto(id){
    let productos = await controller.deleteProduct(id);
    return productos;
}
var root = {
    producto: controller.getProductById,
    productos: controller.getProducts,
    updateProducto: updateProducto,
    guardarProducto: guardarProducto,
    eliminarProducto: eliminarProducto
};


module.exports = {
    schema: schema,
    root: root
};