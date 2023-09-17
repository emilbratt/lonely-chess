// model
const app = document.getElementById("app");
let currentPosition = [];
let tilesCreated = false;

// view
function updateView() {
    drawCurrentPosition();
}

function createIdString(row, col) {
    return `${row}-${col}`;
}

function createTilesHTML() {
    for (let row = 0; row < currentPosition.length; row++) {
        for (let col = 0; col < currentPosition[0].length; col++) {
            tile = document.createElement("div");
            tile.id = createIdString(row, col);
            tile.classList.add("tile");
            if (row % 2) tile.classList.add("odd");
            tile.addEventListener("mousedown", () => {
                if (currentPosition[row][col]) {
                    console.log(currentPosition[row][col].getPossibleMoves());
                }
            });
            app.append(tile);
        }
    }
    tilesCreated = true;
}

function getTileElement(row, col) {
    return document.getElementById(`${row}-${col}`);
}

// controller
function movePiece() {
    // NOTHING YET
}

// helper
function drawCurrentPosition() {
    /*
     * A 2D array holds the position data for each square.
     * Each element in the array contains one of two options:
     *
     *      If there is no piece, the element is null.
     *
     *      If there is a piece, the element is an instance of a subclass
     *      of Piece corresponding to the piece in the square.
     *
     * Each instance of Piece has its own getPossibleMoves method.
     * This method is attached to an event listener.
     */

    if (!tilesCreated) {
        createTilesHTML();
    }
    for (let row = 0; row < currentPosition.length; row++) {
        for (let col = 0; col < currentPosition[0].length; col++) {
            currentPiece = currentPosition[row][col];
            if (currentPiece) {
                const currentTile = getTileElement(row, col);
                const pieceText = currentPiece.symbol;
                const IS_WHITE = currentPiece.color === "white";
                const IS_BLACK = !IS_WHITE;
                currentTile.textContent = pieceText;
                currentTile.classList.toggle("white", IS_WHITE);
                currentTile.classList.toggle("black", IS_BLACK);
            }
        }
    }
}

function initApp() {
    currentPosition = createStartingPosition();
    updateView();
}

document.addEventListener("DOMContentLoaded", initApp);
