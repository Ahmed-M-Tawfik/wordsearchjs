import {gameInit, gameState} from './gameState.js';

function init(gameConfig) {
    gameInit(gameConfig);

    drawGrid(document.getElementById("gameBoard"));
}

function drawGrid(container) {
    let rows = gameState.gridSize.rows;
    let columns = gameState.gridSize.columns;

    const grid = document.createElement("div");
    grid.classList.add("grid", "prevent-text-highlighting");

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            drawGridBox(grid, i, j, gameState.grid[i][j]);
        }
    }

    container.appendChild(grid);
}

function drawGridBox(grid, row, col, gridBoxData) {
    const gridBox = document.createElement("div");
    gridBox.classList.add("gridBox");
    if(gridBoxData.getWordIndex?.()) {
        gridBox.classList.add("debug-added-word")
    }
    gridBox.textContent = gridBoxData.getContent();
    gridBox.id = `gridBox${row}${col}`;
    gridBox.onclick = getSelectionToggleFunc(gridBox);

    grid.appendChild(gridBox);
}

function getSelectionToggleFunc(node) {
    return function () {
        node.classList.toggle("selected");
    }
}

const gameConfig = {
    rows: 8,
    columns: 8,
    wordCount: 6,
    sourceDictionary: ["apple", "banana", "carrot", "durian", "eggplant", "fig", "guava", "horseradish", /*"i",*/ "jackfruit", "kale", "lemon", /*"m", "n"*/]
}

init(gameConfig);