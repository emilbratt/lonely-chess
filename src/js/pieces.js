const UNICODE_PIECES = {
    bishop: "♝",
    king: "♚",
    knight: "♞",
    pawn: "♟",
    queen: "♛",
    rook: "♜",
};

const UP = { col: 0, row: -1 };
const DOWN = { col: 0, row: 1 };
const LEFT = { col: -1, row: 0 };
const RIGHT = { col: 1, row: 0 };
const DIAGONAL_UP_LEFT = { col: -1, row: -1 };
const DIAGONAL_UP_RIGHT = { col: 1, row: -1 };
const DIAGONAL_DOWN_LEFT = { col: -1, row: 1 };
const DIAGONAL_DOWN_RIGHT = { col: 1, row: 1 };
const KNIGHT_UP_LEFT = { col: -1, row: -2 };
const KNIGHT_UP_RIGHT = { col: 1, row: -2 };
const KNIGHT_DOWN_LEFT = { col: -1, row: 2 };
const KNIGHT_DOWN_RIGHT = { col: 1, row: 2 };
const KNIGHT_LEFT_UP = { col: -2, row: -1 };
const KNIGHT_LEFT_DOWN = { col: -2, row: 1 };
const KNIGHT_RIGHT_UP = { col: 2, row: -1 };
const KNIGHT_RIGHT_DOWN = { col: 2, row: 1 };

class Piece {
    row;
    col;
    color;
    constructor(col, row, color) {
        this.row = row;
        this.col = col;
        this.color = color;
    }
    getPosition() {
        return { x: this.col, y: this.row };
    }
    isOutOfBounds(col, row) {
        if (col < 0 || col > 7 || row < 0 || row > 7) return true;
        return false;
    }
}

class Rook extends Piece {
    symbol = UNICODE_PIECES.rook;
    getPossibleMoves(currentBoard) {
        const possibleMoves = [];
        const directions = [
            { ...UP, collided: false },
            { ...DOWN, collided: false },
            { ...LEFT, collided: false },
            { ...RIGHT, collided: false },
        ];

        const MIN_MOVES = 1;
        const MAX_MOVES = 8;

        for (let i = MIN_MOVES; i < MAX_MOVES; i++) {
            for (let j = 0; j < directions.length; j++) {
                const { col, row, collided } = directions[j];
                if (collided) continue;
                const [newCol, newRow] = [
                    this.col + col * i,
                    this.row + row * i,
                ];
                if (!this.isOutOfBounds(newCol, newRow)) {
                    const tileBeingChecked = currentBoard[newRow][newCol];
                    if (tileBeingChecked !== null) {
                        if (tileBeingChecked.color !== this.color) {
                            possibleMoves.push({
                                col: newCol,
                                row: newRow,
                                attack: true,
                            });
                        }
                        directions[j].collided = true;
                    } else {
                        possibleMoves.push({
                            col: newCol,
                            row: newRow,
                            attack: false,
                        });
                    }
                }
            }
        }
        return possibleMoves;
    }
}

class Bishop extends Piece {
    symbol = UNICODE_PIECES.bishop;
    getPossibleMoves(currentBoard) {
        const possibleMoves = [];
        const directions = [
            { ...DIAGONAL_UP_LEFT, collided: false },
            { ...DIAGONAL_UP_RIGHT, collided: false },
            { ...DIAGONAL_DOWN_LEFT, collided: false },
            { ...DIAGONAL_DOWN_RIGHT, collided: false },
        ];

        const MIN_MOVES = 1;
        const MAX_MOVES = 8;

        for (let i = MIN_MOVES; i < MAX_MOVES; i++) {
            for (let j = 0; j < directions.length; j++) {
                const { col, row, collided } = directions[j];
                if (collided) continue;
                const [newCol, newRow] = [
                    this.col + col * i,
                    this.row + row * i,
                ];
                if (!this.isOutOfBounds(newCol, newRow)) {
                    const tileBeingChecked = currentBoard[newRow][newCol];
                    if (tileBeingChecked !== null) {
                        if (tileBeingChecked.color !== this.color) {
                            possibleMoves.push({
                                col: newCol,
                                row: newRow,
                                attack: true,
                            });
                        }
                        directions[j].collided = true;
                    } else {
                        possibleMoves.push({
                            x: newCol,
                            y: newRow,
                            attack: false,
                        });
                    }
                }
            }
        }
        return possibleMoves;
    }
}

