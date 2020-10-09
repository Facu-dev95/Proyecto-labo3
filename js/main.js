let num;
var data = [];
var data2;
var cont = 0;
const max = 1999999;
const min = 1000000;


for(i=0; i<10; i++){

    var cont2;

    num = parseInt(Math.random() * (max - min) + min);
    console.log(num);

    let url = `http://www.omdbapi.com/?i=tt${num}&apikey=cb4fb574`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {

        if(resultado.Type == "movie"){
            data.push(resultado);
            cont++;
            return cont;
        }
        recogerDatos(data)
    })

}


function recogerDatos(datos){
    data2 = datos;
    return data2;
}
