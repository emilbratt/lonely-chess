function initApp() {
    currentPosition = createStartingPosition();
    let p = currentPosition[0][0];
    createTilesHTML();
    drawCurrentPosition();
    setTimeout(() => {
        movePiece(p, 3, 0);
    }, 1000);
}

document.addEventListener("DOMContentLoaded", initApp);
