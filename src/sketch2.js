let block;
let board;

let pattern;
let row;
let col;
let shapeArray = [];
let rotatedShapeArray = [];
let size;

let x = 100;
let y = 100;
let blockSize = 100;
let index;

function setup() {
    pattern = "011010010";
    row = 0;
    col = 0;
    index = 0;


    let shape = pattern.replace(/\s+/g, "");
    size = Math.sqrt(shape.length);

    console.log(shape);
    for (let row = 0; row < size; row++) {
        shapeArray[row] = [];
        rotatedShapeArray[row] = [];
        for (let col = 0; col < size; col++) {
            // console.log("Index", col + row * size, shape[col + row * size]);
            shapeArray[row][col] = shape[col + row * size];
            rotatedShapeArray[row][col] = 0;
        }
    }

    createCanvas(window.innerWidth, window.innerHeight);
}

let row1 = 0;
let col1 = 0;

let row2 = 0;
let col2 = 2;


function draw() {
    if (frameCount % 100 !== 0) {
        return;
    }
    background(240);
    let patternShape = pattern.replace(/\s+/g, "");
    for (let i = 0; i < patternShape.length; i++) {
        noStroke();
        textSize(50);
        fill(0)
        if (patternShape[i] === "1") {
            fill(255,0,0);
        }
        if (index === i) {
            fill(0,255,0);
        }
        textAlign(CENTER);
        text(patternShape[i], 50 + i * 50, 50);
    }


    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            // console.info(x + (col * blockSize), x + (row * blockSize), blockSize, blockSize);
            fill(255);
            if (shapeArray[row][col] === "1") {
                fill(255, 0, 0);
            }

            if (row === row1 && col === col1) {
                fill(0, 255, 0);
            }

            stroke(0);
            strokeWeight(5);
            rect(x + (col * blockSize), y + (row * blockSize), blockSize, blockSize);
            textSize(20);
            textAlign(CENTER);
            noStroke();
            fill(0,0,255);
            text(row + "," + col, x + (col * blockSize) + blockSize * 0.5, (y + (row * blockSize) + blockSize * 0.5) + 6);
        }
    }

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            fill(255);
            if (rotatedShapeArray[row][col] === "1") {
                fill(255, 0, 0);
            }

            if (row === row2 && col === col2) {
                fill(0, 255, 0);
            }

            stroke(0);
            strokeWeight(5);
            rect(x + 500 + (col * blockSize), y + (row * blockSize), blockSize, blockSize);
            textSize(20);
            textAlign(CENTER);
            noStroke();
            fill(0,0,255);
            text(row + "," + col, x + 500 + (col * blockSize) + blockSize * 0.5, (y + (row * blockSize) + blockSize * 0.5) + 6);
        }
    }


    strokeWeight(3);
    stroke(125);
    line(x + (col1 * blockSize) + blockSize * 0.5, y + (row1 * blockSize) + blockSize * 0.8, x + 500 + (col2 * blockSize) + blockSize * 0.5, y + (row2 * blockSize) + blockSize * 0.8);
    fill(255);
    if (shapeArray[row1][col1] === "1") {
        fill(255,0,0);
    }
    ellipse(x + (col1 * blockSize) + blockSize * 0.5, y + (row1 * blockSize) + blockSize * 0.8, 20);
    // ellipse(x + 500 + (col2 * blockSize) + blockSize * 0.5, y + (row2 * blockSize) + blockSize * 0.8, 20);
    rotatedShapeArray[row2][col2] = shapeArray[row1][col1];

    col1++;
    if (col1 >= size) {
        row1++;
        if (row1 >= size) {
            row1 = 0;
        }
        col1 = 0;
    }

    row2++;
    if (row2 >= size) {
        col2--;
        if (col2 < 0) {
            col2 = 2;
        }
        row2 = 0;
    }


    index++;
    if (index >= pattern.length) {
        index = 0;
    }
    // noLoop();
}

function keyPressed() {
    console.info(keyCode);
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
        loop();
        // draw();
        // paused = !paused;
        // if (!paused) {
        //     loop();
        // } else {
        //     noLoop();
        // }
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
    // strRow = " ";
    for (let i = 0; i < board.board[0].length; i++) {
        // strRow += board.board[0][i];
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
