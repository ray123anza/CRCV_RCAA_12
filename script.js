
const targetDate = new Date("2026-10-31T00:00:00");

/* =========================================
   ELEMENTOS HTML
   ========================================= */

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");


/* =========================================
   FUNCIÓN PARA FORMATEAR NÚMEROS
   ========================================= */

function formatNumber(number) {

    return String(number).padStart(2, "0");

}


/* =========================================
   ANIMACIÓN DE CAMBIO
   ========================================= */

function animateChange(element) {

    element.classList.remove("change");

    /*
        Forzamos al navegador a reconocer
        nuevamente la animación.
    */

    void element.offsetWidth;

    element.classList.add("change");

}


/* =========================================
   ACTUALIZAR UN NÚMERO
   ========================================= */

function updateElement(element, newValue) {

    const formattedValue = formatNumber(newValue);

    /*
        Solo hacemos la animación si el número
        realmente cambió.
    */

    if (element.textContent !== formattedValue) {

        element.textContent = formattedValue;

        animateChange(element);

    }

}


/* =========================================
   CONTADOR PRINCIPAL
   ========================================= */

function updateCountdown() {

    const now = new Date();

    const difference = targetDate - now;


    /* =====================================
       SI LA FECHA YA LLEGÓ
       ===================================== */

    if (difference <= 0) {

        updateElement(daysElement, 0);
        updateElement(hoursElement, 0);
        updateElement(minutesElement, 0);
        updateElement(secondsElement, 0);

        /*
            FUTURO:

            Aquí podremos hacer algo como:

            showCodeScreen();

            para pasar a la siguiente etapa.

            Por ahora NO hacemos nada más.
        */

        return;

    }


    /* =====================================
       CÁLCULO DEL TIEMPO
       ===================================== */

    const totalSeconds = Math.floor(difference / 1000);


    const days = Math.floor(
        totalSeconds / (60 * 60 * 24)
    );


    const hours = Math.floor(
        (totalSeconds % (60 * 60 * 24)) / (60 * 60)
    );


    const minutes = Math.floor(
        (totalSeconds % (60 * 60)) / 60
    );


    const seconds = totalSeconds % 60;


    /* =====================================
       ACTUALIZAR PANTALLA
       ===================================== */

    updateElement(daysElement, days);
    updateElement(hoursElement, hours);
    updateElement(minutesElement, minutes);
    updateElement(secondsElement, seconds);

}


/* =========================================
   INICIAR CONTADOR
   ========================================= */

updateCountdown();


/*
    Actualizamos cada segundo.
*/

setInterval(updateCountdown, 1000);


/* =========================================
   FONDO SEGÚN LA HORA
   ========================================= */

function updateBackground() {
    const hour = new Date().getHours();

    const isDay = hour >= 6 && hour < 19;

    document.body.style.backgroundImage = isDay
        ? 'url("varios/DIA.png")'
        : 'url("varios/NOCHE.png")';
}

// Establecer el fondo al abrir la página.
updateBackground();

// Actualizar cada minuto.
setInterval(updateBackground, 60 * 1000);


/* =========================================
   MÚSICA DE FONDO EN BUCLE
   ========================================= */

const music = document.getElementById("backgroundMusic");

if (music) {
    music.loop = true;
    music.volume = 1;

    // Intentar reproducir automáticamente.
    music.play().catch((error) => {
        console.warn(
            "No se pudo iniciar automáticamente la música:",
            error.name,
            error.message
        );
    });

    // Si el navegador bloquea el autoplay,
    // intentar reproducir al primer toque o clic
    // en cualquier parte de la página.
    // No se muestra ningún botón de música.
    function startMusicAfterInteraction() {
        if (music.paused) {
            music.play().catch((error) => {
                console.warn("Error al reproducir música:", error);
            });
        }
    }

    document.addEventListener(
        "click",
        startMusicAfterInteraction
    );

    document.addEventListener(
        "touchstart",
        startMusicAfterInteraction,
        { passive: true }
    );
}
