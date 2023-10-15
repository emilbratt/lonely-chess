// classReference holds the class for that piece, check pieces.js
const promotionOptions = {
    'white': {
        0: { classReference: Queen, symbol: UNICODE_PIECES.queen },
        1: { classReference: Rook, symbol: UNICODE_PIECES.rook },
        2: { classReference: Bishop, symbol: UNICODE_PIECES.bishop },
        3: { classReference: Knight, symbol: UNICODE_PIECES.knight },
    },
    'black': {
        4: { classReference: Knight, symbol: UNICODE_PIECES.knight },
        5: { classReference: Bishop, symbol: UNICODE_PIECES.bishop },
        6: { classReference: Rook, symbol: UNICODE_PIECES.rook },
        7: { classReference: Queen, symbol: UNICODE_PIECES.queen },
    },
};

function pawnPromotionCheck(piece) {
    if (piece.symbol !== UNICODE_PIECES.pawn) return false;
    if (piece.row !== 7 && piece.row !== 0) return false;
    return true;
}

// empties out the original board, then drawing only selectable officers
function createPromotionTilesHTML(piece) {
    board.textContent = '';
    for (let row = 0; row < currentPosition.length; row++) {
        for (let col = 0; col < currentPosition[0].length; col++) {
            tile = document.createElement('div');
            tile.id = createIdString(row, col);
            tile.classList.add('tile');
            (col + row) % 2 === 0
                ? tile.classList.add('light-tile-color')
                : tile.classList.add('dark-tile-color');

            tile.textContent = '';
            if (col === piece.col) {
                if (row in promotionOptions[piece.color]) {
                    const IS_WHITE = piece.color === 'white';
                    const IS_BLACK = piece.color === 'black';
                    tile.textContent = promotionOptions[piece.color][row].symbol;
                    tile.classList.toggle('white', IS_WHITE);
                    tile.classList.toggle('black', IS_BLACK);
                    tile.addEventListener('mousedown', () => {
                        handlePromotionClick(piece, promotionOptions[piece.color][row].classReference);
                    });
                }
            }
            board.append(tile);
        }
    }
}

// calling this function will reset to the original board
function handlePromotionClick(piece, classReference) {
    currentPosition[piece.row][piece.col] = new classReference(piece.row, piece.col, piece.color);
    createTilesHTML();
    drawCurrentPosition();
}
