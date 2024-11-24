//let x = 6;
var snakeLength = 3;
var xPos = 7;
var yPos = 4;
var xDir = 1;
var yDir = 0;
var vel = 1.1;
var snakeMoveInterval = 500;

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 300, 200);
ctx.fillStyle = "black";
ctx.fillRect(20*xPos, 20*yPos, 20, 20);

window.addEventListener("keydown", (e) => {
    if (e.code=="ArrowUp"){
        xDir = 0;
        yDir = -1;
    }
  });

snakeInterval = setInterval(() => {
    time = 0;
    ctx.clearRect(0,0,300,200);
    xPos += xDir*vel;
    yPos += yDir*vel;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 300, 200);
    ctx.fillStyle = "black";
    ctx.fillRect(20*xPos, 20*yPos, 20, 20);
}, snakeMoveInterval);
//To stop this function, call clearInterval(snakeInterval);