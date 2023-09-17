function drawBoard() {
    board = document.getElementById("app");
    let shift = 0;
    for (let i = 0; i < 64; i++) {
        let color = "lightSquare";
        if (i % 8 === 0) {
            shift++;
        }
        if ((i + shift) % 2 === 0) {
            color = "darkSquare";
        }
        board.innerHTML += `<div id="square${i}" class="${color}"></div>`;
    }
}

function drawPiece(index, color, piece) {
    document.getElementById(`square${index}`).innerHTML = piece;
    document.getElementById(`square${index}`).style.color = color;
    if (color === "black") {
        document.getElementById(
            `square${index}`
        ).style.textShadow = `1px 1px white`;
    } else {
        document.getElementById(
            `square${index}`
        ).style.textShadow = `1px 1px black`;
    }
}

function drawBlank(index) {
    document.getElementById(`square${index}`).innerHTML = "";
}

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
