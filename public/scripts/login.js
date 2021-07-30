const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener("click",function(e){

    let userName = document.getElementById('txtLogin').value;
    fetch('/logon?userName=' + userName, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({userName: userName})
    }).then(res => {
        window.location.href = '/';
    })
},false);
