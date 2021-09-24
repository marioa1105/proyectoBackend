const ProductoFactory = require("../data/factory/productoFactory");

class ProductoDTO{
    constructor(id, title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
    }
}

module.exports = ProductoDTO;