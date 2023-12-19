import {attachEventListeners} from "./wordSearchGridInteraction.js";

const debugWordGridItem = "debug-word-grid-item";

export function drawWordSearchPage(container, gridSize, gridContent, wordList) {
    drawWordList(container, wordList);
    drawGrid(container, gridSize, gridContent);
    drawDebugButton(container);
}

function drawWordList(container, wordList) {
    const wordListContainer = document.createElement("div");
    wordListContainer.id = "wordListContainer";
    wordListContainer.classList.add("word-list-container", "no-select")

    const htmlWordList = document.createElement("ol");
    wordListContainer.appendChild(htmlWordList);

    for(const word of wordList) {
        const li = document.createElement('li');
        li.innerText = word;
        htmlWordList.appendChild(li);
    }

    container.appendChild(wordListContainer);
}

function drawGrid(container, gridSize, gridContent) {
    let rows = gridSize.rows;
    let columns = gridSize.columns;

    const grid = document.createElement("div");
    grid.classList.add("grid", "no-select");
    attachEventListeners(grid);

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
        gridBox.classList.add(debugWordGridItem)
    }
    gridBox.textContent = gridItem.content;
    gridBox.id = `gridBox-${row}.${col}`;
    gridBox.onclick = getSelectionToggleFunc(gridBox);

    grid.appendChild(gridBox);
}

function getSelectionToggleFunc(node) {
    return function () {
        node.classList.toggle("selected");
    }
}

function drawDebugButton(container) {
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "menuContainer";

    const debugButton = document.createElement("button");
    debugButton.textContent = "Toggle debug";
    debugButton.addEventListener('click', toggleDebug)
    buttonContainer.appendChild(debugButton);

    container.appendChild(buttonContainer);
}

function toggleDebug() {
    const wordGridItems = document.getElementsByClassName(debugWordGridItem);
    for(const wordGridItem of wordGridItems) {
        wordGridItem.classList.toggle("debug-highlight")
    }
}