
// model
let setStartPosition = true;
let currentPosition = {};

// view
function updateView() {
    if (setStartPosition) {
        drawBoard();
        currentPosition = generateStartPosition();
        setStartPosition = false;
    }
    drawCurrentPosition();
}

// controller
function movePiece() {
    // NOTHING YET
}

// helper
function drawCurrentPosition() {
    /* 
     * A dictionary holds the position data for each square.
     * Each entry is shaped like shown below.
     *
     *  currentPosition = {
     *      0: {'player': 'black', 'piece': 'rook'},
     *      1: {'player': 'black', 'piece': 'knight'},
     *      3: {..},
     *     32: {'player': 'none'},
     *     33: {..},
     *     62: {'player': 'white', 'piece': 'knight'},
     *     63: {'player': 'white', 'piece': 'rook'},
     *  }
     *
     */
    for (const [index, data] of Object.entries(currentPosition)) {
        if (data['player'] === 'none') {
            drawBlank(index);
        } else {
            drawPiece(index, data['player'], getUnicodePiece(data['piece']));
        }
    }
}

// entrypoint
function main() {
    updateView();
}
