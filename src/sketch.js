let block;
let board;

let blockSize = 40;
let cols = 10;
let rows = 24;
let patterns;

let pressed = false;
let direction = [0, 1];
let strRow;
let strBoard;
let debug = false;
let nextBlock;
let score = 0;

console.tetris = {};
console.tetris.debug = function() {
    debug && console.debug(...arguments);
};

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
    ];

    createCanvas(wWidth, wHeight);
    board = new Board(rows, cols);
    block = newBlock();
}

function draw() {
    background(255);

    isBugged();

    board.show();

    block.show();

    nextBlock.x = cols + 2;
    nextBlock.y = 1;
    nextBlock.show();

    fill(0);
    
    textSize(24);
    text(score, (cols + 2) * blockSize, 6 *blockSize);

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
            // block.freeze = true;
            board.save(block);
            board.checkRows();
            block = newBlock();
        }
    }

}

function keyPressed() {
    // let direction = [0, 0];

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
            textAlign(CENTER, CENTER);
            text(msg, width / 2, height / 2);
            noLoop();
        }
    }
}

function newBlock() {
    block = nextBlock || new Block(random(patterns), board);
    nextBlock = new Block(random(patterns), board);

    block.x = 4;
    block.y = 0;

    return block;
}