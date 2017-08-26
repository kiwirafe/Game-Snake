var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
var timeoutId;
var changingTimeoutId;
var timeoutNumber = 100;
var running = true;
var firstTime = true;
var varGameOver = false;
var changeVarGameOver = false;
var background = document.getElementById("dropdownMenuOne");
var backGroundValue = background.value;
var backGroundValueReturn
var snakeColorReturn = "blue";
var snakeColor = document.getElementById("dropdownMenuThree");
var snakeColorValue = snakeColor.value;
var appleColorReturn = "red";
var score = 0;
var highScore = 0;
var button = document.getElementById("startStop");
var buttonStop = true;
var colors = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
canvas.style.backgroundColor = backGroundValue;
button.style.backgroundColor = backGroundValue;
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
        timeoutNumber -= 5;
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
    var leftCollision = (head.col == 0);
    var topCollision = (head.row == 0);
    var rightCollision = (head.col == widthInBlocks - 1);
    var bottomCollision = (head.row == heightInBlocks - 1);
    var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
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
        new block(5, 5)
    ];
    if (confirm("Game Over, You Got " + score + " Score. Click Here To Restart.") == true) {
        snake.direction = "right";
        snake.nextDirection = "right";
        score = 0;
    } else {
        clearTimeout(timeoutId);
        bootbox.alert("Thank you for playing. Press the start button to replay.")
        varGameOver = true;
        changeVarGameOver = true;
        button.value = "Start";
        buttonStop = false;
        running = true;
    }
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
        button.value = "Start";
        buttonStop = false;
    } else if (changeVarGameOver == true) {
        varGameOver = false;
        changeVarGameOver = false;
        button.value = "Stop";
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
        button.value = "Stop";
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
    40: "down"
};
$("body").keydown(function (event) {
    var newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});
function changeBackgroundColor(backgroundColorChange) {
    if (backgroundColorChange != snakeColorReturn && backgroundColorChange != appleColorReturn) {
        background.addEventListener("keydown", function (e) {
            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                e.preventDefault();
            }
        });
        canvas.style.backgroundColor = backgroundColorChange;
        document.getElementById("startStop").style.backgroundColor = backgroundColorChange;
        backgroundColor = backgroundColorChange;
    } else {
        bootbox.alert("Please choose another color.");
    }
}
function submitBackgroundColor() {
    var varInputOne = document.getElementById("inputOne").value.toLowerCase();
    if (varInputOne != snakeColorReturn && varInputOne != appleColorReturn) {
        for (var d = 0; d < colors.length; d++) {
            if (colors[d] == varInputOne) {
                document.getElementById("startStop").style.backgroundColor = varInputOne;
                canvas.style.backgroundColor = varInputOne;
                document.getElementById("inputOne").value = "";
                backgroundColor = varInputOne;
                return;
            }
        }
    } else {
        bootbox.alert("Please choose another color.");
        return;
    }
    bootbox.alert("It's not a color!");
    document.getElementById("inputOne").value = "";
}
function changeSnakeColor(newSnakeColor) {
    if (newSnakeColor != backGroundValueReturn && newSnakeColor != appleColorReturn) {
        snakeColor.addEventListener("keydown", function (e) {
            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                e.preventDefault();
            }
        });
        clearTimeout(timeoutId);
        snakeColorReturn = newSnakeColor;
        timeout();
        buttonStop = true;
        button.value = "Stop";
        running = true;
    } else {
        bootbox.alert("Please choose another color.");
    }
}
function submitSnakeColor() {
    var varInputTwo = document.getElementById("inputTwo").value.toLowerCase();
    if (varInputTwo != backGroundValueReturn && varInputTwo != appleColorReturn) {
        for (var e = 0; e < colors.length; e++) {
            if (colors[e] == varInputTwo) {
                clearTimeout(timeoutId);
                snakeColorReturn = varInputTwo;
                timeout();
                buttonStop = false;
                button.value = "Stop";
                running = true;
                document.getElementById("inputTwo").value = "";
                return;
            }
        }
    } else {
        bootbox.alert("Please choose another color.");
    }
    bootbox.alert("It's not a color!");
    document.getElementById("inputTwo").value = "";
}
function changeAppleColor(newAppleColor) {
    if (newAppleColor != snakeColorReturn && newAppleColor != backGroundValueReturn) {
        snakeColor.addEventListener("keydown", function (e) {
            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                e.preventDefault();
            }
        });
        clearTimeout(timeoutId);
        appleColorReturn = newAppleColor;
        if (!running == true) {
            bootbox.alert("The color of apple will change when you press the start button");
            buttonStop = false;
            button.value = "Start";
            return;
        } else {
            timeout();
            buttonStop = true;
            button.value = "Stop";
        }
    } else {
        bootbox.alert("Please choose another color.");
    }
}
function submitAppleColor() {
    var varInputThree = document.getElementById("inputThree").value.toLowerCase();
    if (varInputThree != snakeColorReturn && varInputThree != backGroundValueReturn) {
        if (running == true) {
            running = false;
        } else {
            running = true;
        }
        for (var e = 0; e < colors.length; e++) {
            if (colors[e] == varInputThree) {
                clearTimeout(timeoutId);
                appleColorReturn = varInputThree;
                document.getElementById("inputThree").value = "";
                running = !running;
                if (!running == true) {
                    bootbox.alert("The color of apple will change when you press the start button");
                    buttonStop = false;
                    button.value = "Start";
                    return;
                } else {
                    timeout();
                    buttonStop = true;
                    button.value = "Stop";
                    return;
                }
            }
        }
    } else {
        bootbox.alert("Please choose another color.");
    }
    bootbox.alert("It's not a color!");
    document.getElementById("inputThree").value = "";
}
document.addEventListener("keydown", function (e) {
    if (e.keyCode == 32) {
        e.preventDefault();
        var lastKeyUpAt = 0;
        var keyDownAt = new Date();
        changingTimeoutId = setTimeout(function () {
            if ((+keyDownAt - +lastKeyUpAt) > -3000) {
                timeoutNumber = 40;
            } else {
                lastKeyUpAt = new Date();
                timeoutNumber -= 2;
            }
        }, 1000);
    }
});
document.addEventListener("keyup", function (e) {
    if (e.keyCode == 32) {
        e.preventDefault();
        clearTimeout(timeoutId);
        clearTimeout(changingTimeoutId);
        timeoutNumber = 100;
        timeout();
        alert(timeoutNumber);
    }
});