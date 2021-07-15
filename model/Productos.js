const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: {type:String},
    price:{type:Number},
    thumbnail:{type:String}
});

const Productos = mongoose.model("productos",schema);

module.exports = Productos;