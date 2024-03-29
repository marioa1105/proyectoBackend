const btnLogin = document.getElementById('btnLogin');
const btnRegistrar = document.getElementById('btnRegistrar');
btnLogin.addEventListener("click",function(e){

    let userName = document.getElementById('txtUsername').value;
    let password = document.getElementById('txtPassword').value;
    fetch('/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username: userName, password: password})
    }).then(res => {
        
        window.location.href = res.url;
    })
},false);

btnRegistrar.addEventListener('click',function(e){
    window.location.href = '/signup';
},false);
