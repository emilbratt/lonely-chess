const board = document.getElementById("board");
let currentPosition = [];
const trackMoves = {
    isWhiteTurn: true,
    moves: 0,
    history: [],
    historyInAlgebraicNotation: [],
};
const selected = {
    row: null,
    col: null,
    possibleMoves: [],
};

function createBackline(row, color) {
    return [
        new Rook(row, 0, color),
        new Knight(row, 1, color),
        new Bishop(row, 2, color),
        new Queen(row, 3, color),
        new King(row, 4, color),
        new Bishop(row, 5, color),
        new Knight(row, 6, color),
        new Rook(row, 7, color),
    ];
}

function createPawns(row, color) {
    const pawns = [];
    for (let col = 0; col < 8; col++) {
        pawns.push(new Pawn(row, col, color));
    }
    return pawns;
}

function createStartingPosition() {
    const newBoard = [
        createBackline(0, "black"),
        createPawns(1, "black"),
        new Array(8).fill(null),
        new Array(8).fill(null),
        new Array(8).fill(null),
        new Array(8).fill(null),
        createPawns(6, "white"),
        createBackline(7, "white"),
    ];
    console.log(newBoard);
    return newBoard;
}

function createIdString(row, col) {
    return `${row}-${col}`;
}

function movePiece(piece, newRow, newCol) {
    const { row: oldRow, col: oldCol } = piece.getPosition();
    trackMoves.history.push({
        from: { row: oldRow, col: oldCol },
        to: { row: newRow, col: newCol },
    });
    piece.setPosition(newRow, newCol);
    currentPosition[oldRow][oldCol] = null;
    currentPosition[newRow][newCol] = piece;
    trackMoves.moves += 1;
    trackMoves.isWhiteTurn = !trackMoves.isWhiteTurn;
    drawCurrentPosition();
}

function createTilesHTML() {
    for (let row = 0; row < currentPosition.length; row++) {
        for (let col = 0; col < currentPosition[0].length; col++) {
            tile = document.createElement("div");
            tile.id = createIdString(row, col);
            tile.classList.add("tile");
            if (row % 2) tile.classList.add("odd");
            tile.addEventListener("mousedown", () => {
                handleClick(row, col);
            });
            board.append(tile);
        }
    }
}

function handleClick(row, col) {
    clearPossibleMovesCSS();
    if (isValidMove(row, col)) {
        handleClickMove(row, col);
        return;
    }
    if (!currentPosition[row][col]) {
        selected.possibleMoves = [];
        return;
    }
    const possibleMoves =
        currentPosition[row][col].getPossibleMoves(currentPosition);
    showPossibleMovesCSS(possibleMoves);
    getTileElement(row, col).classList.add("selected-piece");
    if (possibleMoves.length) {
        selected.row = row;
        selected.col = col;
    }
}

function handleClickMove(row, col) {
    selected.possibleMoves = [];
    const pieceToMove = currentPosition[selected.row][selected.col];
    movePiece(pieceToMove, row, col);
}

function isValidMove(row, col) {
    for (const move of selected.possibleMoves) {
        const { row: possibleRow, col: possibleCol } = move;
        if (possibleCol === col && possibleRow === row) return true;
    }
    return false;
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
            const currentPiece = currentPosition[row][col];
            const currentTileElement = getTileElement(row, col);
            if (currentPiece) {
                const pieceText = currentPiece.symbol;
                const IS_WHITE = currentPiece.color === "white";
                const IS_BLACK = !IS_WHITE;
                currentTileElement.textContent = pieceText;
                currentTileElement.classList.toggle("white", IS_WHITE);
                currentTileElement.classList.toggle("black", IS_BLACK);
            } else {
                currentTileElement.textContent = "";
            }
        }
    }
}

function showPossibleMovesCSS(possibleMoves) {
    console.log(possibleMoves);
    selected.possibleMoves = possibleMoves;
    if (!possibleMoves.length) return;
    for (const { row, col, attack } of possibleMoves) {
        const tile = getTileElement(row, col);
        const classString = attack ? "possible-attack" : "possible-move";
        tile.classList.add(classString);
    }
}

function clearPossibleMovesCSS() {
    const tilesToClear = document.querySelectorAll(
        ".possible-move, .possible-attack, .selected-piece"
    );
    for (const tile of tilesToClear) {
        tile.classList.remove(
            "possible-move",
            "possible-attack",
            "selected-piece"
        );
    }
}
