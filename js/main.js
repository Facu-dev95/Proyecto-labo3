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

let btnComenzar = document.querySelector("#comenzar");

let infoPeli;

btnComenzar.addEventListener("click", ()=>{
    limpiarMain();
    tiempo();
    btnComenzar.disabled = true;
    generarPreguntas(infoPeli);
})


function limpiarMain() {
    respuestas.innerHTML = ""; //Limpio pantalla de imagenes
}

function obtenerDatos(){
    let page = 0;
    limpiarMain();
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

    obtenerIdImagen();
}


function obtenerIdImagen(){
    let imgs = document.querySelectorAll("img");

    for(img of imgs){
        img.addEventListener("click", function(e){
            obtenerInfoPeli(e.target.id);
            /*Remarcar la pelicula seleccionada*/
            remarcarPeliSelec(e.target.id); 
            
        });
    }
}

function obtenerInfoPeli(id){
    
    let url = `http://www.omdbapi.com/?i=${id}&apikey=cb4fb574`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {

        infoPeli = resultado;
        /* Generar preguntas */ 
    })
    .catch(error => console.log(error))
}

function tiempo(){
    let seg = 0; 
    let min = 2; 

    let temp = setInterval(() => {
        
        if(seg == 0){
            min--;
            seg = 60;
        }

        seg--;

        if(min == 0 && seg == 0){
            clearInterval(temp);
            console.log("Se terminó el tiempo!!");
        }
        mostrarTiempo(min , seg);
    }, 1000);
    
}

function mostrarTiempo(min , seg){
    let temp = document.querySelector("#tiempo");

    temp.innerHTML = `<h3>${min}:${seg}</h3>`;
}

function remarcarPeliSelec(id){
    let img = document.querySelector(`#${id}`);
    let btnComenzar = document.querySelector("#comenzar");

    img.className ='seleccionado';
    btnComenzar.style = "display: inline";
}

function generarPreguntas(info){
    let actores = info.Actors;
    let año = info.Year;
    let publicacion = info.Released;
    let director = info.Director;
    let duracion = info.Runtime;
    console.log(`año : ${año}\npublicacion : ${publicacion}\ndirector : ${director}\nduracion : ${duracion}\nactores : ${actores}\n`);

    
    mostrarPreguntas();
}

function mostrarPreguntas(){
    console.log("MOSTRAR PREGUNTAS!!");
}

