var container = document.getElementById("container");
var containerStyle = container.currentStyle || window.getComputedStyle(container);
document.getElementById('innerContainer').style.marginLeft = containerStyle.marginLeft;
document.getElementById('innerContainer').style.marginRight = containerStyle.marginRight;
container.style.marginLeft = "0";
container.style.marginRight = "0";
container.style.paddingLeft = "0";
container.style.paddingRight = "0";
document.getElementById('canvas').setAttribute('width', (window.outerWidth - 20).toString() + "px");
document.getElementById('canvas').setAttribute('height', (window.outerHeight - 570).toString() + "px");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
var blockSize = 10;
for (i = 8; i < 20; i++) {
    if (width % i == 0 && height % i == 0) {
        blockSize = i;
    }
}
if (blockSize == 10) {
    for (i = 8; i < 20; i++) {
        if (height % i == 0) {
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
alert(blockSize)
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
        if (timeoutNumber > 65) {
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
        button.innerHTML = "Start";
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
function changeBackgroundColor(newBackgroundColor) {
    if (newBackgroundColor != snakeColorReturn && newBackgroundColor != appleColorReturn) {
        document.getElementById("dropdownMenu1").addEventListener("keydown", function (e) {
            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                e.preventDefault();
            }
        });
        canvas.style.backgroundColor = newBackgroundColor;
        backgroundReturn = newBackgroundColor;

    } else {
        bootbox.alert("Please choose another color.");
    }
}
function submitBackgroundColor() {
    var varInput1 = document.getElementById("input1").value.toLowerCase();
    if (varInput1 != snakeColorReturn && varInput1 != appleColorReturn) {
        for (var d = 0; d < colors.length; d++) {
            if (colors[d] == varInput1) {
                canvas.style.backgroundColor = varInput1;
                document.getElementById("input1").value = "";
                backgroundReturn = varInput1;
                return;
            }
        }
    } else {
        bootbox.alert("Please choose another color.");
        return;
    }
    bootbox.alert("It's not a color!");
    document.getElementById("input1").value = "";
}
function changeButtonColor(newButtonColor) {
    document.getElementById("dropdownMenu1").addEventListener("keydown", function (e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            e.preventDefault();
        }
    });
    if (newButtonColor == "black") {
        button.style.color = "white";
        buttonUp.style.color = "white";
        buttonDown.style.color = "white";
        buttonLeft.style.color = "white";
        buttonRight.style.color = "white";
    } else if (newButtonColor == "white") {
        button.style.color = "black";
        buttonUp.style.color = "black";
        buttonDown.style.color = "black";
        buttonLeft.style.color = "black";
        buttonRight.style.color = "black";
    }
    button.style.backgroundColor = newButtonColor;
    buttonUp.style.backgroundColor = newButtonColor;
    buttonDown.style.backgroundColor = newButtonColor;
    buttonLeft.style.backgroundColor = newButtonColor;
    buttonRight.style.backgroundColor = newButtonColor;
}
function submitButtonColor() {
    var varInput4 = document.getElementById("input4").value.toLowerCase();
    for (var f = 0; f < colors.length; f++) {
        if (colors[f] == varInput4) {
            button.style.backgroundColor = varInput4;
            document.getElementById("input4").value = "";
            if (varInput4 == "black") {
                button.style.color = "white";
            } else if (varInput4 == "white") {
                button.style.color = "black";
            }
        }
    }
    document.getElementById("input4").value = "";
}
function changeSnakeColor(newSnakeColor) {
    if (newSnakeColor != backgroundReturn && newSnakeColor != appleColorReturn) {
        document.getElementById("dropdownMenu2").addEventListener("keydown", function (e) {
            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                e.preventDefault();
            }
        });
        clearTimeout(timeoutId);
        snakeColorReturn = newSnakeColor;
        timeout();
        buttonStop = true;
        button.innerHTML = "Stop";
        running = true;
    } else {
        bootbox.alert("Please choose another color.");
    }
}
function submitSnakeColor() {
    var varInput2 = document.getElementById("input2").value.toLowerCase();
    if (varInput2 != backgroundReturn && varInput2 != appleColorReturn) {
        for (var e = 0; e < colors.length; e++) {
            if (colors[e] == varInput2) {
                clearTimeout(timeoutId);
                snakeColorReturn = varInput2;
                timeout();
                buttonStop = true;
                button.innerHTML = "Stop";
                running = true;
                document.getElementById("input2").value = "";
                return;
            }
        }
    } else {
        bootbox.alert("Please choose another color.");
    }
    bootbox.alert("It's not a color!");
    document.getElementById("input2").value = "";
}
function changeAppleColor(newAppleColor) {
    if (newAppleColor != snakeColorReturn && newAppleColor != backgroundReturn) {
        document.getElementById("dropdownMenu3").addEventListener("keydown", function (e) {
            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                e.preventDefault();
            }
        });
        clearTimeout(timeoutId);
        appleColorReturn = newAppleColor;
        if (running != true) {
            bootbox.alert("The color of apple will change when you press the start button");
            buttonStop = false;
            button.innerHTML = "Start";
            return;
        } else {
            timeout();
            buttonStop = true;
            button.innerHTML = "Stop";
        }
    } else {
        bootbox.alert("Please choose another color.");
    }
}
function submitAppleColor() {
    var varInput3 = document.getElementById("input3").value.toLowerCase();
    if (varInput3 != snakeColorReturn && varInput3 != backgroundReturn) {
        if (running == true) {
            running = false;
        } else {
            running = true;
        }
        for (var e = 0; e < colors.length; e++) {
            if (colors[e] == varInput3) {
                clearTimeout(timeoutId);
                appleColorReturn = varInput3;
                document.getElementById("input3").value = "";
                running = !running;
                if (!running == true) {
                    bootbox.alert("The color of apple will change when you press the start button");
                    buttonStop = false;
                    button.innerHTML = "Start";
                    return;
                } else {
                    timeout();
                    buttonStop = true;
                    button.innerHTML = "Stop";
                    return;
                }
            }
        }
    } else {
        bootbox.alert("Please choose another color.");
    }
    bootbox.alert("It's not a color!");
    document.getElementById("input3").value = "";
}
document.addEventListener("keydown", function (e) {
    if (e.keyCode == 32) {
        e.preventDefault();
        var lastKeyUpAt = 0;
        var keyDownAt = new Date();
        if (timeoutNumber > 50) {
            timeoutNumber -= 30;
        };

    }
});
document.addEventListener("keyup", function (e) {
    if (e.keyCode == 32) {
        e.preventDefault();
        clearTimeout(timeoutId);
        timeoutNumber = tempTimeoutNumber;
        timeout();
    }
});