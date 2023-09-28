const rowArray = [8, 7, 6, 5, 4, 3, 2, 1];
const colArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];


function getHistory() {
    trackMoves.historyInAlgebraicNotation = [];
    for (let index = 0; index < trackMoves.history.length; index++) {

        makeAlgebraicNotation(index);
    }
}

function makeAlgebraicNotation(index) {
    const currentMove = trackMoves.history[index];
    const moveNumber = index + 1;
    const pieceMoved = currentMove.pieceSymbol;
    let startRow = currentMove.from.row;
    let startCol = currentMove.from.col;
    let endRow = currentMove.to.row;
    let endCol = currentMove.to.col;
    const startRowNotation = findNotationSymbol(startRow, 'row');
    const startColNotation = findNotationSymbol(startCol, 'col');
    const endRowNotation = findNotationSymbol(endRow, 'row');
    const endColNotation = findNotationSymbol(endCol, 'col');
    let currentMoveString = ''
    let currentMoveString0 = 'Move Nr.';
    let currentMoveString1 = moveNumber;
    let currentMoveString1point1 = pieceMoved;
    let currentMoveString2 = ' moved from ';
    let currentMoveString3 = startColNotation;
    let currentMoveString4 = startRowNotation;
    let currentMoveString5 = ' to ';
    let currentMoveString6 = endColNotation;
    let currentMoveString7 = endRowNotation;
    currentMoveString = currentMoveString0.concat(
        currentMoveString1,
        currentMoveString1point1,
        currentMoveString2,
        currentMoveString3,
        currentMoveString4,
        currentMoveString5,
        currentMoveString6,
        currentMoveString7
    );
    console.log(currentMoveString);
    trackMoves.historyInAlgebraicNotation.push(currentMoveString);
}

function findNotationSymbol(value, rowOrCol) {
    if(rowOrCol == 'row') {
        return rowArray[value];
    }
    return colArray[value];
}
