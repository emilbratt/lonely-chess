let rowArray = [8,7,6,5,4,3,2,1];
let colArray = ['A','B','C','D','E','F','G','H']
let historyInAlgebraicNotation = []


function getHistory(){
for (let index = 0; index < trackMoves.history.length; index++) {
    const currentMove = trackMoves.history[index];
    console.log(index)
    console.log(currentMove)

    makeAlgebraicNotation(index);
}
}
function makeAlgebraicNotation(index){
    let startRow = trackMoves.history[index].from.row;
    let startCol = trackMoves.history[index].from.col;
    let endRow = trackMoves.history[index].to.row;
    let endCol = trackMoves.history[index].to.col;
    const startRowNotation = findNotationSymbol(startRow, 'row')
    const startColNotation = findNotationSymbol(startCol, 'col')
    const endRowNotation = findNotationSymbol(endRow, 'row')
    const endColNotation = findNotationSymbol(endCol, 'col')
    let currentMoveString = ''
    let currentMoveString1 = 'Move NR.'
    let currentMoveString2 =', moved from '
    let currentMoveString3 = startColNotation
    let currentMoveString4 = startRowNotation
    let currentMoveString5 = ' to '
    let currentMoveString6 = endColNotation
    let currentMoveString7 = endRowNotation
    console.log(currentMoveString.concat(currentMoveString1,currentMoveString2,currentMoveString3,currentMoveString4,currentMoveString5,currentMoveString6,currentMoveString7))
// need to push the line above to trackMoves.historyAlgebraicNotation
}

function findNotationSymbol(value, rowOrCol){
if(rowOrCol == 'row'){
    return rowArray[value];
}
return colArray[value];
}