const clrGreen = getComputedStyle(document.documentElement).getPropertyValue("--clr-green");

const c = document.getElementById("theCanvas");
const ctx = c.getContext("2d");
ctx.canvas.width = c.clientWidth;
ctx.canvas.height = c.clientHeight;


const NodeSize = ctx.canvas.width/15;
class Node {
    color = clrGreen;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, NodeSize, NodeSize);
    }
}

let node = new Node(100, 100);



ctx.strokeStyle = clrGreen;
ctx.fillStyle = clrGreen;

ctx.strokeRect(0, 0, c.clientWidth, c.clientHeight)
node.draw();