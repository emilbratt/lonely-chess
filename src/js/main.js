function initApp() {
    currentPosition = createStartingPosition();
    createTilesHTML();
    drawCurrentPosition();
}

document.addEventListener("DOMContentLoaded", initApp);
