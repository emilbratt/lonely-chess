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
    constructor(row, col, color) {
        this.row = row;
        this.col = col;
        this.color = color;
    }
    getPosition() {
        return { row: this.row, col: this.col };
    }
    setPosition(row, col) {
        this.row = row;
        this.col = col;
    }
    isOutOfBounds(col, row) {
        if (col < 0 || col > 7 || row < 0 || row > 7) return true;
        return false;
    }
    getMovesFromMinMaxMoves(minMoves, maxMoves, directions, _currentPosition) {
        /*
         * Try to move a piece until it:
         *       - reaches its maxMoves limit
         *       - collides with the edge (out of bounds)
         *       - collides with a friendly piece (attack is set to false)
         *       - captures an enemy piece (attack is set to true)
         *
         * Each direction tested is passed in the 3rd parameter
         * Knowing what each tile currently contains is passed in the 4th parameter
         */
        const possibleMoves = [];
        for (let i = minMoves; i <= maxMoves; i++) {
            for (let j = 0; j < directions.length; j++) {
                const { col, row, collided } = directions[j];
                const [newCol, newRow] = [
                    this.col + col * i,
                    this.row + row * i,
                ];
                if (this.isOutOfBounds(newCol, newRow) || collided) continue;
                const tileBeingChecked = _currentPosition[newRow][newCol];
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
        return possibleMoves;
    }
}

class Rook extends Piece {
    symbol = UNICODE_PIECES.rook;
    getPossibleMoves(_currentPosition) {
        const directions = [
            { ...UP, collided: false },
            { ...DOWN, collided: false },
            { ...LEFT, collided: false },
            { ...RIGHT, collided: false },
        ];

        const MIN_MOVES = 1;
        const MAX_MOVES = 7;

        return this.getMovesFromMinMaxMoves(
            MIN_MOVES,
            MAX_MOVES,
            directions,
            _currentPosition
        );
    }
}

class Bishop extends Piece {
    symbol = UNICODE_PIECES.bishop;
    getPossibleMoves(_currentPosition) {
        const directions = [
            { ...DIAGONAL_UP_LEFT, collided: false },
            { ...DIAGONAL_UP_RIGHT, collided: false },
            { ...DIAGONAL_DOWN_LEFT, collided: false },
            { ...DIAGONAL_DOWN_RIGHT, collided: false },
        ];

        const MIN_MOVES = 1;
        const MAX_MOVES = 7;

        return this.getMovesFromMinMaxMoves(
            MIN_MOVES,
            MAX_MOVES,
            directions,
            _currentPosition
        );
    }
}

class Knight extends Piece {
    symbol = UNICODE_PIECES.knight;
    getPossibleMoves(_currentPosition) {
        const possibleMoves = [];
        const directions = [
            { ...KNIGHT_UP_LEFT },
            { ...KNIGHT_UP_RIGHT },
            { ...KNIGHT_DOWN_LEFT },
            { ...KNIGHT_DOWN_RIGHT },
            { ...KNIGHT_LEFT_UP },
            { ...KNIGHT_LEFT_DOWN },
            { ...KNIGHT_RIGHT_UP },
            { ...KNIGHT_RIGHT_DOWN },
        ];

        for (const { col, row } of directions) {
            const [newCol, newRow] = [this.col + col, this.row + row];
            if (this.isOutOfBounds(newCol, newRow)) continue;
            const tileBeingChecked = _currentPosition[newRow][newCol];
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
        return possibleMoves;
    }
}

class Queen extends Piece {
    symbol = UNICODE_PIECES.queen;
    getPossibleMoves(_currentPosition) {
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
        const MAX_MOVES = 7;

        return this.getMovesFromMinMaxMoves(
            MIN_MOVES,
            MAX_MOVES,
            directions,
            _currentPosition
        );
    }
}

class King extends Piece {
    symbol = UNICODE_PIECES.king;
    getPossibleMoves(_currentPosition) {
        const directions = [
            { ...UP },
            { ...DOWN },
            { ...LEFT },
            { ...RIGHT },
            { ...DIAGONAL_UP_LEFT },
            { ...DIAGONAL_UP_RIGHT },
            { ...DIAGONAL_DOWN_LEFT },
            { ...DIAGONAL_DOWN_RIGHT },
        ];
        const MIN_MOVES = 1;
        const MAX_MOVES = 1;

        return this.getMovesFromMinMaxMoves(
            MIN_MOVES,
            MAX_MOVES,
            directions,
            _currentPosition
        );
    }
}

class Pawn extends Piece {
    symbol = UNICODE_PIECES.pawn;
    hasMoved = false;
    getPossibleMoves(_currentPosition) {
        /*
         * It only accounts for first move, normal move, and diagonal attack.
         * Does NOT account for en passant, as we haven't even implemented moving pieces yet
         */
        const moveDirections =
            this.color === "white"
                ? [{ ...UP, collided: false }]
                : [{ ...DOWN, collided: false }];
        const attackDirections =
            this.color === "white"
                ? [{ ...DIAGONAL_UP_LEFT }, { ...DIAGONAL_UP_RIGHT }]
                : [{ ...DIAGONAL_DOWN_LEFT }, { ...DIAGONAL_DOWN_RIGHT }];

        const MIN_MOVES = 1;
        const MAX_MOVES = this.hasMoved ? 1 : 2;

        const possibleMoves = this.getPossibleMovesNoAttacks(
            MIN_MOVES,
            MAX_MOVES,
            moveDirections,
            _currentPosition
        );
        const possibleAttacks = this.getPossibleAttacks(
            attackDirections,
            _currentPosition
        );
        return [...possibleMoves, ...possibleAttacks];
    }
    getPossibleMovesNoAttacks(
        minMoves,
        maxMoves,
        directions,
        _currentPosition
    ) {
        const possibleMoves = [];
        for (let i = minMoves; i <= maxMoves; i++) {
            const { row, collided } = directions[0];
            const newRow = this.row + row * i;
            
            if (this.isOutOfBounds(this.col, newRow) || collided) continue;
            const tileBeingChecked = _currentPosition[newRow][this.col];

            if (tileBeingChecked === null) 
            {
                possibleMoves.push({col: this.col, row: newRow, attack: false,});
            } 
            else 
            {
                directions[0].collided = true;
            }
        }
        return possibleMoves;
    }
    getPossibleAttacks(attackDirections, _currentPosition) {
        const possibleAttacks = [];
        for (const { col, row } of attackDirections) {
            const [newCol, newRow] = [this.col + col, this.row + row];

            if (this.isOutOfBounds(newCol, newRow)) continue;
            const tileBeingChecked = _currentPosition[newRow][newCol];

            if (tileBeingChecked !== null &&tileBeingChecked.color !== this.color)
            {
                possibleAttacks.push({col: newCol, row: newRow, attack: true,});
            }
        }
        return possibleAttacks;
    }
}
