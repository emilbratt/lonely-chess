function drawBoard() {
    board = document.getElementById('app')
    let shift = 0;
    for (let i=0; i<64; i++) {
        let color = 'lightSquare';
        if (i % 8 === 0) {
            shift++;
        }
        if ((i+shift) % 2 === 0) {
            color =  'darkSquare';
        }
        board.innerHTML += `<div id="square${i}" class="${color}"></div>`; 
    }
}

function drawPiece(index, color, piece) {
    document.getElementById(`square${index}`).innerHTML = piece;
    document.getElementById(`square${index}`).style.color = color;
    if (color === 'black') {
        document.getElementById(`square${index}`).style.textShadow = `1px 1px white`;
    } else {
        document.getElementById(`square${index}`).style.textShadow = `1px 1px black`;
    }

}

function drawBlank(index) {
    document.getElementById(`square${index}`).innerHTML = '';
}
