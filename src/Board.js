class Board
{
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.board = [];

        this.rowsToDelete = [];

        for (let y = 0; y < this.rows; y++) {
            this.board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = 0;
            }
        }
    }

    show() {
        stroke(220);
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                fill(255);

                if (this.board[y][x] !== 0) {
                    fill(200, 0, 0);
                }

                rect((x * blockSize) + offsetScreen, y * blockSize, blockSize-1, blockSize-1);
            }
        }
        isBugged();
    }

    save(block) {
        let bX = block.x;
        let bY = block.y;
        let pattern = block.getRotation();

        for (let y = 0; y < pattern.length; y++) {
            for (let x = 0; x < pattern[y].length; x++) {
                if (pattern[y][x] === 1) {
                    this.board[y + bY][x + bX] = block.color;
                }
            }
        }
        isBugged();
    }

    checkRows() {
        let full;
        for (let y = this.board.length-1; y > 0; y--) {
            full = true;
            for (let x = 0; x < this.board[y].length; x++) {
                if (this.board[y][x] === 0) {
                    full = false;
                }
            }

            if (full) {
                this.removeRow(y);
                score++;
                y++;
            }
        }
        isBugged();
    }

    removeRow(row) {
        for (let r = row; r > 0; r--) {
            for (let c = 0; c < this.cols; c++)
            this.board[r][c] = this.board[r-1][c];
        }
        isBugged();
    }

    toString() {
        strBoard = "";
        for (let y = 0; y < this.rows; y++) {
            strBoard += "\n";
            for (let x = 0; x < this.cols; x++) {
                strBoard += this.board[y][x]
            }
            strBoard += "\n";
        }

        return strBoard;
    }
}



