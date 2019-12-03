function changeBackgroundColor(newBackgroundColor) {
    if (newBackgroundColor != snakeColorReturn && newBackgroundColor != appleColorReturn) {
        document.getElementById("dropdownMenu1").addEventListener("keydown", function (e) {
            if (directions[e.keyCode]) {
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
        if (directions[e.keyCode]) {
            e.preventDefault();
        }
    });
    if (newButtonColor == "black") {
        var x = document.getElementsByTagName("button");
        for (var i = 0; i < x.length; i++) {
            x[i].style.color = "white";
        }
    } else if (newButtonColor == "white") {
        var x = document.getElementsByTagName("button");
        for (var i = 0; i < x.length; i++) {
            x[i].style.color = "black";
        }
    }
    var x = document.getElementsByTagName("button");
    for (var i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = newButtonColor;
    }
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
            if (directions[e.keyCode]) {
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
            if (directions[e.keyCode]) {
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