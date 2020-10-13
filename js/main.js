/*
 
    ESTO ES PARA PELICULAS ALEATORIAS 


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

*/

let btnBuscar = document.querySelector("#btnBuscar");
let titulo;
let respuestas = document.querySelector("#respuestas");
btnBuscar.addEventListener("click", () => obtenerDatos());

function obtenerDatos(){
    let page = 0;
    respuestas.innerHTML = ""; //Limpio pantalla de imagenes
    titulo = document.querySelector("#buscar").value;

    if(titulo != ""){
        while(page < 2){
            let url = `http://www.omdbapi.com/?s=${titulo}&page=${page}&type=movie&apikey=cb4fb574`;

            fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarDatos(resultado))
            .catch(error => console.log(error))
            page++;
        }

    }else{
        alert("Ingresa una pelicula valida!!!!");
    }
    page = 0;
}

function mostrarDatos(resultado){


    for(let i=0 ; i<resultado.Search.length; i++){

        if(resultado.Search[i].Poster !== "N/A"){
            respuestas.innerHTML += `<img src="${resultado.Search[i].Poster}" alt="Poster de ${resultado.Search[i].Title}" id="${resultado.Search[i].imdbID}">`;
        }

    }
    console.log(resultado.Search);
}


    



