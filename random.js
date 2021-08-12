process.on('message', cant => {
    let numeros = [] ;
    for (let index = 0; index < cant; index++) {
        let random = getRandom(0,1000);
        if (numeros[random] == undefined)
        {
            numeros[random] = 1
        }else{
            numeros[random]++;
        }        
    }
    process.send(numeros);
});

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min,2)
}