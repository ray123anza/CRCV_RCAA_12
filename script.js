
/* =========================================
   CONFIGURACIÓN PRINCIPAL
========================================= */

const targetDate = new Date("2026-10-31T00:00:00");;

const MYSTERY_PASSWORD = "BOCHODIEZTREINTAUNOD";

const MYSTERY_VIDEO_URL =
    "https://drive.google.com/file/d/1HMwYlnoURCyH6b769KOUJwbIyFEW9L_E/preview";


/* =========================================
   ELEMENTOS HTML
========================================= */

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const countdownScreen = document.getElementById("countdownScreen");
const passwordScreen = document.getElementById("passwordScreen");
const audioScreen = document.getElementById("audioScreen");

const annualCounterScreen = document.getElementById("annualCounterScreen");
const mysteryPasswordScreen = document.getElementById("mysteryPasswordScreen");
const videoScreen = document.getElementById("videoScreen");

const music = document.getElementById("backgroundMusic");


/* =========================================
   CAMBIAR ENTRE PANTALLAS
========================================= */

function showScreen(screenToShow) {

    const screens = [
        countdownScreen,
        passwordScreen,
        audioScreen,
        annualCounterScreen,
        mysteryPasswordScreen,
        videoScreen
    ];

    screens.forEach(screen => {

        if (!screen) return;

        screen.classList.remove("active");
        screen.hidden = true;

    });

    if (screenToShow) {

        screenToShow.hidden = false;
        screenToShow.classList.add("active");

    }

}


/* =========================================
   FORMATEAR NÚMEROS
========================================= */

function formatNumber(number) {
    return String(number).padStart(2, "0");
}


/* =========================================
   ANIMACIÓN DE CAMBIO
========================================= */

function animateChange(element) {

    if (!element) return;

    element.classList.remove("change");

    void element.offsetWidth;

    element.classList.add("change");

}


/* =========================================
   ACTUALIZAR UN NÚMERO
========================================= */

function updateElement(element, newValue) {

    if (!element) return;

    const formattedValue = formatNumber(newValue);

    if (element.textContent !== formattedValue) {

        element.textContent = formattedValue;
        animateChange(element);

    }

}


/* =========================================
   MÚSICA DE FONDO DEL CONTADOR PRINCIPAL
========================================= */

let musicPermanentlyDisabled = false;

function stopBackgroundMusicPermanently() {

    musicPermanentlyDisabled = true;

    if (music) {

        music.pause();
        music.currentTime = 0;

    }

}


function startMusicAfterInteraction() {

    if (
        musicPermanentlyDisabled ||
        !music ||
        !countdownScreen ||
        !countdownScreen.classList.contains("active")
    ) {
        return;
    }

    if (music.paused) {

        music.play().catch(error => {
            console.warn("No se pudo reproducir la música:", error);
        });

    }

}


if (music) {

    music.loop = true;
    music.volume = 1;

}


/* =========================================
   MOSTRAR PANTALLA DE CONTRASEÑA
========================================= */

let countdownInterval = null;
let passwordScreenShown = false;

function showPasswordScreen() {

    if (passwordScreenShown) return;

    passwordScreenShown = true;

    clearInterval(countdownInterval);

    stopBackgroundMusicPermanently();

    showScreen(passwordScreen);

}


/* =========================================
   CONTADOR PRINCIPAL
========================================= */

function updateCountdown() {

    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {

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

        updateElement(daysElement, days);
        updateElement(hoursElement, hours);
        updateElement(minutesElement, minutes);
        updateElement(secondsElement, seconds);

        return;

    }

    updateElement(daysElement, 0);
    updateElement(hoursElement, 0);
    updateElement(minutesElement, 0);
    updateElement(secondsElement, 0);

    showPasswordScreen();

}


updateCountdown();

if (!passwordScreenShown) {

    countdownInterval = setInterval(updateCountdown, 1000);

    if (music) {

        music.play().catch(error => {
            console.warn(
                "No se pudo iniciar automáticamente la música:",
                error.name,
                error.message
            );
        });

        document.addEventListener("click", startMusicAfterInteraction);

        document.addEventListener(
            "touchstart",
            startMusicAfterInteraction,
            { passive: true }
        );

    }

}


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

updateBackground();

setInterval(updateBackground, 60 * 1000);


