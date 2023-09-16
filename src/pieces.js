const UNICODE_PIECES = {
    'bishop': '♝',
    'king': '♚',
    'knight': '♞', 
    'pawn': '♟',
    'queen': '♛',
    'rook': '♜',
    'none': 'o',
}

function getUnicodePiece(piece) {
    return UNICODE_PIECES[piece];
}

function generateStartPosition() {
    // hardcoded for now, but can probably shorten this..
    let currentPosition = {};
    currentPosition[0] = { 'player': 'black', 'piece': 'rook' };
    currentPosition[1] = { 'player': 'black', 'piece': 'knight' };
    currentPosition[2] = { 'player': 'black', 'piece': 'bishop' };
    currentPosition[3] = { 'player': 'black', 'piece': 'queen' };
    currentPosition[4] = { 'player': 'black', 'piece': 'king' };
    currentPosition[5] = { 'player': 'black', 'piece': 'bishop' };
    currentPosition[6] = { 'player': 'black', 'piece': 'knight' };
    currentPosition[7] = { 'player': 'black', 'piece': 'rook' };
    for (i=8; i<16; i++) {
        currentPosition[i] = { 'player': 'black', 'piece': 'pawn' };
    }
    for (i=16; i<48; i++) {
        currentPosition[i] = { 'player': 'none'};
    }
    for (i=48; i<56; i++) {
        currentPosition[i] = { 'player': 'white', 'piece': 'pawn' };
    }
    currentPosition[56] = { 'player': 'white', 'piece': 'rook' };
    currentPosition[57] = { 'player': 'white', 'piece': 'knight' };
    currentPosition[58] = { 'player': 'white', 'piece': 'bishop' };
    currentPosition[59] = { 'player': 'white', 'piece': 'queen' };
    currentPosition[60] = { 'player': 'white', 'piece': 'king' };
    currentPosition[61] = { 'player': 'white', 'piece': 'bishop' };
    currentPosition[62] = { 'player': 'white', 'piece': 'knight' };
    currentPosition[63] = { 'player': 'white', 'piece': 'rook' };
    return currentPosition;
}
