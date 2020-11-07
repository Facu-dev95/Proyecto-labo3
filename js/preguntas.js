let listado_preguntas = [];
let pregunta;
let infoPeli; 

function generarPreguntas(info){
    infoPeli = info;
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