function promoteCheck(piece) {
    document.getElementById('promotion').innerHTML = '';
    if (piece.symbol !== UNICODE_PIECES.pawn) return;
    if (piece.row !== 7 && piece.row !== 0) return;
    document.getElementById('promotion').innerHTML = `
        <div style="font-size: 2.3rem;">
            <div onclick="promotePiece('Queen');">${UNICODE_PIECES.queen}</div>
            <div onclick="promotePiece('Rook');">${UNICODE_PIECES.rook}</div>
            <div onclick="promotePiece('Bishop');">${UNICODE_PIECES.bishop}</div>
            <div onclick="promotePiece('Knight');">${UNICODE_PIECES.knight}</div>
        </div>
    `;
}

function promotePiece(name) {
    piece = trackMoves.history[trackMoves.moveCount - 1];
    currentPosition[piece.to.row][piece.to.col] = eval(`new ${name}(${piece.to.row}, ${piece.to.col}, '${piece.color}')`);
    drawCurrentPosition();
}
