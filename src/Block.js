class Block
{
    constructor(pattern, board, patternIndex) {
        isBugged();
        this.x = 4;
        this.y = 0;
        this.board = board;
        this.patternIndex = patternIndex;

        this.rotation = 0;

        this.color = color(random(100,200), random(100,200), random(100,200));

        this.createShape(pattern);
    }

    createShape(pattern) {
        this.shapes = [];
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
    }

    getRotation() {
        return this.shapes[this.rotation];
    }

    placeOnStart() {
        this.x = 4;
        this.y = 0;
    }

    show(blockSizeRatio = 1) {
        stroke(1);
        noStroke();
        let shape = this.getRotation();
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x] === 1) {
                    fill(this.color);
                    rect((x + this.x) * blockSize + offsetScreen, (y + this.y) * blockSize, blockSize-1, blockSize-1);
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

    swap() {
        if (!possibleSwaps[this.patternIndex]) {
             return;
        }

        this.patternIndex = possibleSwaps[this.patternIndex];
        this.createShape(patterns[this.patternIndex]);
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
                        return false;
                    }

                    if (rows - 1 < y + bY + direction[1]) {
                        return false;
                    }

                    let indexY = (y + bY + direction[1]) < 0 ? 0 : (y + bY + direction[1]);
                    if (this.board.board[indexY][x + bX + direction[0]] !== 0) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}



