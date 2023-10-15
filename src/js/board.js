const board = document.getElementById("board");
let currentPosition = [];
const trackMoves = {
    isWhiteTurn: true,
    moveCount: 0,
    history: [],
};
const selectedTile = {
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
    newBoard[1][0] = new Pawn(1, 0, 'white'); // NOTE: remove when issue promote pawn is solved
    return newBoard;
}

function createIdString(row, col) {
    return `${row}-${col}`;
}

function movePiece(piece, newRow, newCol, isEnPassant) {
    for (const row of currentPosition) {
        for (const tile of row) {
            if (tile instanceof Pawn) {
                tile.isEnPassantable = false;
            }
        }
    }
    const { row: oldRow, col: oldCol } = piece.getPosition();

    if (piece instanceof Pawn) {
        piece.hasMoved = true;
        if (Math.abs(piece.row - newRow) === 2) {
            piece.isEnPassantable = true;
        }
    }

    piece.setPosition(newRow, newCol);
    currentPosition[oldRow][oldCol] = null;
    if (isEnPassant) {
        if (piece.color === "white") currentPosition[newRow + 1][newCol] = null;
        else currentPosition[newRow - 1][newCol] = null;
    }
    currentPosition[newRow][newCol] = piece;

    trackMoves.history.push({
        symbol: piece.symbol,
        color: piece.color,
        from: { row: oldRow, col: oldCol },
        to: { row: newRow, col: newCol },
    });
    trackMoves.isWhiteTurn = !trackMoves.isWhiteTurn;
    trackMoves.moveCount += 1;
    promoteCheck(piece);
    drawHistory();
    drawCurrentPosition();
}
function createTilesHTML() {
    for (let row = 0; row < currentPosition.length; row++) {
        for (let col = 0; col < currentPosition[0].length; col++) {
            tile = document.createElement("div");
            tile.id = createIdString(row, col);
            tile.classList.add("tile");
            (col + row) % 2 === 0
                ? tile.classList.add("light-tile-color")
                : tile.classList.add("dark-tile-color");
            tile.addEventListener("mousedown", () => {
                handleClick(row, col);
            });
            board.append(tile);
        }
    }
}

function handleClick(row, col) {
    clearPossibleMovesCSS();
    const { validMove, isEnPassant } = isValidMove(row, col);
    if (validMove) {
        handleClickMove(row, col, isEnPassant);
        return;
    }
    let piece = currentPosition[row][col];
    if (!piece) return;
    const possibleMoves = piece.getPossibleMoves(currentPosition);
    showPossibleMovesCSS(possibleMoves);
    getTileElement(row, col).classList.add("selected-color");
    if (possibleMoves.length) {
        selectedTile.row = row;
        selectedTile.col = col;
    }
}

function handleClickMove(row, col, isEnPassant) {
    selectedTile.possibleMoves = [];
    const pieceToMove = currentPosition[selectedTile.row][selectedTile.col];
    movePiece(pieceToMove, row, col, isEnPassant);
}

function isValidMove(row, col) {
    for (const move of selectedTile.possibleMoves) {
        const { row: possibleRow, col: possibleCol, isEnPassant } = move;
        if (possibleCol === col && possibleRow === row)
            return { validMove: true, isEnPassant: isEnPassant ? true : false };
    }
    return { validMove: false, isEnPassant: false };
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
    selectedTile.possibleMoves = possibleMoves;
    if (!possibleMoves.length) return;
    for (const { row, col, isAttack } of possibleMoves) {
        const tile = getTileElement(row, col);
        tile.classList.add(isAttack ? "possible-attack" : "possible-move");
    }
}

function clearPossibleMovesCSS() {
    const tilesToClear = document.querySelectorAll(
        ".possible-move, .possible-attack, .selected-color"
    );
    for (const tile of tilesToClear) {
        tile.classList.remove(
            "possible-move",
            "possible-attack",
            "selected-color"
        );
    }
}
