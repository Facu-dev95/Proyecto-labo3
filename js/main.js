let btnBuscar = document.querySelector("#btnBuscar");
let respuestas = document.querySelector("#respuestas");
let form_preguntas = document.querySelector("#preguntas");
let btnComenzar = document.querySelector("#comenzar");
let btnFinalizar = document.getElementById("finalizar");
let infoPeli;
let pregunta;
let listado_preguntas = [];
let user_año;
let user_director;
let user_actores;
let user_fecha;
let user_duracion;


btnBuscar.addEventListener("click", () => obtenerDatos());



btnComenzar.addEventListener("click", ()=>{
    limpiarMain();
    tiempo();
    inhabilitarInputBtn();
    mostrarBtnFinalizar();
    generarPreguntas(infoPeli);

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

    let temp = setInterval(() => {

        if(seg == 0){
            min--;
            seg = 60;
        }

        seg--;


        if(min == 0 && seg == 0){
            clearInterval(temp);
            console.log("Se terminó el tiempo!!")
            recogerDatos();
            limpiarPreguntas();
            limpiarTiempo();
            /* Limpiar form */
        }else if(validarIngresos() == true){
            habilitarBtnFinalizar();
            document.getElementById("finalizar").addEventListener("click", ()=>recogerDatos(temp));

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
            <label>¿En que año se estrenó?</label>
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
        <label for="respuesta_dos">¿Cómo se llaman los actores principales?</label>
        <em>Responder con el sig formato: Gatito1, Gatito2</em>
        <input type="text" id="respuesta_dos" placeholder="Ingresar nombres">
    </div>
    `;

    return pregunta;
}

function generarPreguntaDirector(director){
    pregunta =  `
    <div id="pregunta_tres">
        <label for="respuesta_tres">¿Cómo se llama el director de la película?</label>
        <input type="text" id="respuesta_tres" placeholder="Ingresar nombre">
    </div>
    `;

    return pregunta;
}

function generarPreguntaDuracion(duracion){

    pregunta =  `
    <div id="pregunta_cuatro">
        <label for="respuesta_cuatro">¿Cúal es la duracion en minutos?</label>
        <input type="number" id="respuesta_cuatro" placeholder="Ingresar duracion en minutos" value=0>
    </div>
    `;

    return pregunta;
}

function generarPreguntaPublicacion(publicacion){
    pregunta =  `
    <div id="pregunta_cinco">
        <label for="respuesta_cinco">¿Cúal es la fecha de publicación?</label>
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

function recogerDatos(temp){
    clearInterval(temp); // parar el tiempo

    let radios = document.querySelectorAll("#preguntas > div > input[type=radio]");
    let directores = document.querySelectorAll("#preguntas > div > input#respuesta_tres");
    let actores = document.querySelectorAll("#preguntas > div > input#respuesta_dos");
    let dates = document.querySelectorAll("#preguntas > div > input[type=date]");
    let numbers = document.querySelectorAll("#preguntas > div > input[type=number]");
    

    for(radio of radios){
        if(radio.checked == true){
            user_año = radio.value;
        }
    }

    for(director of directores){
        user_director = director.value
    }

    for(actor of actores){
        user_actores = actor.value
    }

    for(date of dates){
        user_fecha = date.value
    }
    for(number of numbers){
        user_duracion = number.value
    }

    comprobarRespuestas(user_año, user_duracion, user_actores, user_fecha, user_director);

    limpiarPreguntas();
    limpiarTiempo();
    ocultarBtnFinalizar();
    deshabilitarBtnFinalizar();

    mostrarResultados();

}

function limpiarPreguntas(){
    let elementos = document.querySelectorAll("#finalizar ~ div")
    for(elemento of elementos){
        elemento.innerHTML = "";
    }
}

function limpiarTiempo(){
    let div_tiempo = document.querySelector("#tiempo");
    div_tiempo.innerHTML = "";
}

function ocultarBtnFinalizar(){
    document.getElementById("finalizar").classList.add("finalizar");
}


function deshabilitarBtnFinalizar(){
    document.getElementById("finalizar").setAttribute("disabled","");

}

function comprobarRespuestas(año, duracion, actores, publicacion, director){

    let pregunta_año = false;
    let pregunta_publicacion = false;
    let pregunta_director = false;
    let pregunta_duracion = false;
    let pregunta_actores = false;
    let array_actores_user;
    let array_actores_correcto;
    let array_publicacion_user;
    let array_publicacion_correcto;
    let respuestas_comprobadas = [];


    if(infoPeli.Year == año){
        pregunta_año = true
    }

    if(infoPeli.Director == director){
        pregunta_director = true;
    }

    if(infoPeli.Runtime == (duracion+" min")){
        pregunta_duracion = true;
    }

    array_actores_user = actores.replace(/[,]/g,"").split(" ");
    array_actores_correcto = infoPeli.Actors.replace(/[,]/g,"").split(" ");

    for(AU of array_actores_user){
        for(AC of array_actores_correcto){
            if(AU == AC){
                pregunta_actores = true;
            }
        }
    }
    /* convierto la fecha en string */
    let fecha_user = JSON.stringify(new Date(publicacion));
    /* le saco las comillas y lo divido en 2 elementos en forma de array */
    array_publicacion_user = fecha_user.replace(/["|"]/g,"").split("T");

    let fecha_correcta = JSON.stringify(new Date(infoPeli.Released));
    array_publicacion_correcto = fecha_correcta.replace(/["|"]/g,"").split("T");

    if(array_publicacion_user[0] == array_publicacion_correcto[0]){
        pregunta_publicacion = true;
    }

    respuestas_comprobadas.push(pregunta_año, pregunta_director, pregunta_duracion, pregunta_publicacion, pregunta_actores);

    let porcen = porcentejeAcierto(respuestas_comprobadas);
    mostrarResultados(respuestas_comprobadas, porcen);

}

function porcentejeAcierto(respuestas_comprobadas){

    let porcen, v=0;
    for(respuesta of respuestas_comprobadas){
        if(respuesta == true){
            v++;
        }
    }

    if(v == 0){
        porcen = 0
    }else if(v == 1){
        porcen = 20
    }else if(v == 2){
        porcen = 40
    }else if(v == 3){
        porcen = 60
    }else if(v == 4){
        porcen = 80
    }else if(v == 5){
        porcen = 100
    }

    return porcen;
}

function mostrarResultados(resp, porcen){

    

}