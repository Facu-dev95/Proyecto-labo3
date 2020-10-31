let btnBuscar = document.querySelector("#btnBuscar");
let respuestas = document.querySelector("#respuestas");
let form_preguntas = document.querySelector("#preguntas");
let btnComenzar = document.querySelector("#comenzar");
let btnFinalizar = document.getElementById("finalizar");
let btnReiniciar = document.querySelector("#reiniciar");
let infoPeli;
let pregunta;
let listado_preguntas = [];
let c = 0;

btnBuscar.addEventListener("click", () => obtenerDatos());

btnComenzar.addEventListener("click", ()=>{
    limpiarMain();
    tiempo();
    inhabilitarInputBtn();
    mostrarForm();
    mostrarBtnFinalizar();
    generarPreguntas(infoPeli);

})


function limpiarMain() {
    respuestas.innerHTML = ""; //Limpio pantalla de imagenes
    respuestas.classList.remove("respuestasResultados");
    respuestas.classList.add("respuestasIMG");
}
function obtenerDatos(){
    let page = 1;
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
    page = 1;
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

    habilitarBtnComenzar();
}
function inhabilitarInputBtn(){

    btnComenzar.disabled = true;
    btnBuscar.disabled = true;
    document.querySelector("#buscar").disabled = true;//input text
    btnComenzar.classList.remove("btnComenzarHabilitado");
    btnComenzar.classList.add("btnComenzarDesabilitado");
    btnBuscar.classList.remove("btnBuscarHabilitado");
    btnBuscar.classList.add("btnBuscarDesabilitado");

}

function habilitarBtnComenzar(){
    btnComenzar.disabled = false;
    btnComenzar.classList.remove("btnComenzarDesabilitado");
    btnComenzar.classList.add("btnComenzarHabilitado");

}

function desabilitarBtnComenzar(){
    btnComenzar.disabled = true;
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
            <label class="preg">¿En que año se estrenó?</label>
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
        <label for="respuesta_dos" class="preg">¿Cómo se llaman los actores principales?<em> Responder con el sig formato: Gatito1, Gatito2</em></label>
        
        <input type="text" id="respuesta_dos" placeholder="Ingresar nombres">
    </div>
    `;

    return pregunta;
}

function generarPreguntaDirector(director){
    pregunta =  `
    <div id="pregunta_tres">
        <label for="respuesta_tres" class="preg">¿Cómo se llama el director de la película?</label>
        <input type="text" id="respuesta_tres" placeholder="Ingresar nombre">
    </div>
    `;

    return pregunta;
}

function generarPreguntaDuracion(duracion){

    pregunta =  `
    <div id="pregunta_cuatro">
        <label for="respuesta_cuatro" class="preg">¿Cúal es la duración en minutos?</label>
        <input type="number" id="respuesta_cuatro" placeholder="Ingresar duracion en minutos" value=0>
    </div>
    `;

    return pregunta;
}

function generarPreguntaPublicacion(publicacion){
    pregunta =  `
    <div id="pregunta_cinco">
        <label for="respuesta_cinco" class="preg">¿Cúal es la fecha de publicación?</label>
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
    document.querySelector("#finalizar").classList.remove("oculto");
}


function habilitarBtnFinalizar(){
    document.querySelector("#finalizar").removeAttribute("disabled");
    document.querySelector("#finalizar").classList.remove("btnFinalizarDesabilitado");
    document.querySelector("#finalizar").classList.add("btnFinalizarHabilitado");
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
    let user_año;
    let user_director;
    let user_actores;
    let user_fecha;
    let user_duracion;

    if (c < 1){

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
        habilitarMostrarBtnReiniciar();
        ocultarForm();
    }
    c++;

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
    document.getElementById("finalizar").classList.add("oculto");
}

function mostrarForm(){
    form_preguntas.classList.remove("oculto");
}

function ocultarForm(){
    form_preguntas.classList.add("oculto");
}

function deshabilitarBtnFinalizar(){
    document.getElementById("finalizar").setAttribute("disabled","");
    document.getElementById("finalizar").classList.remove("btnFinalizarHabilitado");
    document.getElementById("finalizar").classList.add("btnFinalizarDesabilitado");

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

    respuestas.classList.remove("respuestasIMG");
    respuestas.classList.add("respuestasResultados");

    let mostrar = `
    <h4>${porcen}% preguntas respondidas correctamente</h4>
    <div id="preg">
        <p>¿En que año se estrenó?</p><em>${infoPeli.Year}</em>
        <p>¿Cómo se llama el director de la película?</p><em>${infoPeli.Director}</em>
        <p>¿Cúal es la duración en minutos?</p><em>${infoPeli.Runtime}</em>
        <p>¿Cúal es la fecha de publicación?</p><em>${infoPeli.Released}</em>
        <p>¿Cómo se llaman los actores principales?</p><em>${infoPeli.Actors}</em>
    </div>
    `
    let nuevo_intento = `<h2>Resultado:</h2><h3>Vuelve a intentarlo</h3>`;
    let bien = `<h2>Resultado:</h2><h3>Bien!</h3>`;
    let muyBien = `<h2>Resultado:</h2><h3>Muy Bien!!</h3>`;
    let excelente = `<h2>Resultado:</h2><h3>Excelente!!</h3>`;

    if(porcen > 80){
        respuestas.innerHTML = excelente + mostrar;
    } else if(porcen > 40){
        respuestas.innerHTML = muyBien + mostrar;
    }else if(porcen > 0){
        respuestas.innerHTML = bien + mostrar;
    }else{
        respuestas.innerHTML = nuevo_intento + mostrar;
    }

    let preg = document.querySelectorAll("#preg > p");
    
    for(let i =0; i<resp.length; i++){
        if(resp[i] == true){
            preg[i].innerHTML += `<div class="correcto"></div>`;
        }else{
            preg[i].innerHTML += `<div class="incorrecto"></div>`;
        }
    }

}

function habilitarMostrarBtnReiniciar(){

    btnReiniciar.classList.remove("oculto");
    btnReiniciar.removeAttribute("disabled");
    btnReiniciar.classList.add("btnReiniciarHabilitado");
}

btnReiniciar.addEventListener('click', limpiar);

function limpiar(){

    btnReiniciar.classList.add("oculto");
    btnReiniciar.setAttribute("disabled","");
    document.querySelector("#buscar").value = "";
    limpiarMain();
    limpiarTiempo();
    btnBuscar.disabled = false;
    btnBuscar.classList.remove("btnBuscarDesabilitado");
    btnBuscar.classList.add("btnBuscarHabilitado");
    document.querySelector("#buscar").disabled = false;
    c=0;

}