/* =========================================
   SECUENCIA SECRETA DEL FANTASMA
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.getElementById("ghostOverlay");
    const ghostButton = document.getElementById("ghostButton");
    const message = document.getElementById("ghostMessage");

    if (!overlay || !ghostButton || !message) return;

    let clicked = false;
    let finished = false;

    let ghostTimer;
    let messageTimer;
    let blackTimer;

    overlay.classList.remove("ghost-hidden");
    ghostButton.hidden = false;
    message.hidden = true;

    ghostTimer = setTimeout(() => {

        if (clicked || finished) return;

        finished = true;
        overlay.classList.add("ghost-hidden");

    }, 3000);

    ghostButton.addEventListener("click", () => {

        if (clicked || finished) return;

        clicked = true;

        clearTimeout(ghostTimer);

        ghostButton.hidden = true;
        message.hidden = false;

        messageTimer = setTimeout(() => {

            message.hidden = true;

            blackTimer = setTimeout(() => {

                finished = true;
                overlay.classList.add("ghost-hidden");

            }, 500);

        }, 3000);

    });

});


/* =========================================
   VALIDAR CONTRASEÑA DEL ANIVERSARIO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const passwordInput = document.getElementById("anniversaryPassword");
    const passwordButton = document.getElementById("passwordButton");
    const passwordError = document.getElementById("passwordError");

    if (!passwordInput || !passwordButton || !passwordError) return;

    function validatePassword() {

        if (passwordInput.value === "31102026") {

            passwordError.hidden = true;

            stopBackgroundMusicPermanently();

            if (audioScreen) {

                showScreen(audioScreen);

                console.log("Audiolibro habilitado.");

            } else {

                console.error("No se encontró audioScreen.");

            }

        } else {

            passwordError.hidden = false;

            passwordInput.value = "";
            passwordInput.focus();

        }

    }

    passwordButton.addEventListener("click", validatePassword);

    passwordInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            validatePassword();
        }

    });

});


/* =========================================
   REPRODUCTOR DEL AUDIO-LIBRO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const audiobook = document.getElementById("audiobook");

    const playButton = document.getElementById("playButton");
    const backwardButton = document.getElementById("backwardButton");
    const forwardButton = document.getElementById("forwardButton");

    const audioProgress = document.getElementById("audioProgress");

    const currentTimeElement = document.getElementById("currentTime");
    const durationElement = document.getElementById("duration");

    if (
        !audiobook ||
        !playButton ||
        !backwardButton ||
        !forwardButton ||
        !audioProgress ||
        !currentTimeElement ||
        !durationElement
    ) {
        console.error("No se encontraron todos los elementos del reproductor.");
        return;
    }

    function formatAudioTime(seconds) {

        if (!Number.isFinite(seconds)) return "0:00";

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;

    }

    playButton.addEventListener("click", () => {

        if (audiobook.paused) {

            audiobook.play().catch(error => {
                console.error("Error al reproducir el audiolibro:", error);
            });

        } else {

            audiobook.pause();

        }

    });

    audiobook.addEventListener("play", () => {

        playButton.textContent = "Ⅱ";
        playButton.setAttribute("aria-label", "Pausar");

    });

    audiobook.addEventListener("pause", () => {

        playButton.textContent = "▶";
        playButton.setAttribute("aria-label", "Reproducir");

    });

    backwardButton.addEventListener("click", () => {

        audiobook.currentTime = Math.max(
            0,
            audiobook.currentTime - 15
        );

    });

    forwardButton.addEventListener("click", () => {

        if (!Number.isFinite(audiobook.duration)) return;

        audiobook.currentTime = Math.min(
            audiobook.duration,
            audiobook.currentTime + 15
        );

    });

    audiobook.addEventListener("loadedmetadata", () => {

        durationElement.textContent = formatAudioTime(audiobook.duration);

        audioProgress.max = audiobook.duration;
        audioProgress.value = 0;

    });

    audiobook.addEventListener("timeupdate", () => {

        currentTimeElement.textContent = formatAudioTime(audiobook.currentTime);

        if (Number.isFinite(audiobook.duration)) {
            audioProgress.value = audiobook.currentTime;
        }

    });

    audioProgress.addEventListener("input", () => {

        if (!Number.isFinite(audiobook.duration)) return;

        audiobook.currentTime = Number(audioProgress.value);

    });

    audiobook.addEventListener("ended", () => {

        playButton.textContent = "▶";
        playButton.setAttribute("aria-label", "Reproducir");

    });

});


/* =========================================
   MENÚ DESPLEGABLE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (!menuButton || !dropdownMenu) {
        console.error("No se encontraron los elementos del menú.");
        return;
    }

    // Abrir y cerrar menú
    function toggleMenu() {

        const isOpen = !dropdownMenu.hidden;

        if (isOpen) {
            closeMenu();
        } else {
            dropdownMenu.hidden = false;
            dropdownMenu.classList.add("menu-open");
            menuButton.classList.add("menu-open");
            menuButton.setAttribute("aria-expanded", "true");
        }

    }

    // Cerrar menú
    function closeMenu() {

        dropdownMenu.classList.remove("menu-open");
        menuButton.classList.remove("menu-open");

        dropdownMenu.hidden = true;

        menuButton.setAttribute("aria-expanded", "false");

    }

    menuButton.addEventListener("click", toggleMenu);

    // Cerrar al pulsar fuera del menú
    document.addEventListener("click", event => {

        if (
            !menuButton.contains(event.target) &&
            !dropdownMenu.contains(event.target)
        ) {
            closeMenu();
        }

    });

    // Cerrar al seleccionar un enlace
    dropdownMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Abrir contador anual
    const openAnnualCounter = document.getElementById("openAnnualCounter");

    if (openAnnualCounter) {

        openAnnualCounter.addEventListener("click", () => {

            closeMenu();
            showScreen(annualCounterScreen);
            updateAnnualCounter();

        });

    }

    // Abrir sección misteriosa
    const openMystery = document.getElementById("openMystery");

    if (openMystery) {

        openMystery.addEventListener("click", () => {

            closeMenu();
            showScreen(mysteryPasswordScreen);
            clearMysteryPassword();

        });

    }

});


/* =========================================
   VOLVER AL AUDIO-LIBRO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const backFromCounter = document.getElementById("backFromCounter");
    const backFromMystery = document.getElementById("backFromMystery");

    if (backFromCounter) {

        backFromCounter.addEventListener("click", () => {

            stopAnnualMusic();

            showScreen(audioScreen);

        });

    }

    if (backFromMystery) {

        backFromMystery.addEventListener("click", () => {

            clearMysteryPassword();

            showScreen(audioScreen);

        });

    }

});


/* =========================================
   CONTADOR ANUAL: 31 DE OCTUBRE
========================================= */

