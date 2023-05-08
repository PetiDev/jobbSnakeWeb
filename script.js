const clrGreen = getComputedStyle(document.documentElement).getPropertyValue("--clr-green");

const c = document.getElementById("theCanvas");
const ctx = c.getContext("2d");
ctx.canvas.width = c.clientWidth;
ctx.canvas.height = c.clientHeight;

let game;
let inGame = false;

const NodeSize = ctx.canvas.width / 15;
class Node {
    #color = clrGreen;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.strokeStyle = this.#color;
        ctx.fillStyle = this.#color;
        ctx.fillRect(this.x, this.y, NodeSize, NodeSize);
    }
}

class Snake {
    #nodes = [];
    direction = "right";
    constructor() {
        this.#nodes.push(new Node(NodeSize, NodeSize));
        this.#nodes.push(new Node(0, NodeSize))
    }
    draw() {
        this.#nodes.forEach(n => {
            n.draw()
        })
        this.move();
    }
    move() {
        let lastNode = this.#nodes.pop()
        switch (this.direction) {
            case "up":
                lastNode.y = this.#nodes[0].y - NodeSize;
                this.#nodes.unshift(lastNode);
                break;

            case "down":
                lastNode.y = this.#nodes[0].y + NodeSize;
                this.#nodes.unshift(lastNode);
                break;

            case "left":
                lastNode.x = this.#nodes[0].x - NodeSize;
                this.#nodes.unshift(lastNode);

            case "right":
                lastNode.x = this.#nodes[0].x + NodeSize;
                this.#nodes.unshift(lastNode);

            default:
                break;
        }
    }
}



let snake = new Snake();

ctx.strokeStyle = clrGreen;
ctx.fillStyle = clrGreen;


game = setInterval(() => {
    if(!inGame)clearInterval(game);
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight)
    ctx.strokeRect(0, 0, c.clientWidth, c.clientHeight)
    snake.draw();
}, 500);

