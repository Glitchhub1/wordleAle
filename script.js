let intentos = 6;
let diccionario = ['PERRO', 'CASCO', 'FLOTA', 'PLUMA', 'MANGO', 'SALTO', 'NIEVE', 'DOLOR', 'SUELO', 'LLAVE'];
let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

// Agregamos el event listener para el evento 'load'
window.addEventListener('load', init);

// Definimos la función init, que se ejecuta cuando la página se carga
function init() {
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
}

// Definimos la función intentar, que se ejecuta cuando el usuario presiona el botón 'Intentar'
function intentar() {
    const INTENTO = leerIntento();
    // Creamos una nueva fila para mostrar el intento
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    // Iteramos sobre cada letra de la palabra
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        // Verificamos si la letra está en la posición correcta
        if (INTENTO[i] === palabra[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851'; // Verde
        }
        // Verificamos si la letra está en la palabra pero en otra posición
        else if (palabra.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237'; // Amarillo
        }
        // Si la letra no está en la palabra
        else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4'; // Gris
        }
        setTimeout(() => {
            ROW.appendChild(SPAN);
            setTimeout(() => {
                SPAN.classList.add('visible');
            }, 50); // Añadir clase visible después de 50ms para activar la transición
        }, 200 * i);
    }

    // Agregamos la nueva fila al grid
    GRID.appendChild(ROW);
    // Verificamos si el intento coincide con la palabra
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!</h1>");
        return;
    }
    // Reducimos el número de intentos y verificamos si el usuario perdió
    intentos--;
    if (intentos == 0) {
        terminar("<h1>PERDISTE!</h1>");
    }
}

// Definimos la función leerIntento, que obtiene el valor ingresado por el usuario
function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    document.getElementById("guess-input").value= "";
    return intento;
}

// Definimos la función terminar, que muestra un mensaje y deshabilita los controles
function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    const BOTON = document.getElementById("guess-button");
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
