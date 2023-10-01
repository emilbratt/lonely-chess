function initApp() {
    currentPosition = createStartingPosition();
    createTilesHTML();
    drawCurrentPosition();
    drawHistory();
}

document.addEventListener("DOMContentLoaded", initApp);
