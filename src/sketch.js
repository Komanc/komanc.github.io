let block;
let board;


let cols = 9;
let rows = 24;
let blockSize = (window.innerHeight / rows) - 1;
let patterns;
let possibleSwaps;
let offsetScreen = 0;//window.innerWidth / 4;

let pressed = false;
let direction = [0, 1];
let strRow;
let strBoard;
let nextBlock = [];
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

    possibleSwaps = {
        0: null,
        1: 2,
        2: 1,
        3: 4,
        4: 3,
        5: null,
        6: null
    };

    createCanvas(window.innerWidth, wHeight);
    newGame();
}

function newGame() {
    board = new Board(rows, cols);
    let index = Math.floor(random(patterns.length));
    nextBlock[0] = new Block(patterns[index], board, index);
    index = Math.floor(random(patterns.length));
    nextBlock[1] = new Block(patterns[index], board, index);
    index = Math.floor(random(patterns.length));
    nextBlock[2] = new Block(patterns[index], board, index);
    block = newBlock();
}

/**
 * Gameloop
 */
function draw() {
    background(240);

    isBugged();

    board.show();

    block.show();

    nextBlock[0].x = cols + 2;
    nextBlock[0].y = 1;
    nextBlock[0].show();

    nextBlock[1].x = (cols * 2) + 15 + offsetScreen;
    nextBlock[1].y = 2;
    push();
    scale(0.5);
    nextBlock[1].show(0.5);
    pop();

    nextBlock[2].x = (cols * 2) + 15 + 5 + offsetScreen ;
    nextBlock[2].y = 2;
    push();
    scale(0.5);
    nextBlock[2].show(0.5);
    pop();

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

    if (keyCode === SHIFT) {
        block.swap();
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
    let index = Math.floor(random(patterns.length));
    block = nextBlock[0] || new Block(patterns[index], board, index);
    index = Math.floor(random(patterns.length));
    nextBlock[0] = nextBlock[1] || new Block(patterns[index], board, index);
    index = Math.floor(random(patterns.length));
    nextBlock[1] = nextBlock[2] || new Block(patterns[index], board, index);
    index = Math.floor(random(patterns.length));
    nextBlock[2] = new Block(patterns[index], board, index);


    block.x = 4;
    block.y = 0;

    return block;
}
