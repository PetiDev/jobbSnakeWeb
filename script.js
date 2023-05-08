const clrGreen = getComputedStyle(document.documentElement).getPropertyValue("--clr-green");

const c = document.getElementById("theCanvas");
const ctx = c.getContext("2d");
ctx.canvas.width = c.clientWidth;
ctx.canvas.height = c.clientHeight;

const widthInNodes = 15 //how many nodes needed maximum to go across the map

let game;

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

    }
}

//key events
document.addEventListener("keydown", ({ key }) => {
    switch (key) {
        case "ArrowUp":
            if (snake.direction == "down") return;
            snake.direction = "up"
            break;
            
            case "ArrowDown":
            if (snake.direction == "up") return;
            snake.direction = "down"
            break;
            
            case "ArrowLeft":
            if (snake.direction == "right") return;
            snake.direction = "left"
            break;
            
            case "ArrowRight":
            if (snake.direction == "left") return;
            snake.direction = "right"
            break;

        default:
            break;
    }
})



let snake = new Snake();
let food;
cookFood()


ctx.strokeStyle = clrGreen;
ctx.fillStyle = clrGreen;
ctx.strokeRect(0, 0, c.clientWidth, c.clientHeight)

function startGame() {
    game = setInterval(() => {
        ctx.strokeStyle = clrGreen;
        ctx.fillStyle = clrGreen;
        ctx.clearRect(0, 0, c.clientWidth, c.clientHeight)
        ctx.strokeRect(0, 0, c.clientWidth, c.clientHeight)
        snake.draw();
        food.draw()
    }, 500);
}

function die() {
    clearInterval(game)
    console.log("dead");
}

function randomPosition() {
    
    return c.clientWidth/widthInNodes * Math.floor(Math.random() * widthInNodes)
}

function cookFood() {
    food = new Node(randomPosition(), randomPosition(), "red")
}