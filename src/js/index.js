function init() {
    drawGrid(document.getElementById("gameBoard"));
}

function drawGrid(container) {
    let rows = 8;
    let columns = 8;

    const grid = document.createElement("div");
    grid.classList.add("grid", "prevent-text-highlighting");

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            drawGridBox(grid, i, j, generateRandomCharacter());
        }
    }

    container.appendChild(grid);
}

function drawGridBox(grid, row, col, content) {
    const gridBox = document.createElement("div");
    gridBox.classList.add("gridBox");
    gridBox.textContent = content;
    gridBox.id = `gridBox${row}${col}`;
    gridBox.onclick = getSelectionToggleFunc(gridBox);

    grid.appendChild(gridBox);
}

function generateRandomCharacter() {
    let charCode = Math.round(65 + Math.random() * 25);
    return String.fromCharCode(charCode);
}

function getSelectionToggleFunc(node) {
    return function () {
        node.classList.toggle("selected");
    }
}

init();