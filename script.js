class SnakeGame {
    constructor() {
        this.xDir = 1;
        this.yDir = 0;
        this.maxX = 30;
        this.maxY = 14;
        this.snakePositions = [[5,6],[4,6],[3,6]];
        this.dot = null;
        this.skipFrequency = 6; //How many frame updates between each snake move.
        this.setNewDot();
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
    setNewDot() {
        var foundLegalPlace = false;
        while (foundLegalPlace==false) {
            this.dot = [Math.floor(Math.random()*(this.maxX+1)),Math.floor(Math.random()*(this.maxY+1))];
            foundLegalPlace = true;
            //Check if snake occupies the dot position:
            for (var i=0;i<this.snakePositions.length;i++) {
                if (this.dot[0]==this.snakePositions[i][0] && this.dot[1]==this.snakePositions[i][1]) {
                    foundLegalPlace = false;
                }
            }
            //Check if dot is right in front of snake:
            if (this.snakePositions[0][0]+this.xDir==this.dot[0] && this.snakePositions[0][1]+this.yDir==this.dot[1]){
                foundLegalPlace = false;
            }
        }
    }
    move() {
        //Moves snake, returns whether we're still in game or not (game over)
        if (this.dot[0]==this.snakePositions[0][0] && this.dot[1]==this.snakePositions[0][1]){
            //Eating dot, lenthening snake, moving snake
            this.snakePositions.push(this.snakePositions[this.snakePositions.length-1])
            for (var i=this.snakePositions.length-2;i>0;i--){
                this.snakePositions[i] = [this.snakePositions[i-1][0],this.snakePositions[i-1][1]];
            }
            this.snakePositions[0][0] += this.xDir;
            this.snakePositions[0][1] += this.yDir;
            if (this.skipFrequency>1){
                this.skipFrequency -= 0.25; //Increase the speed of the snake (reduce the frequency) if max speed hasn't been reached.
                console.log(this.skipFrequency);
            }
            this.setNewDot();
        } else {
            //Just moving snake
            for (var i=this.snakePositions.length-1;i>0;i--){
                this.snakePositions[i] = [this.snakePositions[i-1][0],this.snakePositions[i-1][1]];
            }
            this.snakePositions[0][0] += this.xDir;
            this.snakePositions[0][1] += this.yDir;
            if (!this.legalMove()) {
                this.lose();
            }
        }
        return true;
    }
    legalMove() {
        //Check if snake has hit edge of board or itself
        return true;
    }
    lose() {
        //Temporary code
        this.snakePositions = [[5,6],[4,6],[3,6]];
        this.skipFrequency = 4;
    }
};

var s = new SnakeGame();
var minSnakeMoveInterval = 25;
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
    for(var i=0;i<s.snakePositions.length;i++){
        ctx.fillRect(20*s.snakePositions[i][0], 20*s.snakePositions[i][1], 20, 20);
    }
    ctx.fillRect(20*s.dot[0],20*s.dot[1],20,20);
    if (updateCount>s.skipFrequency){
        s.move();
        updateCount = 0;
        takeInput = true;
    } else {
        updateCount++;
    }
}, minSnakeMoveInterval);
//To stop this function, call clearInterval(snakeInterval);
//TODO:
//- Create getter functions. Make sure private variables can't be changed externally.
//- Incorporate draw function in snake.