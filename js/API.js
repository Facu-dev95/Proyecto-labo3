async function obtenerDatosDePeliBuscado() {

    let titulo = document.querySelector("#buscar").value;

    if(titulo != ""){
        
        let url = `http://www.omdbapi.com/?s=${titulo}&page=1&type=movie&apikey=cb4fb574`;

        try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            return resultado;
            
        } catch (error) {
            console.log(error);
        }

    }else{
        alert("Ingresa una pelicula valida!!!!");
    }
}

async function obtenerInfoPeli(id){
    
    let url = `http://www.omdbapi.com/?i=${id}&apikey=cb4fb574`;

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        return resultado;
        
    } catch (error) {
        console.log(error);
    }
}