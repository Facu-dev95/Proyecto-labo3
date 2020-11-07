const btnBuscar = document.querySelector("#btnBuscar");
const btnComenzar = document.querySelector("#comenzar");
const btnFinalizar = document.querySelector("#finalizar");
const btnReiniciar = document.querySelector("#reiniciar");

btnBuscar.addEventListener("click", ()=>{
    limpiarMain();
    obtenerDatosDePeliBuscado().then(resultado => mostrarDatos(resultado.Search));
});

btnComenzar.addEventListener("click", ()=>{
    // el ID está sacado de una variable global del archivo UI.js
    obtenerInfoPeli(id).then(resultado => {
        limpiarMain();
        activarTiempo();
        inhabilitarInputBtn();
        mostrarForm();
        mostrarBtnFinalizar();
        generarPreguntas(resultado);
    });
});



function activarTiempo(){
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
            recogerDatos();
            limpiarPreguntas();
            limpiarTiempo();

         }else if(validarIngresos() == true){
             habilitarBtnFinalizar();
             document.getElementById("finalizar").addEventListener("click", ()=>recogerDatos(temp));
         }
    
        mostrarTiempo(min , seg);

    }, 1000);

}

btnReiniciar.addEventListener("click", ()=>reiniciar());
