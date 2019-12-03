const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.setAttribute('width', ($("#container").width()).toString() + "px");
canvas.setAttribute('height', (window.outerHeight - 500).toString() + "px");
if (window.outerHeight < 700) {
    canvas.setAttribute('height', (window.outerHeight - 350).toString() + "px");
    $(".footer").css("position", "static");
    $(".btn").removeClass("btn-lg");
    $(".btn").addClass("btn-sm");
    $(".form-control").addClass("form-control-sm");
    UpDivHTML = $("#UpDiv").html();
    console.log(UpDivHTML);
    $("#UpDiv").remove();
    $("#row1").prepend(UpDivHTML);

}
const width = canvas.width;
const height = canvas.height;
var blockSize = 10;
for (i = 8; i < 20; i++) {
    if (width % i == 0 && height % i == 0){
         blockSize = i;
    }
}
if (blockSize == 10){
    for (i = 8; i < 20; i++) {
        if (height % i == 0){
            blockSize = i;
        }
    }
}
if (blockSize == 10) {
    for (i = 8; i < 20; i++) {
        if (width % i == 0) {
            blockSize = i;
        }
    }
}
if (window.outerHeight < 700) {blockSize = 8;}
const widthInBlocks = Math.trunc(width / blockSize);
const heightInBlocks = Math.trunc(height / blockSize);
var timeoutId;
var timeoutNumber = 100;
var tempTimeoutNumber = timeoutNumber;
var running = true;
var firstTime = true;
var varGameOver = false;
var changeVarGameOver = false;
var backgroundReturn = "white";
var snakeColorReturn = "blue";
var appleColorReturn = "red";
var score = 0;
var highScore = 0;
const button = document.getElementById("startStop");
const buttonUp = document.getElementById("Up");
const buttonDown = document.getElementById("Down");
const buttonLeft = document.getElementById("Left");
const buttonRight = document.getElementById("Right");
var buttonStop = true;
const colors = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
canvas.style.backgroundColor = "white";
button.style.backgroundColor = "black";
var drawBorder = function () {
    ctx.fillStyle = "Black"
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};
var drawScore = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score " + score, blockSize, blockSize);
};
var drawHighScore = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText("High Score " + highScore, width - blockSize, blockSize);
};
var circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle = true) {
        ctx.fill();
    }
    else {
        ctx.stroke();
    }
};
var block = function (col, row) {
    this.col = col;
    this.row = row;
};
block.prototype.drawSquare = function (color) {
    var x = this.col * blockSize;
    var y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};
block.prototype.drawCircle = function (color) {
    var centerX = this.col * blockSize + blockSize / 2;
    var centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};
