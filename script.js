const canvas = document.getElementById("paintCanvas");
const context = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;

let painting = false;
let strokes = [];
let lastX, lastY;

function startPosition(e) {
    painting = true;
    [lastX, lastY] = [e.clientX, e.clientY];
    draw(e);
}

function endPosition() {
    painting = false;
    context.beginPath();
    strokes.push(context.getImageData(0, 0, canvas.width, canvas.height));
}

function draw(e) {
    if (!painting) return;

    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "black";

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.clientX, e.clientY);
    context.stroke();

    [lastX, lastY] = [e.clientX, e.clientY];
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    strokes = [];
});

const undoButton = document.getElementById("undoButton");
undoButton.addEventListener("click", () => {
    if (strokes.length > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        strokes.pop();
        redraw();
    }
});

function redraw() {
    for (let i = 0; i < strokes.length; i++) {
        context.putImageData(strokes[i], 0, 0);
    }
}