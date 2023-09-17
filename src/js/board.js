const board = document.getElementById("board");
let currentPosition = [];

function createBackline(y, color) {
    return [
        new Rook(0, y, color),
        new Knight(1, y, color),
        new Bishop(2, y, color),
        new Queen(3, y, color),
        new King(4, y, color),
        new Bishop(5, y, color),
        new Knight(6, y, color),
        new Rook(7, y, color),
    ];
}

function createPawns(y, color) {
    const pawns = [];
    const BOARD_LENGTH = 8;
    for (let i = 0; i < BOARD_LENGTH; i++) {
        pawns.push(new Pawn(i, y, color));
    }
    return pawns;
}

function createStartingPosition() {
    const blackBackline = createBackline(0, "black");
    const blackPawns = createPawns(1, "black");
    const whiteBackline = createBackline(7, "white");
    const whitePawns = createPawns(6, "white");
    const newBoard = [];
    for (let row = 0; row < 8; row++) {
        if (row === 0) {
            newBoard.push(blackBackline);
        } else if (row === 1) {
            newBoard.push(blackPawns);
        } else if (row === 6) {
            newBoard.push(whitePawns);
        } else if (row === 7) {
            newBoard.push(whiteBackline);
        } else {
            newBoard.push(new Array(8).fill(null));
        }
    }
    console.log(newBoard);
    return newBoard;
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
                    console.log(
                        currentPosition[row][col].getPossibleMoves(
                            currentPosition
                        )
                    );
                }
            });
            board.append(tile);
        }
    }
}

function getTileElement(row, col) {
    return document.getElementById(`${row}-${col}`);
}

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
