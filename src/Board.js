class Board
{
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.board = [];

        // console.info("Rows", this.rows, "Cols", this.cols);

        for (let y = 0; y < this.rows; y++) {
            this.board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = 0;//x + ":" + y;
            }

            // console.table(this.board);
        }

        // console.table(this.board);
    }

    show() {
        // console.clear();
        // console.table(this.board);
        // console.info("Board show");
        
        // console.log(str);

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                fill(255);
                if (this.board[y][x] !== 0) {
                    fill(200, 200, 0);
                }


                rect(x * blockSize, y * blockSize, blockSize, blockSize);
                // fill(0, 200, 0);
                // textAlign(CENTER, CENTER);
                // text(y + ":" + x + ":" + this.board[y][x], blockSize * x + blockSize/2, blockSize * y + blockSize/2);
            }
        }
        isBugged();
    }

    save(block) {
        // console.table(this.board);
        let bX = block.x;
        let bY = block.y;
        // console.info("SAVE");
        let pattern = block.getRotation();
        // console.info(pattern);
        console.tetris.debug("velikost", pattern.length, "x", pattern[0].length);
        let projito = 0, upraveno = 0;
        for (let y = 0; y < pattern.length; y++) {
            for (let x = 0; x < pattern[y].length; x++) {

                if (pattern[y][x] === 1) {
                    console.tetris.debug(bY, bX, "(", y, x, ") =>", y + bY, x + bX);
                    // this.board[x + bX][y + bY] = 1;
                    this.board[y + bY][x + bX] = block.color;
                    upraveno++;
                }
                // console.info(strBoard);
                projito++
            }
        }
        console.tetris.debug("Zmeneny vsechny prvky, projito: ", projito, " upraveno: ", upraveno);

        console.tetris.debug(this.toString());
        isBugged();
    }

    checkRows() {
        // console.info("checkRows");
        // console.table(this.board);
        let full;
        for (let y = this.board.length-1; y > 0; y--) {
            full = true;
            // console.info(y, this.board[y]);
            for (let x = 0; x < this.board[y].length; x++) {
                // console.info("X", x, "Y", y, "Val", this.board[y][x]);
                if (this.board[y][x] === 0) {
                    full = false;
                }
            }

            // noLoop();
            // break;
            if (full) {
                console.tetris.debug("full", full);
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



