import {attachEventListeners} from "./wordSearchGridInteraction.js";
import {loadMainMenu} from "../../controller/controller.js";

export const wordListItemIdPrefix = "wordListItem-";

const debugWordGridItem = "debug-word-grid-item";

export function drawWordSearchPage(container, gridSize, gridContent, wordList) {
    drawWordList(container, wordList);
    drawGrid(container, gridSize, gridContent);
    drawSidebarList(container);
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
        li.id = wordListItemIdPrefix + word;
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

    grid.appendChild(gridBox);
}

function drawSidebarList(container) {
    const sideBarContainer = document.createElement("div");
    sideBarContainer.id = "sideBarContainer";
    sideBarContainer.classList.add("menuContainer");

    const debugButton = document.createElement("button");
    debugButton.textContent = "Toggle debug";
    debugButton.addEventListener('click', toggleDebugBtn)
    sideBarContainer.appendChild(debugButton);

    const backToMainMenuButton = document.createElement("button");
    backToMainMenuButton.textContent = "Back to main menu";
    backToMainMenuButton.addEventListener('click', backToMainMenuBtn)
    sideBarContainer.appendChild(backToMainMenuButton);

    container.appendChild(sideBarContainer);
}

function toggleDebugBtn() {
    const wordGridItems = document.getElementsByClassName(debugWordGridItem);
    for(const wordGridItem of wordGridItems) {
        wordGridItem.classList.toggle("debug-highlight")
    }
}

function backToMainMenuBtn() {
    loadMainMenu();
}