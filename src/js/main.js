///// "Nå er jeg litt kjapp her! Det skjer jo stadig vekk!" -Terje /////
function initApp() {
    currentPosition = createStartingPosition();
    createTilesHTML();
    drawCurrentPosition();
}

document.addEventListener("DOMContentLoaded", initApp);
