class Block
{
    constructor(pattern, board, patternIndex) {
        isBugged();
        this.x = 4;
        this.y = 0;
        this.board = board;
        this.patternIndex = patternIndex;
        this.shapes = [];

        this.rotation = 0;

        this.color = color(random(100,200), random(100,200), random(100,200));

        this.createShape(pattern);
    }

    /**
     * Prevede vzor tvaru na mrizku a vypocita mrizky moznych rotaci tvaru.
     *
     * Predany vzor tvaru musi odpovidat formatu "r1r1 r2r2", kde pocet skupin musi odpovidat poctu znaku ve skupine.
     * Napriklad tvar kosticky bude zapsan jako "11 11", tvar "T" jako "000 111 010".
     *
     * Tvar muze byt pro prehlednost zapsan viceradkove. Napriklad tvar "T" jako
     * <pre>
     * const shapeT = "000" +
     *                "111" +
     *                "010";
     * </pre>
     * @param pattern vzor tvaru ve formatu "r1r1 r2r2"
     * @returns {void}
     */
    createShape(pattern) {
        this.shapes = [];
        let shapePattern = pattern.replace(/\s+/g, "");

        let shape = [];
        let n = Math.sqrt(shapePattern.length);

        for (let i = 0; i < n; i++) {
            shape[i] = [];
            for (let j = 0; j < n; j++) {
                shape[i][j] = parseInt(shapePattern[j + i * n]);
            }
        }

        this.shapes.push(shape);

        // Vypocita mozne rotace bloku
        let rotatedShape;
        for (let r = 0; r < 3; r++) {
             rotatedShape = [];
            for (let i = 0; i < n; i++) {
                rotatedShape[i] = [];
                for (let j = 0; j < n; j++) {
                    rotatedShape[i][j] = shape[n - j - 1][i];
                }
            }

            shape = rotatedShape.slice(0);
            this.shapes.push(shape);
        }
    }

    /**
     * Vrati tvar v momentalne nastavene rotaci.
     *
     * @returns {*}
     */
    getRotation() {
        return this.shapes[this.rotation];
    }

    /**
     * Nakresli blok na hraci plochu.
     */
    show() {
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

    /**
     * Posune blok na novou pozici.
     *
     * @param direction pole s velikosti posunu ve smeru x (prvni pozice v poli) a y (druha pozice v poli),
     */
    move(direction) {
        this.x += direction[0];
        this.y += direction[1];
    }

    /**
     * Vrati index dalsi rotace v poradi.
     * 
     * @returns {number}
     */
    nextRotation() {
        if (this.rotation === this.shapes.length - 1) {
            return 0;
        } else {
            return this.rotation + 1;
        }
    }

    /**
     *  Zmeni index rotace a zkontroluje, jestli se blok zasekl nebo lze pokracovat ve hre.
     */
    rotate() {
        if (this.rotation === this.shapes.length - 1) {
            this.rotation = 0;
        } else {
            this.rotation++;
        }
        isBugged();
    }

    /**
     * Prohodi blok za jiny podle preddefinovane mapy.
     *
     * @see possibleSwaps ve sketch.js;
     */
    swap() {
        if (possibleSwaps[this.patternIndex] == null) {
             return;
        }

        this.patternIndex = possibleSwaps[this.patternIndex];
        this.createShape(patterns[this.patternIndex]);
    }

    /**
     * Zkontroluje, jestli je mozne blok posunout v danem smeru nebo ho orotovat.
     *
     * @param direction
     * @param rotation
     * @returns {boolean}
     */
    check(direction, rotation) {
        isBugged();
        let bX = this.x;
        let bY = this.y;
        let r = rotation ? this.nextRotation() : this.rotation;

        let pattern = block.shapes[r];
        for (let y = 0; y < pattern.length; y++) {
            for (let x = 0; x < pattern[y].length; x++) {
                if (pattern[y][x] !== 0) {
                    // Preskocila by v dalsim kroku kosticka pres spodni okraj hraci plochy?
                    if (rows - 1 < y + bY + direction[1]) {
                        return false;
                    }

                    // Prekryl by blok v dalsim kroku jiny blok, nebo okraje hraci plochy?
                    // Je nova souradnice neco jineho nez prazdne pole?
                    let indexY = (y + bY + direction[1]) < 0 ? 0 : (y + bY + direction[1]);
                    if (this.board.board[y + bY + direction[1]][x + bX + direction[0]] !== 0) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}



