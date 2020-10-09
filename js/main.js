let num;
var data = [];
var data2;
var cont = 0;
const max = 1999999;
const min = 1000000;


for(i=0; i<2; i++){

    num = parseInt(Math.random() * (max - min) + min);
    console.log(num);

    let url = `http://www.omdbapi.com/?i=tt${num}&apikey=cb4fb574`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {

        if(resultado.Type == "movie" && resultado.Poster !== "N/A"){
            data.push(resultado);
        }
        
    })
    .catch(error => console.log(error))

    console.log(data);
}

