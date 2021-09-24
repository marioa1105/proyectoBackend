const Producto = require ('../../api/producto');
const assert = require('assert').strict;


describe("test",function(){
    let id= "";
    let total =0;
    it("Verifica agregar elementos",async function(){
        let apiProducto = new Producto(); 
        let itemNuevo = await apiProducto.saveProduct({title : "ProductoMocha",
                                price: 10,
                                thumbnail:"ImagenMocha"})
        id = itemNuevo.id;                                
        let comparacion = {
            title: itemNuevo.title,
            price: itemNuevo.price,
            thumbnail: itemNuevo.thumbnail
        }
        assert.deepEqual(comparacion , {title: "ProductoMocha", price:10, thumbnail:"ImagenMocha"});
    });

    it("Verifica que existan elementos",async function(){
        let apiProducto = new Producto();
        total = await apiProducto.getProducts().length;
        
        assert.notStrictEqual(total,0);

    });

    it("Verifica que exista el elemento agregado",async function(){
        let apiProducto = new Producto();  
        let item = await apiProducto.getProductById(id);
        assert.notStrictEqual(item,null);

    });

    it("Verifica que se elimine item agregado",function(){
        let apiProducto = new Producto();  
        console.log(total);
        assert.notStrictEqual(apiProducto.deleteProduct(id).length, total - 1 );

    });

});