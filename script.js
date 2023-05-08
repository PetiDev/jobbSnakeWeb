const clrGreen = getComputedStyle(document.documentElement).getPropertyValue("--clr-green");
const clrRed = getComputedStyle(document.documentElement).getPropertyValue("--clr-red");

const c = document.getElementById("theCanvas");
const ctx = c.getContext("2d");
ctx.canvas.width = c.clientWidth;
ctx.canvas.height = c.clientHeight;

const widthInNodes = 15 //how many nodes needed maximum to go across the map

let game;
let score = 0;

const NodeSize = ctx.canvas.width / widthInNodes;
class Node {
    #color = clrGreen;
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.#color = color;
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
        this.#nodes.push(new Node(NodeSize, NodeSize, clrGreen));
        this.#nodes.push(new Node(0, NodeSize, clrGreen))
        this.#nodes.push(new Node(0, NodeSize, clrGreen))
    }
    eat() {
        this.#nodes.push(new Node(this.#nodes[1].x, this.#nodes[1].y))
        score++
    }
    draw() {
        this.move();
        this.#nodes.forEach(n => {
            n.draw()
        })
    }
    move() {
        let lastNode = this.#nodes.pop()
        switch (this.direction) {
            case "up":
                lastNode.y = this.#nodes[0].y - NodeSize;
                lastNode.x = this.#nodes[0].x;
                this.#nodes.unshift(lastNode);
                break;

            case "down":
                lastNode.y = this.#nodes[0].y + NodeSize;
                lastNode.x = this.#nodes[0].x;
                this.#nodes.unshift(lastNode);
                break;

            case "left":
                lastNode.x = this.#nodes[0].x - NodeSize;
                lastNode.y = this.#nodes[0].y;
                this.#nodes.unshift(lastNode);
                break;

            case "right":
                lastNode.x = this.#nodes[0].x + NodeSize;
                lastNode.y = this.#nodes[0].y;
                this.#nodes.unshift(lastNode);

            default:
                break;
        }

        //eat food
        if (this.#nodes[0].x == food.x && this.#nodes[0].y == food.y) {
            this.eat()
            cookFood()
        }

        //detect death
        if (this.#nodes[0].x < -NodeSize / 2 || this.#nodes[0].x > c.clientWidth + NodeSize / 2) {
            die()
        }
        if (this.#nodes[0].y < -NodeSize / 2 || this.#nodes[0].y > c.clientHeight + NodeSize / 2) {
            die()
        }

        for (let i = 1; i < this.#nodes.length; i++) {
            const n = this.#nodes[i];
            if (this.#nodes[0].x == n.x && this.#nodes[0].y == n.y) die();
        }


    }
}

//key events
document.addEventListener("keydown", ({ key }) => {
    switch (key) {
        case "w":
        case "ArrowUp":
            if (snake.direction == "down") return;
            snake.direction = "up"
            break;

        case "s":
        case "ArrowDown":
            if (snake.direction == "up") return;
            snake.direction = "down"
            break;

        case "a":
        case "ArrowLeft":
            if (snake.direction == "right") return;
            snake.direction = "left"
            break;

        case "d":
        case "ArrowRight":
            if (snake.direction == "left") return;
            snake.direction = "right"
            break;

        case " ":
            startGame()
            break;

        default:
            break;
    }
})

let food;
let snake = new Snake();
cookFood()


ctx.strokeStyle = clrGreen;
ctx.fillStyle = clrGreen;
ctx.strokeRect(0, 0, c.clientWidth, c.clientHeight)


ctx.font = "90px Comic Sans MS";

ctx.save();
ctx.translate(c.clientWidth / 2, c.clientWidth / 2);
ctx.rotate(Math.PI / 4);
ctx.textAlign = "center";
ctx.fillText("Snake", 0, 0);
ctx.restore();

ctx.font = "40px Calibri";



function startGame() {
    if (game) clearInterval(game)
    snake = new Snake();
    cookFood()
    score = 0

    game = setInterval(() => {
        ctx.strokeStyle = clrGreen;
        ctx.fillStyle = clrGreen;
        ctx.clearRect(0, 0, c.clientWidth, c.clientHeight)
        ctx.strokeRect(0, 0, c.clientWidth, c.clientHeight)
        snake.draw();
        food.draw();

        ctx.fillText(score, c.clientWidth / 2, c.clientHeight / 2);
    }, 500);
}

function die() {
    clearInterval(game)
    console.log("dead");

}

function randomPosition() {

    return c.clientWidth / widthInNodes * Math.floor(Math.random() * widthInNodes)
}

function cookFood() {
    food = new Node(randomPosition(), randomPosition(), clrRed)
}