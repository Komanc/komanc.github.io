class Block
{
    constructor(pattern, board) {
        isBugged();
        // console.info(pattern);
        this.x = 4;
        this.y = 0;
        this.board = board;

        this.rotation = 0;

        this.shapes = [];

        this.color = color(random(100,200), random(100,200), random(100,200));

        let shape = pattern.replace(/\s+/g, "");

        let s = [];
        let n = Math.sqrt(shape.length);
        
        for (let i = 0; i < n; i++) {
            s[i] = [];
            for (let j = 0; j < n; j++) {
                s[i][j] = parseInt(shape[j + i * n]);
            }
        }

        this.shapes.push(s);

        let t;
        for (let r = 0; r < 3; r++) {
            t = [];
            for (let i = 0; i < n; i++) {
                t[i] = [];
                for (let j = 0; j < n; j++) {
                    t[i][j] = s[parseInt(n - j - 1)][i]
                }
            }
            s = t.slice(0);
            this.shapes.push(s);
        }

        let str = "";
        for (let s = 0; s < this.shapes.length; s++) {
            str += "\n";
            for (let i = 0; i < this.shapes[s].length; i++) {
                for (let j = 0; j < this.shapes[s][i].length; j++) {
                    str += this.shapes[s][i][j];
                }
                str += "\n";
            }
        }

        // console.info(str);
    }

    getRotation() {
        return this.shapes[this.rotation];
    }

    show() {
        let shape = this.getRotation();
        stroke(0);
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                // fill('rgba(255, 255, 50, 0.25)');
                // if (x === 0 && y === 0) {
                //     fill('rgba(200, 150, 150, 0.5)');
                //     rect(this.x * blockSize, this.y * blockSize, blockSize, blockSize);
                // }

                if (shape[y][x] === 1) {
                    fill(this.color);
                    // textAlign(CENTER, CENTER);
                    // fill(255);
                    // text(y + ":" + x, ((x + this.x) * blockSize) + blockSize / 2, ((y + this.y) * blockSize) + blockSize / 2);
                    rect((x + this.x) * blockSize, (y + this.y) * blockSize, blockSize, blockSize);
                }
            }
        }
        isBugged();
    }

    move(direction) {
        this.x += direction[0];
        this.y += direction[1];
    }

    nextRotation() {
        if (this.rotation === this.shapes.length - 1) {
            return 0;
        } else {
            return this.rotation + 1;
        }
    }

    rotate() {
        if (this.rotation === this.shapes.length - 1) {
            this.rotation = 0;
        } else {
            this.rotation++;
        }
        isBugged();
    }

    check(direction, rotation) {
        isBugged();
        let bX = this.x;
        let bY = this.y;
        let r = rotation ? this.nextRotation() : this.rotation;

        let pattern = block.shapes[r];
        for (let y = 0; y < pattern.length; y++) {
            for (let x = 0; x < pattern[y].length; x++) {
                if (pattern[y][x] !== 0) {
                    if (x + bX + direction[0] < 0 || cols - 1 < x + bX + direction[0]) {
                        // console.info("Out of X");
                        return false;
                    }

                    if (rows - 1 < y + bY + direction[1]) {
                        // console.info("Out of Y");
                        return false;
                    }

                    let indexY = (y + bY + direction[1]) < 0 ? 0 : (y + bY + direction[1]);
                    // console.info(x + bY + direction[1], bX + direction[0], this.board.board[indexY][bX + direction[0]]);
                    if (this.board.board[indexY][x + bX + direction[0]] !== 0) {
                        // console.info("Hit block");
                        return false;
                    }
                }
            }
        }

        return true;
    }
}



