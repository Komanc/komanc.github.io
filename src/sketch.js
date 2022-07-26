let block;
let board;


let cols = 10;
let rows = 24;
let blockSize = (window.innerHeight / rows) - 1;
let patterns;
let offsetScreen = 0;//window.innerWidth / 4;

let pressed = false;
let direction = [0, 1];
let strRow;
let strBoard;
let nextBlock;
let score = 0;
let paused = false;

function setup() {
    let wWidth = blockSize * cols + 300;
    let wHeight = blockSize * rows + 1;

    patterns = [
        "0000 1111 0000 0000",
        "110 010 010",
        "011 010 010",
        "110 011 000",
        "011 110 000",
        "010 111 000",
        "11 11",
        // Rozsirena sada
        // "11 00",
        // "000 111 000",
        // "1",
        // "111 010 010",
    ];

    createCanvas(window.innerWidth, wHeight);
    newGame();
}

function newGame() {
    board = new Board(rows, cols);
    block = newBlock();
}

function draw() {
    background(240);

    isBugged();

    board.show();

    block.show();

    nextBlock.x = cols + 2;
    nextBlock.y = 1;
    nextBlock.show();

    fill(0);
    
    textSize(blockSize);
    text('Score: ' + score, (cols + 2) * blockSize + offsetScreen, 6 * blockSize);

    if (paused) {
        writeOverlay("Pauza\npro novou hru\nstiskni Enter");
        return;
    }

    if (pressed) {
        if (frameCount % 4 === 0) {
            if (block.check(direction)) {
                block.move(direction);
            }
        }
    }

    if (frameCount % 30 === 0) {
        if (block.check([0, 1])) {
            block.move([0, 1]);
        } else {
            board.save(block);
            board.checkRows();
            block = newBlock();
        }
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        direction = [-1, 0];
        pressed = true;
    }

    if (keyCode === RIGHT_ARROW) {
        direction = [1, 0];
        pressed = true;
    }

    if (keyCode === UP_ARROW) {
        if (block.check([0, 0], 1)) {
            block.rotate();
        }
    }

    if (keyCode === DOWN_ARROW) {
        direction = [0, 1];
        pressed = true;
    }

    if (keyCode === 32) {
        paused = !paused;
        if (!paused) {
            loop();
        } else {
            noLoop();
        }
    }

    if (keyCode === 13) {
        paused = !paused;
        if (!paused) {
            loop();
        } else {
            noLoop();
        }

        if (window.confirm("Zahájit novou hru?")) {
            newGame();
            paused = false;
            loop();
        }
    }
}

function keyReleased() {
    direction = [0, 1];
    pressed = false;
}

function isBugged() {
    strRow = " ";
    for (let i = 0; i < board.board[0].length; i++) {
        strRow += board.board[0][i];
        if (board.board[0][i] !== 0) {
            let msg = "KONEC";
            writeOverlay(msg);
            noLoop();
        }
    }
}

function writeOverlay(msg) {
    textSize(124);
    stroke(0);
    strokeWeight(5);
    fill(0);
    textAlign(CENTER, CENTER);
    text(msg, (width / 2) + 5 , (height / 2) + 5);

    textSize(124);
    stroke(255, 0, 0);
    strokeWeight(5);
    fill(200, 100, 0);
    text(msg, width / 2, height / 2);

    strokeWeight(1);
    stroke(0);
    textAlign(LEFT, BASELINE);
}

function newBlock() {
    block = nextBlock || new Block(random(patterns), board);
    nextBlock = new Block(random(patterns), board);

    block.x = 4;
    block.y = 0;

    return block;
}
