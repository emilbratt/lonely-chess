const algebraicNotationRowArray = [8, 7, 6, 5, 4, 3, 2, 1];
const algebraicNotationColArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];


function getHistory() {
    trackMoves.historyInAlgebraicNotation = [];
    for (let index = 0; index < trackMoves.history.length; index++) {
        makeAlgebraicNotation(index);
    }
}



function makeAlgebraicNotation(index) {
    const currentMove = trackMoves.history[index];
    const moveNumber = index + 1;
    const pieceMoved = currentMove.symbol;
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
    let currentMoveString2 = pieceMoved;
    let currentMoveString3 = ' moved from ';
    let currentMoveString4 = startColNotation;
    let currentMoveString5 = startRowNotation;
    let currentMoveString6 = ' to ';
    let currentMoveString7 = endColNotation;
    let currentMoveString8 = endRowNotation;
    currentMoveString = currentMoveString0.concat(
        currentMoveString1,
        currentMoveString2,
        currentMoveString3,
        currentMoveString4,
        currentMoveString5,
        currentMoveString6,
        currentMoveString7,
        currentMoveString8
    );
    trackMoves.historyInAlgebraicNotation.push(currentMoveString);
}

function findNotationSymbol(value, rowOrCol) {
    if(rowOrCol == 'row') {
        return algebraicNotationRowArray[value];
    }
    return algebraicNotationColArray[value];
}

function getHistoryDisplayed() {
    getHistory();
    document.getElementById('history').innerHTML= '';
    for (let index = 0; index < trackMoves.historyInAlgebraicNotation.length; index++) {
        document.getElementById('history').innerHTML += /*HTML*/`
            <div>${trackMoves.historyInAlgebraicNotation[index]}<div>
        `;    
    }
}
