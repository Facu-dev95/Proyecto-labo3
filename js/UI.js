let id;
let form_preguntas = document.querySelector("#preguntas");
let respuestas = document.querySelector("#respuestas");


function limpiarMain() {
    respuestas.innerHTML = ""; //Limpio pantalla de imagenes
    respuestas.classList.remove("respuestasResultados");
    respuestas.classList.add("respuestasIMG");
}

function mostrarDatos(resultado){

    for(let i=0 ; i<resultado.length; i++){

        if(resultado[i].Poster !== "N/A"){
            respuestas.innerHTML += `<img src="${resultado[i].Poster}" alt="Poster de ${resultado[i].Title}" id="${resultado[i].imdbID}">`;
        }
    }
    clickImgSelec();
}

function clickImgSelec(){
    
    let imgs = document.querySelectorAll("img");

    for(img of imgs){
        
        img.addEventListener("click", function(e){
            limpiarImgSelec();
            remarcarPeliSelec(e.target.id);
            id = e.target.id;
        });
    }
}

function limpiarImgSelec(){
    let imgs = document.querySelectorAll("img");
    for(img of imgs){
        img.className = " ";
    }
}

function remarcarPeliSelec(id){

    let img = document.querySelector(`#${id}`);
    img.className ='seleccionado';

    habilitarBtnComenzar();
}

function habilitarBtnComenzar(){
    btnComenzar.disabled = false;
    btnComenzar.classList.remove("btnComenzarDesabilitado");
    btnComenzar.classList.add("btnComenzarHabilitado");

}
//#############################################################################


function inhabilitarInputBtn(){

    btnComenzar.disabled = true;
    btnBuscar.disabled = true;
    document.querySelector("#buscar").disabled = true;//input text
    btnComenzar.classList.remove("btnComenzarHabilitado");
    btnComenzar.classList.add("btnComenzarDesabilitado");
    btnBuscar.classList.remove("btnBuscarHabilitado");
    btnBuscar.classList.add("btnBuscarDesabilitado");

}

function mostrarForm(){
    form_preguntas.classList.remove("oculto");
}

function mostrarBtnFinalizar(){
    document.querySelector("#finalizar").classList.remove("oculto");
}

function mostrarPreguntas(listado_preguntas){

    /*desordenar elementos del array */
    listado_preguntas.sort( ()=>{return Math.random() - 0.5} );

    for(preg of listado_preguntas){
        form_preguntas.innerHTML += preg;
    }

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

function habilitarBtnFinalizar(){
    document.querySelector("#finalizar").removeAttribute("disabled");
    document.querySelector("#finalizar").classList.remove("btnFinalizarDesabilitado");
    document.querySelector("#finalizar").classList.add("btnFinalizarHabilitado");
}

function mostrarTiempo(min , seg){
    let tempo = document.querySelector("#tiempo");

    tempo.innerHTML = `<h3>${min}:${seg}</h3>`;
}

function ocultarBtnFinalizar(){
    document.getElementById("finalizar").classList.add("oculto");
}

function deshabilitarBtnFinalizar(){
    document.getElementById("finalizar").setAttribute("disabled","");
    document.getElementById("finalizar").classList.remove("btnFinalizarHabilitado");
    document.getElementById("finalizar").classList.add("btnFinalizarDesabilitado");

}

function ocultarForm(){
    form_preguntas.classList.add("oculto");
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

function reiniciar(){

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