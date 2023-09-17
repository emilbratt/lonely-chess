const UNICODE_PIECES = {
    bishop: "♝",
    king: "♚",
    knight: "♞",
    pawn: "♟",
    queen: "♛",
    rook: "♜",
};

const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x: -1, y: 0 };
const RIGHT = { x: 1, y: 0 };
const DIAGONAL_UP_LEFT = { x: -1, y: -1 };
const DIAGONAL_UP_RIGHT = { x: 1, y: -1 };
const DIAGONAL_DOWN_LEFT = { x: -1, y: 1 };
const DIAGONAL_DOWN_RIGHT = { x: 1, y: 1 };
const KNIGHT_UP_LEFT = { x: -1, y: -2 };
const KNIGHT_UP_RIGHT = { x: 1, y: -2 };
const KNIGHT_DOWN_LEFT = { x: -1, y: 2 };
const KNIGHT_DOWN_RIGHT = { x: 1, y: 2 };
const KNIGHT_LEFT_UP = { x: -2, y: -1 };
const KNIGHT_LEFT_DOWN = { x: -2, y: 1 };
const KNIGHT_RIGHT_UP = { x: 2, y: -1 };
const KNIGHT_RIGHT_DOWN = { x: 2, y: 1 };

class Piece {
    x;
    y;
    color;
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    isOutOfBounds(x, y) {
        if (x < 0 || x > 7 || y < 0 || y > 7) return true;
        return false;
    }
}

class Rook extends Piece {
    symbol = UNICODE_PIECES.rook;
    getPossibleMoves() {
        const possibleMoves = [];
        const directions = [UP, DOWN, LEFT, RIGHT];

        const MIN_MOVES = 1;
        const MAX_MOVES = 8;

        for (let i = MIN_MOVES; i < MAX_MOVES; i++) {
            for (const { x, y } of directions) {
                const [newX, newY] = [this.x + x * i, this.y + y * i];
                if (!this.isOutOfBounds(newX, newY)) {
                    possibleMoves.push({ x: newX, y: newY });
                }
            }
        }
        return possibleMoves;
    }
}

class Bishop extends Piece {
    symbol = UNICODE_PIECES.bishop;
    getPossibleMoves() {
        const possibleMoves = [];
        const directions = [
            DIAGONAL_UP_LEFT,
            DIAGONAL_UP_RIGHT,
            DIAGONAL_DOWN_LEFT,
            DIAGONAL_DOWN_RIGHT,
        ];

        const MIN_MOVES = 1;
        const MAX_MOVES = 8;

        for (let i = MIN_MOVES; i < MAX_MOVES; i++) {
            for (const { x, y } of directions) {
                const [newX, newY] = [this.x + x * i, this.y + y * i];
                if (!this.isOutOfBounds(newX, newY)) {
                    possibleMoves.push({ x: newX, y: newY });
                }
            }
        }
        return possibleMoves;
    }
}

class Knight extends Piece {
    symbol = UNICODE_PIECES.knight;
    getPossibleMoves() {
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

        for (const { x, y } of directions) {
            const [newX, newY] = [this.x + x, this.y + y];
            if (!this.isOutOfBounds(newX, newY)) {
                possibleMoves.push({ x: newX, y: newY });
            }
        }
        return possibleMoves;
    }
}

class Queen extends Piece {
    symbol = UNICODE_PIECES.queen;
    getPossibleMoves() {
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

        const MIN_MOVES = 1;
        const MAX_MOVES = 8;

        for (let i = MIN_MOVES; i < MAX_MOVES; i++) {
            for (const { x, y } of directions) {
                const [newX, newY] = [this.x + x * i, this.y + y * i];
                if (!this.isOutOfBounds(newX, newY)) {
                    possibleMoves.push({ x: newX, y: newY });
                }
            }
        }
        return possibleMoves;
    }
}

class King extends Piece {
    symbol = UNICODE_PIECES.king;
    getPossibleMoves() {
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

        for (const { x, y } of directions) {
            const [newX, newY] = [this.x + x, this.y + y];
            if (!this.isOutOfBounds(newX, newY)) {
                possibleMoves.push({ x: newX, y: newY });
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