block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};
var snake = function () {
    this.segments = [
        new block(7, 5),
        new block(6, 5),
        new block(5, 5)
    ];
    this.direction = "right";
    this.nextDirection = "right";
};
snake.prototype.draw = function (color) {
    for (var b = 0; b < this.segments.length; b++) {
        this.segments[b].drawSquare(color);
    }
};
snake.prototype.move = function () {
    var head = this.segments[0];
    var newHead;
    this.direction = this.nextDirection;
    if (this.direction == "right") {
        newHead = new block(head.col + 1, head.row);
    } else if (this.direction == "down") {
        newHead = new block(head.col, head.row + 1);
    } else if (this.direction == "left") {
        newHead = new block(head.col - 1, head.row);
    } else if (this.direction == "up") {
        newHead = new block(head.col, head.row - 1);
    }
    if (newHead.equal(apple.position)) {
        score++;
        apple.move()
        head = this.segments[0];
        newHead = null;
        if (this.direction == "right") {
            newHead = new block(head.col + 1, head.row);
        } else if (this.direction == "down") {
            newHead = new block(head.col, head.row + 1);
        } else if (this.direction == "left") {
            newHead = new block(head.col - 1, head.row);
        } else if (this.direction == "up") {
            newHead = new block(head.col, head.row - 1);
        }
        if (timeoutNumber > 65){
            timeoutNumber -= 5;
            tempTimeoutNumber = timeoutNumber
        }
    } else {
        this.segments.pop();
    }
    if (this.checkCollision(newHead) == true) {
        gameOver();
        return;
    }
    this.segments.unshift(newHead);
};
snake.prototype.checkCollision = function (head) {
    var wallCollision = (head.col == 0 || 
        head.row == 0 || 
        head.col == widthInBlocks - 1 || 
        head.row == heightInBlocks - 1
    );
    var selfCollision = false;
    for (var c = 0; c < this.segments.length; c++) {
        if (head.equal(this.segments[c])) {
            selfCollision = true;
        }
    }
    return wallCollision || selfCollision;
};
snake.prototype.setDirection = function (newDirection) {
    if (this.direction == "up" && newDirection == "down") {
        return;
    } else if (this.direction == "right" && newDirection == "left") {
        return;
    } else if (this.direction == "down" && newDirection == "up") {
        return;
    } else if (this.direction == "left" && newDirection == "right") {
        return;
    }
    this.nextDirection = newDirection;
};
var apple = function () {
    var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new block(randomCol, randomRow);
};
apple.prototype.draw = function () {
    this.position.drawCircle(appleColorReturn);
};
apple.prototype.move = function () {
    var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new block(randomCol, randomRow);
};
var gameOver = function () {
    timeoutNumber = 100;
    snake.segments = [
        new block(7, 5),
        new block(6, 5),
        new block(5, 5),
    ];
    varGameOver = true;
    changeVarGameOver = true;
    button.innerHTML = "Start";
    buttonStop = false;
    running = true;
    console.log(snake.direction);
    bootbox.confirm("Game Over, You Got " + score + " Score. Click Here To Restart.", function (result) {
        if (result == true) {
            varGameOver = false;
            changeVarGameOver = false;
            button.innerHTML = "Stop";
            buttonStop = true;
            running = true;
            snake.direction = "right";
            snake.nextDirection = "right";
            score = 0;
            timeout();
        } else {
            clearTimeout(timeoutId);
            bootbox.alert("Thank you for playing. Press the start button to replay.")
            varGameOver = true;
            changeVarGameOver = true;
            button.innerHTML = "Start";
            buttonStop = false;
            running = true;
        }
    });

    
};
function timeout() {
    if (varGameOver == false) {
        timeoutId = setTimeout(function () {
            ctx.clearRect(0, 0, width, height);
            drawScore();
            drawHighScore();
            drawBorder();
            snake.move();
            snake.draw(snakeColorReturn);
            apple.draw();
            if (score > highScore) {
                highScore = score;
            }
            timeout();
        }, timeoutNumber);
    }
}
var snake = new snake();
var apple = new apple();
if (firstTime == true) {
    timeout();
    firstTime = false;
}
button.onclick = (function () {
    clearTimeout(timeoutId);
    if (buttonStop == true) {
        button.innerHTML = "Start";
        buttonStop = false;
    } else if (changeVarGameOver == true) {
        varGameOver = false;
        changeVarGameOver = false;
        button.innerHTML = "Stop";
        buttonStop = true;
        running = true;
        snake.segments = [
            new block(7, 5),
            new block(6, 5),
            new block(5, 5)
        ];
        snake.direction = "right";
        snake.nextDirection = "right";
        score = 0;
        timeout();
        return;
    } else {
        button.innerHTML = "Stop";
        buttonStop = true;
    }
    running = !running;
    if (!running == true) {
        return;
    }
    timeout();
});
var directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
};
$("body").keydown(function (event) {
    var newDirection = directions[event.keyCode];
    window.addEventListener("keydown", function (e) {
        if (directions[e.keyCode]) {
            e.preventDefault();
        }
    });
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});
buttonUp.onclick = function () {
    var newDirection = "up";
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
}
buttonDown.onclick = function () {
    var newDirection = "down";
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
}
buttonLeft.onclick = function () {
    var newDirection = "left";
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
}
buttonRight.onclick = function () {
    var newDirection = "right";
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
}