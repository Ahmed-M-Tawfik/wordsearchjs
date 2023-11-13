export function drawGrid(container, gridSize, gridContent) {
    let rows = gridSize.rows;
    let columns = gridSize.columns;

    const grid = document.createElement("div");
    grid.classList.add("grid", "prevent-text-highlighting");

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            drawGridBox(grid, i, j, gridContent[i][j]);
        }
    }

    container.appendChild(grid);
}

function drawGridBox(grid, row, col, gridItem) {
    const gridBox = document.createElement("div");
    gridBox.classList.add("gridBox");
    if (gridItem.index !== null) {
        gridBox.classList.add("debug-added-word")
    }
    gridBox.textContent = gridItem.content;
    gridBox.id = `gridBox${row}${col}`;
    gridBox.onclick = getSelectionToggleFunc(gridBox);

    grid.appendChild(gridBox);
}

function getSelectionToggleFunc(node) {
    return function () {
        node.classList.toggle("selected");
    }
}