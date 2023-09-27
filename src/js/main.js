function initApp() {
    currentPosition = createStartingPosition();
    let p = currentPosition[0][0];
    createTilesHTML();
    drawCurrentPosition();

}

document.addEventListener("DOMContentLoaded", initApp);
