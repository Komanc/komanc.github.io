class BlockQueue
{
    constructor(size) {
        this.size = size || 3;
        this.queue = [];

        for (let i = 0; i < this.size; i++) {
            this.queue.push(new Block(random(patterns), board))
        }
    }

    nextBlock() {
        this.queue.push(new Block(random(patterns), board));
        return this.queue.shift();
    }

    show() {
        for (let i = 0; i < this.size; i++) {
            let queueBlock = this.queue[i];
            queueBlock.x = cols + 2;
            queueBlock.y = (i * 4) + 2;
            queueBlock.show()
        }
    }
}



