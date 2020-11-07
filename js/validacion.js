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