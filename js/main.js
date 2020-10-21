let btnBuscar = document.querySelector("#btnBuscar");
let respuestas = document.querySelector("#respuestas");
let form_preguntas = document.querySelector("#preguntas");
let btnComenzar = document.querySelector("#comenzar");
let btnFinalizar = document.querySelector("#finalizar");
let temp;
let infoPeli;
let pregunta;
let listado_preguntas = [];


btnBuscar.addEventListener("click", () => obtenerDatos());


btnComenzar.addEventListener("click", ()=>{
    limpiarMain();
    tiempo();
    inhabilitarInputBtn();
    mostrarBtnFinalizar();
    generarPreguntas(infoPeli);
})


btnFinalizar.addEventListener("click", ()=>{
    console.log("hola");
})

function limpiarMain() {
    respuestas.innerHTML = ""; //Limpio pantalla de imagenes
}

function obtenerDatos(){
    let page = 0;
    limpiarMain();
    let titulo = document.querySelector("#buscar").value;

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
            limpiarImgSelec();
            /*Remarcar la pelicula seleccionada*/
            remarcarPeliSelec(e.target.id); 
            
        });
    }
}

function limpiarImgSelec(){
    let imgs = document.querySelectorAll("img");
    for(img of imgs){
        img.className = " ";
    }
}

function obtenerInfoPeli(id){
    
    let url = `http://www.omdbapi.com/?i=${id}&apikey=cb4fb574`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {

        infoPeli = resultado;
        /* Generar form_preguntas */ 
    })
    .catch(error => console.log(error))
}

function tiempo(){
    let seg = 0; 
    let min = 2; 

    temp = setInterval(() => {

        let boleano =validarIngresos();
        if(boleano === true){
            habilitarBtnFinalizar();
        }
        
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
    let tempo = document.querySelector("#tiempo");

    tempo.innerHTML = `<h3>${min}:${seg}</h3>`;
}

function remarcarPeliSelec(id){
    let img = document.querySelector(`#${id}`);

    img.className ='seleccionado';
}
function inhabilitarInputBtn(){

    btnComenzar.disabled = true;
    btnBuscar.disabled = true;
    document.querySelector("#buscar").disabled = true;//input text
}

function generarPreguntas(info){
    let actores = info.Actors;
    let año = info.Year;
    let publicacion = info.Released;
    let director = info.Director;
    let duracion = info.Runtime;

    listado_preguntas[0] = generarPreguntaAño(año);
    listado_preguntas[1] = generarPreguntaActores(actores);
    listado_preguntas[2] = generarPreguntaDirector(director);
    listado_preguntas[3] = generarPreguntaDuracion(duracion);
    listado_preguntas[4] = generarPreguntaPublicacion(publicacion);
    
    console.log(`año : ${año}\npublicacion : ${publicacion}\ndirector : ${director}\nduracion : ${duracion}\nactores : ${actores}\n`);

    
    mostrarPreguntas(listado_preguntas);
}

function generarPreguntaAño(año){
    
    let radiobutons = [];

    for(let i=0; i<4 ; i++){
        let num = parseInt(Math.random() * (10 - 1) + 1) + parseInt(año);

        if(i == 2){
            pregunta = `<input type='radio' id='myradio_${i}' name='radiobutton' value='${año}'/><label for="myradio_${i}">${año}</label>`;    
        }else{
            pregunta = `<input type='radio' id='myradio_${i}' name='radiobutton' value='${num}' /><label for="myradio_${i}">${num}</label>`;
        }
        radiobutons.push(pregunta);
    }
    /*desordenar elementos del array */
    radiobutons.sort( ()=>{return Math.random() - 0.5} );

    pregunta =  `
        <div id="pregunta_uno">
            <p>¿En que año se estrenó?</p>
            ${radiobutons[0]}
            ${radiobutons[1]}
            ${radiobutons[2]}
            ${radiobutons[3]}
        </div>
    `;
    return pregunta;
}

function generarPreguntaActores(actores){
    pregunta =  `
    <div id="pregunta_dos">
        <p>¿Cómo se llaman los actores principales?</p>
        <em>Responder con el sig formato: gatito1, gatito2</em>
        <input type="text" id="respuesta_dos" placeholder="Ingresar nombres">
    </div>
    `;

    return pregunta;
}

function generarPreguntaDirector(director){
    pregunta =  `
    <div id="pregunta_tres">
        <p>¿Cómo se llama el director de la película?</p>
        <input type="text" id="respuesta_tres" placeholder="Ingresar nombre">
    </div>
    `;

    return pregunta;
}

function generarPreguntaDuracion(duracion){

    pregunta =  `
    <div id="pregunta_cuatro">
        <p>¿Cúal es la duracion en minutos?</p>
        <input type="number" id="respuesta_cuatro" placeholder="Ingresar duracion en minutos" value=0>
    </div>
    `;

    return pregunta;
}

function generarPreguntaPublicacion(publicacion){
    pregunta =  `
    <div id="pregunta_cinco">
        <p>¿Cúal es la fecha de publicación?</p>
        <input type="date" id="respuesta_cinco" placeholder="Ingresar fecha de publicacion" value="2017-06-01">
    </div>
    `;

    return pregunta;
}

function mostrarPreguntas(listado_preguntas){

    /*desordenar elementos del array */
    listado_preguntas.sort( ()=>{return Math.random() - 0.5} );

    for(preg of listado_preguntas){
        form_preguntas.innerHTML += preg;
    }
}

function mostrarBtnFinalizar(){
    btnFinalizar.classList.remove("finalizar");
}

function habilitarBtnFinalizar(){
    document.querySelector("#finalizar").removeAttribute("disabled");

}

function validarIngresos(){
    let validacion = false
    let cont = 0;
    let radios = document.querySelectorAll("#preguntas > div > input[type=radio]");
    let texts = document.querySelectorAll("#preguntas > div > input[type=text]");
    let dates = document.querySelectorAll("#preguntas > div > input[type=date]");
    let numbers = document.querySelectorAll("#preguntas > div > input[type=number]");

    for(radio of radios){
        if(radio.checked == true){
            
            cont++;
        }
    }

    for(text of texts){
        if(text.value != ""){
            cont++;
        }
    }

    for(number of numbers){
        if(number.value != 0){
            cont++;
        }
    }

    for(date of dates){
        if(date.value != "2017-06-01"){
            cont++;
        }
    }

    if(cont >= 5){
        validacion = true;
    }
    return validacion;
}


