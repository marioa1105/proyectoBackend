const btnLogin = document.getElementById('btnLogin');
const btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.addEventListener("click",function(e){

    let userName = document.getElementById('txtUsername').value;
    let password = document.getElementById('txtPassword').value;
    fetch('/signup', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username: userName, password: password})
    }).then(res => {
        if(res.status != 400)
            alert('Se genero el usuario');
        window.location.href = res.url;
    })
},false);

btnLogin.addEventListener('click',function(e){
    window.location.href = '/login';
},false);