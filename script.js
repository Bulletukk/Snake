class Snake {
    constructor() {
        this.snakeLength = 3;
        this.xDir = 1;
        this.yDir = 0;
        this.positions = [[5,6],[4,6],[3,6]];
        this.shouldLengthen = false;
        this.skipFrequency = 4; //How many frame updates between each snake move.
    }

    setDir(key) {
        if (key=="ArrowUp" && this.yDir!=1){
            this.xDir = 0;
            this.yDir = -1;
            return true;
        } else if (key=="ArrowLeft" && this.xDir!=1){
            this.xDir = -1;
            this.yDir = 0;
            return true;
        } else if (key=="ArrowDown" && this.yDir!=-1){
            this.xDir = 0;
            this.yDir = 1;
            return true;
        } else if (key=="ArrowRight" && this.xDir!=-1){
            this.xDir = 1;
            this.yDir = 0;
            return true;
        }
        return false;
    }
    move() {
        if (this.shouldLengthen==true){
            this.positions.push(this.positions[this.positions.length-1])
            for (var i=this.positions.length-2;i--;i>0){
                this.positions[i] = this.positions[i-1];
            }
            this.positions[0][0] += this.xDir;
            this.positions[0][1] += this.yDir;
            this.shouldLengthen=false;
            if (this.skipFrequency>1){
                this.skipFrequency -= 0.25;
            }
        } else {
            for (var i=this.positions.length-1;i>0;i--){
                this.positions[i] = [this.positions[i-1][0],this.positions[i-1][1]];
            }
            this.positions[0][0] += this.xDir;
            this.positions[0][1] += this.yDir;
        }
    }
};
//Method: multiply snakemoveinterval by 4/5 every time.
var s = new Snake();
var minSnakeMoveInterval = 50;
var recWidth = 620;
var recHeight = 300;
var takeInput = false;
var updateCount = 0;

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, recWidth, recHeight);

window.addEventListener("keydown", (e) => {
    if (takeInput==true){
        s.setDir(e.code);
        takeInput=false;
    }
});

snakeInterval = setInterval(() => {
    ctx.clearRect(0,0,recWidth,recHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, recWidth, recHeight);
    ctx.fillStyle = "black";
    for(var i=0;i<s.positions.length;i++){
        console.log(20*s.positions[i][0],20*s.positions[i][1]);
        ctx.fillRect(20*s.positions[i][0], 20*s.positions[i][1], 20, 20);
    }
    if (updateCount>s.skipFrequency){
        s.move();
        updateCount = 0;
        takeInput = true;
    } else {
        updateCount++;
    }
}, minSnakeMoveInterval);
//To stop this function, call clearInterval(snakeInterval);