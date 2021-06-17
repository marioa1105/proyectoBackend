const socket = io.connect();

socket.on('msgProductos', data => {    
    llenarTabla(data);
});

document.getElementById('btnEnviar').addEventListener("click",function(e){
    e.preventDefault();
    
    const data = { title: document.getElementById('title').value, 
                    price: document.getElementById('price').value, 
                    thumbnail: document.getElementById('thumbnail').value };
    console.log(data);
    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => console.log(respuesta.json()))
    .then(productos => {
        document.querySelector('form').reset();
        socket.emit('updateProd', 'ok');
    })
    .catch(error => {
        console.log('ERROR', error);
    });
    
},false);




function llenarTabla(productos){
    let htmlTemplate = 
    `{{#if hayProductos}} 
        <div class="table-responsive">
            <table class="table table-dark">
                <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr>
                {{#each productos}}
                    <tr> 
                        <td>{{this.title}}</td> 
                        <td>$ {{this.price}}</td> 
                        <td><img width="50" src={{this.thumbnail}} alt="not found"></td> 
                    </tr>
                {{/each}}
            </table>
        </div>
    {{else}}  
        <h3 class="alert alert-warning">No se encontraron productos</h3>
    {{/if}}`;
    
    let hayProductos = productos.length == 0 ?false:true;
    

    let template = Handlebars.compile(htmlTemplate);
    let html = template({'hayProductos': hayProductos, 'productos': productos});
    
    document.getElementById('divTblProductos').innerHTML = html;
}