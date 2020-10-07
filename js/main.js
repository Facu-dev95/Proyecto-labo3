const titulo = 'hacker';
const pagina = 2

const url = `http://www.omdbapi.com/?s=${titulo}&pagina${pagina}&i=tt3896198&apikey=cb4fb574`;

fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => console.log(resultado))