const annualDays = document.getElementById("annualDays");
const annualHours = document.getElementById("annualHours");
const annualMinutes = document.getElementById("annualMinutes");
const annualSeconds = document.getElementById("annualSeconds");

function getNextOctober31() {

    const now = new Date();

    let year = now.getFullYear();

    let nextDate = new Date(year, 9, 31, 0, 0, 0);

    if (nextDate <= now) {

        year++;

        nextDate = new Date(year, 9, 31, 0, 0, 0);

    }

    return nextDate;

}

function updateAnnualCounter() {

    const now = new Date();
    const target = getNextOctober31();

    const difference = target - now;

    const totalSeconds = Math.max(
        0,
        Math.floor(difference / 1000)
    );

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor(
        (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    updateElement(annualDays, days);
    updateElement(annualHours, hours);
    updateElement(annualMinutes, minutes);
    updateElement(annualSeconds, seconds);

}

updateAnnualCounter();

setInterval(updateAnnualCounter, 1000);


/* =========================================
   MÚSICA DEL CONTADOR ANUAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const annualMusic = document.getElementById("annualMusic");
    const annualMusicButton = document.getElementById("annualMusicButton");

    if (!annualMusic || !annualMusicButton) return;

    annualMusic.loop = true;

    annualMusicButton.addEventListener("click", () => {

        if (annualMusic.paused) {

            annualMusic.play().then(() => {

                annualMusicButton.textContent = "Ⅱ PAUSAR";

            }).catch(error => {

                console.error("No se pudo reproducir la canción:", error);

            });

        } else {

            annualMusic.pause();

            annualMusicButton.textContent = "▶ REPRODUCIR";

        }

    });

    annualMusic.addEventListener("pause", () => {

        annualMusicButton.textContent = "▶ REPRODUCIR CANCIÓN";

    });

    annualMusic.addEventListener("play", () => {

        annualMusicButton.textContent = "Ⅱ PAUSAR CANCIÓN";

    });

});

function stopAnnualMusic() {

    const annualMusic = document.getElementById("annualMusic");
    const annualMusicButton = document.getElementById("annualMusicButton");

    if (!annualMusic) return;

    annualMusic.pause();
    annualMusic.currentTime = 0;

    if (annualMusicButton) {
        annualMusicButton.textContent = "▶ REPRODUCIR CANCIÓN";
    }

}


/* =========================================
   CONTRASEÑA MISTERIOSA
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const mysteryInputs = Array.from(
        document.querySelectorAll(".mystery-letter")
    );

    const mysteryButton = document.getElementById("mysteryPasswordButton");
    const mysteryError = document.getElementById("mysteryPasswordError");

    if (!mysteryInputs.length || !mysteryButton || !mysteryError) {
        console.error("No se encontraron las casillas de la contraseña misteriosa.");
        return;
    }

    function clearMysteryPassword() {

        mysteryInputs.forEach(input => {
            input.value = "";
        });

        mysteryError.hidden = true;

    }

    window.clearMysteryPassword = clearMysteryPassword;

    mysteryInputs.forEach((input, index) => {

        input.type = "text";
        input.maxLength = 1;
        input.autocomplete = "off";
        input.autocapitalize = "characters";
        input.spellcheck = false;

        input.addEventListener("input", () => {

            input.value = input.value
                .replace(/[^a-zA-Z]/g, "")
                .toUpperCase()
                .slice(0, 1);

            mysteryError.hidden = true;

            if (input.value && index < mysteryInputs.length - 1) {
                mysteryInputs[index + 1].focus();
            }

        });

        input.addEventListener("keydown", event => {

            if (
                event.key === "Backspace" &&
                input.value === "" &&
                index > 0
            ) {

                mysteryInputs[index - 1].focus();

            }

            if (event.key === "Enter") {
                validateMysteryPassword();
            }

        });

        input.addEventListener("paste", event => {

            event.preventDefault();

            const pastedText = (
                event.clipboardData || window.clipboardData
            ).getData("text");

            const letters = pastedText
                .replace(/[^a-zA-Z]/g, "")
                .toUpperCase()
                .split("");

            letters.forEach((letter, pastedIndex) => {

                const destination = mysteryInputs[index + pastedIndex];

                if (destination) {
                    destination.value = letter;
                }

            });

            const nextEmpty = mysteryInputs.find(
                field => field.value === ""
            );

            if (nextEmpty) {
                nextEmpty.focus();
            } else {
                mysteryInputs[mysteryInputs.length - 1].focus();
            }

            mysteryError.hidden = true;

        });

    });


    function validateMysteryPassword() {

        const enteredPassword = mysteryInputs
            .map(input => input.value)
            .join("");

        if (enteredPassword === MYSTERY_PASSWORD) {

            mysteryError.hidden = true;

            openMysteryVideo();

        } else {

            mysteryError.hidden = false;

            mysteryInputs.forEach(input => {
                input.value = "";
            });

            mysteryInputs[0].focus();

        }

    }

    mysteryButton.addEventListener("click", validateMysteryPassword);

});


/* =========================================
   ABRIR VIDEO MISTERIOSO
========================================= */

function openMysteryVideo() {

    const mysteryVideo = document.getElementById("mysteryVideo");

    if (mysteryVideo) {

        mysteryVideo.src = MYSTERY_VIDEO_URL;

    }

    showScreen(videoScreen);

    const videoContainer = document.querySelector(".video-container");

    if (videoContainer && videoContainer.requestFullscreen) {

        videoContainer.requestFullscreen().catch(error => {

            console.warn("No se pudo activar pantalla completa:", error);

        });

    }

}


/* =========================================
   CERRAR VIDEO Y VOLVER AL AUDIO-LIBRO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const closeVideoButton = document.getElementById("closeVideoButton");

    if (!closeVideoButton) return;

    closeVideoButton.addEventListener("click", () => {

        if (document.fullscreenElement) {

            document.exitFullscreen().catch(error => {
                console.warn("No se pudo salir de pantalla completa:", error);
            });

        }

        const mysteryVideo = document.getElementById("mysteryVideo");

        if (mysteryVideo) {
            mysteryVideo.src = "";
        }

        clearMysteryPassword();

        showScreen(audioScreen);

    });

});