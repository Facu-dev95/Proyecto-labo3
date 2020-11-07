let c = 0; //Contador global para no llamar mas de una vez a la funcion recogerDatos en el SetInterval.

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
        ocultarForm();
        habilitarMostrarBtnReiniciar();
    }
    c++;

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
    /* le saco las comillas y lo divido en 2 elementos de array */
    array_publicacion_user = fecha_user.replace(/["|"]/g,"").split("T");

    let fecha_correcta = JSON.stringify(new Date(infoPeli.Released));
    array_publicacion_correcto = fecha_correcta.replace(/["|"]/g,"").split("T");

    if(array_publicacion_user[0] == array_publicacion_correcto[0]){
        pregunta_publicacion = true;
    }

    respuestas_comprobadas.push(pregunta_año, pregunta_director, pregunta_duracion, pregunta_publicacion, pregunta_actores);
    let porcen = porcentejeAcierto(respuestas_comprobadas);

    /* Se muestra los resultados */
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
