// inicializo todo lo necesario...
var contadorDeRespuestas = 0;

// me aseguro que esté seleccionado el campo de texto
// para que cuando entres a la página puedas escribir
// sin tener que hacer click en el campo de texto
document.getElementById('chatbox-input').focus();

// escucho a ver si alguien le hace una pregunta a coots haciendo click...
var boton = document.getElementById('boton-submit');
boton.addEventListener('click', preguntarACoots);

// escucho a ver si alguien le hace una pregunta a coots tocando ENTER en el teclado...
var input = document.getElementById('chatbox-input');
input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        preguntarACoots();
    }
});

function preguntarACoots() {
    asegurarQueNoEstaElTextoInicial();
    agregarMensaje();
    scrollHastaAbajo();
    limpiarChatbox();
    setTimeout(cootsResponde, 500);
}

function asegurarQueNoEstaElTextoInicial() {
    var textoInicial = document.getElementById('acerca-de');
    textoInicial.classList.add('oculto');
}

function agregarMensaje() {
    var mensajeNuevo = document.createElement('div');
    mensajeNuevo.setAttribute('class', 'mensaje mensaje-usuario');

    var imagenUsuario = document.createElement('div');
    imagenUsuario.setAttribute('class', 'imagen imagen-usuario');
    mensajeNuevo.appendChild(imagenUsuario);

    var mensajeUsuario = document.createElement('p');
    mensajeUsuario.setAttribute('class', 'texto-mensaje');
    mensajeNuevo.appendChild(mensajeUsuario);
    var message = document.getElementById('chatbox-input').value;
    mensajeUsuario.textContent = message;

    var chat = document.getElementById('historial-del-chat');
    chat.appendChild(mensajeNuevo);
}

function limpiarChatbox() {
    var chatbox = document.getElementById('chatbox-input');
    chatbox.value = '';
}

function armarMiaus() {
    var meows = Math.floor(Math.random() * 10) + 1;
    var mensaje = miauDeCoots;
    for (var i = 1; i < meows; i++) {
        mensaje += ' ' + miauDeCoots;
    }
    mensaje += '. ';
    mensaje += mensajeFinalDeCoots;
    return mensaje;
}

function animarMiaus() {
    var meows = armarMiaus();
    var chat = document.getElementById('historial-del-chat');

    var mensajeNuevo = document.createElement('div');
    mensajeNuevo.setAttribute('class', 'mensaje mensaje-coots');

    var imagenCoots = document.createElement('div');
    imagenCoots.setAttribute('class', 'imagen imagen-coots');
    mensajeNuevo.appendChild(imagenCoots);

    var mensajeCoots = document.createElement('p');
    mensajeCoots.setAttribute('class', 'texto-mensaje');
    mensajeNuevo.appendChild(mensajeCoots);


    var i = 0;
    var interval = setInterval(function () {
        mensajeCoots.textContent += meows[i];
        i++;
        if (i >= meows.length) {
            clearInterval(interval);
        }
    }, 30);


    var tweetMensajeNuevo = document.createElement('div');
    tweetMensajeNuevo.setAttribute('class', 'tweet-mensaje-coots oculto');
    tweetNuevo = formarTweet();
    tweetMensajeNuevo.appendChild(tweetNuevo);
    chat.appendChild(mensajeNuevo);
    chat.appendChild(tweetMensajeNuevo);
}

function elegirTweet() {
    var tweet = tweets[Math.floor(Math.random() * tweets.length)];
    return tweet.url;
}

function formarTweet() {
    tweetElegido = elegirTweet();
    console.log(tweetElegido);
    var tweetCoots = document.createElement('div');
    tweetCoots.setAttribute('id', 'tweet-' + contadorDeRespuestas.toString());
    tweetCoots.setAttribute('tweetID', tweetElegido);
    tweetCoots.setAttribute('class', 'containerTweetDeCoots');
    return tweetCoots;
}

function mostrarTweetsOcultos() {
    var tweetsOcultos = document.getElementsByClassName('tweet-mensaje-coots');
    for (var i = 0; i < tweetsOcultos.length; i++) {
        tweetsOcultos[i].classList.remove('oculto');
    }
    setTimeout(scrollHastaAbajo, 1000);
}

function cootsResponde() {
    animarMiaus();
    cargarTweet(contadorDeRespuestas);
    scrollHastaAbajo();
    setTimeout(mostrarTweetsOcultos, 1500);
    contadorDeRespuestas++;
}

function scrollHastaAbajo() {
    var chatHistorial = document.getElementById('historial-del-chat');
    chatHistorial.scrollTop = chatHistorial.scrollHeight;
}

// Basado en el código mostrado acá https://www.labnol.org/code/19933-embed-tweet-with-javascript by Amit Agarwal amit@labnol.org
function cargarTweet(numeroDeTweet) {
    var tweet = document.getElementById('tweet-' + numeroDeTweet.toString());
    var id = tweet.getAttribute('tweetID');

    twttr.widgets
        .createTweet(id, tweet, {
            conversation: 'none', // or all
            cards: 'visible', // or visible
            linkColor: '#cc0000', // default is blue
            theme: 'dark', // or dark
        });
};