class Knight extends Piece {
    symbol = UNICODE_PIECES.knight;
    getPossibleMoves(currentBoard) {
        const possibleMoves = [];
        const directions = [
            KNIGHT_UP_LEFT,
            KNIGHT_UP_RIGHT,
            KNIGHT_DOWN_LEFT,
            KNIGHT_DOWN_RIGHT,
            KNIGHT_LEFT_UP,
            KNIGHT_LEFT_DOWN,
            KNIGHT_RIGHT_UP,
            KNIGHT_RIGHT_DOWN,
        ];

        for (const { col, row } of directions) {
            const [newCol, newRow] = [this.col + col, this.row + row];
            if (!this.isOutOfBounds(newCol, newRow)) {
                const tileBeingChecked = currentBoard[newRow][newCol];
                if (tileBeingChecked !== null) {
                    if (tileBeingChecked.color !== this.color) {
                        possibleMoves.push({
                            col: newCol,
                            row: newRow,
                            attack: true,
                        });
                    }
                } else {
                    possibleMoves.push({
                        col: newCol,
                        row: newRow,
                        attack: false,
                    });
                }
            }
        }
        return possibleMoves;
    }
}

class Queen extends Piece {
    symbol = UNICODE_PIECES.queen;
    getPossibleMoves(currentBoard) {
        const possibleMoves = [];
        const directions = [
            { ...UP, collided: false },
            { ...DOWN, collided: false },
            { ...LEFT, collided: false },
            { ...RIGHT, collided: false },
            { ...DIAGONAL_UP_LEFT, collided: false },
            { ...DIAGONAL_UP_RIGHT, collided: false },
            { ...DIAGONAL_DOWN_LEFT, collided: false },
            { ...DIAGONAL_DOWN_RIGHT, collided: false },
        ];

        const MIN_MOVES = 1;
        const MAX_MOVES = 8;

        for (let i = MIN_MOVES; i < MAX_MOVES; i++) {
            for (let j = 0; j < directions.length; j++) {
                const { col, row, collided } = directions[j];
                if (collided) continue;
                const [newCol, newRow] = [
                    this.col + col * i,
                    this.row + row * i,
                ];
                if (!this.isOutOfBounds(newCol, newRow)) {
                    const tileBeingChecked = currentBoard[newRow][newCol];
                    if (tileBeingChecked !== null) {
                        if (tileBeingChecked.color !== this.color) {
                            possibleMoves.push({
                                col: newCol,
                                row: newRow,
                                attack: true,
                            });
                        }
                        directions[j].collided = true;
                    } else {
                        possibleMoves.push({
                            x: newCol,
                            y: newRow,
                            attack: false,
                        });
                    }
                }
            }
        }
        return possibleMoves;
    }
}

class King extends Piece {
    symbol = UNICODE_PIECES.king;
    getPossibleMoves(currentBoard) {
        const possibleMoves = [];
        const directions = [
            UP,
            DOWN,
            LEFT,
            RIGHT,
            DIAGONAL_UP_LEFT,
            DIAGONAL_UP_RIGHT,
            DIAGONAL_DOWN_LEFT,
            DIAGONAL_DOWN_RIGHT,
        ];

        for (const { col, row } of directions) {
            const [newCol, newRow] = [this.col + col, this.row + row];
            if (!this.isOutOfBounds(newCol, newRow)) {
                const tileBeingChecked = currentBoard[newRow][newCol];
                if (tileBeingChecked !== null) {
                    if (tileBeingChecked.color !== this.color) {
                        possibleMoves.push({
                            col: newCol,
                            row: newRow,
                            attack: true,
                        });
                    }
                } else {
                    possibleMoves.push({
                        col: newCol,
                        row: newRow,
                        attack: false,
                    });
                }
            }
        }
        return possibleMoves;
    }
}

class Pawn extends Piece {
    symbol = UNICODE_PIECES.pawn;
    hasMoved = false;
    getPossibleMoves() {
        // Placeholder, logic for the pawn movement WIP
        // It's strange to code because of how attacking is different from moving
        return "Not implemented, pawns are tricky!";
    }
}

/*

    Todo:
     - Add logic for finding valid attacking moves
     - Add logic for stopping the possible moves search in a specific direction once you hit a piece (piece collision)

*/
