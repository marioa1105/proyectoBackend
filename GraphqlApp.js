
const {buildSchema} = require('graphql');
const Producto = require('./api/producto');
var controller = new Producto();

var schema = buildSchema(`type Query{
    producto(id: Int): Producto,
    productos:[Producto]
    },
    type Mutation{
        updateProducto(id:Int, price:Float, thumbnail: String, title:String): [Producto]
    },
    type Producto{
        id: Int,
        price: Float,
        thumbnail: String,
        title: String
    }`
);

var updateProducto = function ({prod, id}){
    console.log('test');
}
var root = {
    producto: controller.getProductById,
    productos: controller.getProducts,
    updateProducto: updateProducto
};


module.exports = {
    schema: schema,
    root: root
};