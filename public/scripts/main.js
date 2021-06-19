const socket = io.connect();
const btnEnviarMensaje = document.getElementById('btnEnviarMensaje');
const btnEnviar = document.getElementById('btnEnviar');
socket.on('msgProductos', data => {    
    llenarTabla(data);
});

socket.on('sendMessage', data => {    
    getMessages(data);
});

btnEnviarMensaje.addEventListener('click',function(event){
    let message = {
        email: document.getElementById('txtEmail').value,
        date: new Date(),
        message: document.getElementById('txtMensaje').value
    };
    document.getElementById('txtMensaje').value = '';
    socket.emit('sendMessage', message);
},false);

btnEnviar.addEventListener("click",function(e){
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

function getMessages(messages){
    if (messages.length == 0)
        return;

    let data = messages.map(x => {
        return {
            email: x.email,
            date: new Date(x.date).toLocaleString(),
            message: x.message
        }
    });
    let htmlTemplate = 
    `<ul style="list-style: none">
        {{#each messages}}
            <li> 
                
                <span style='color:blue'>{{this.email}}</span> 
                <span style='color:red'>[{{this.date}}]: </span> 
                <span style='color:green'>{{this.message}}</span> 
            </li>
        {{/each}}
    </ul>`;
        
    let template = Handlebars.compile(htmlTemplate);
    let html = template({'messages': data});
    console.log(html);
    document.getElementById('messages').innerHTML = html;
}