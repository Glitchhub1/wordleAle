let intentos = 5;
let palabra = " ";

async function obtenerPalabraAleatoria() {
    const url = "https://random-word-api.herokuapp.com/word?length=5&lang=es";
    const response = await fetch(url);
    const data = await response.json();
    eliminartilde= data[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return eliminartilde.toUpperCase();
}
window.addEventListener("load", async () => {
    palabra = await obtenerPalabraAleatoria();
    console.log("Palabra secreta:", palabra);
    init();
});

function init() {
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
}


function intentar() {
    const INTENTO = leerIntento();
    // Creamos una nueva fila para mostrar el intento
    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";


    for (let i in palabra) {
        const SPAN = document.createElement("span");
        SPAN.className = "letter";


        if (INTENTO[i] === palabra[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#00ff00"; // Verde
        }

        else if (palabra.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#fff500"; // Amarillo
        }
        // Si la letra no está en la palabra
        else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#616161"; // Gris
        }
        setTimeout(() => {
            ROW.appendChild(SPAN);
            setTimeout(() => {
                SPAN.classList.add("visible");
            }, 50); // Añadir clase visible después de 50ms para activar la transición
        }, 200 * i);
    }


    GRID.appendChild(ROW);

    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!</h1>");
        return;
    }

    intentos--;
    if (intentos == 0) {
        terminar("<h1>¡PERDEDOR!</h1>");
    }
}


function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    document.getElementById("guess-input").value = "";
    return intento;
}
function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    const BOTON = document.getElementById("guess-button");
    BOTON.disabled = false;
    BOTON.textContent = "Jugar de nuevo";
    BOTON.removeEventListener("click", reloadPage);

    BOTON.addEventListener("click", function() {
        location.reload(); 
    });
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
}
function reloadPage() {
    location.reload(); // Recargar la página al hacer clic en "Reintentar"
} 

