// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Events Listeners
eventListeners();

function eventListeners(){
    // Cuando el usuario agrega un nuevo Tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || []; // si no hay tweets, se crea un arreglo vacío

        crearHTML();
    });
}

// Funciones 

function agregarTweet(e){
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // validacion 
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacío');

        return; // evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // añadir al array de tweets
    tweets = [...tweets, tweetObj];

    // Una vez agregado vamos a crear el HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido 
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Eliminar la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los Tweets
function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0 ){
        tweets.forEach( tweet => {
            // Agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement('li');

            // añadir el texto
            li.innerText = tweet.tweet;

            // Asignar el boton
            li.appendChild(btnEliminar);

            // insertarlo en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agreaga los tweets actuales a LocalStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


// Elimina un Tweet

function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML(){
    while( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}