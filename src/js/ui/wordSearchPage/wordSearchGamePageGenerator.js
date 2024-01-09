import {attachEventListeners} from "./wordSearchGridInteraction.js";
import {triggerEvent} from "/src/js/event/eventRegistry.ts";
import {GameEvents} from "/src/js/game/gameEvents.ts";

export const wordListItemIdPrefix = "wordListItem-";

export const debugWordGridItemCssClass = "debug-word-grid-item";

export function drawWordSearchPage(container, gridSize, gridContent, wordList) {
    drawWinBanner(container);

    const gameplayPanel = createGameplayPanel(container);

    drawWordList(gameplayPanel, wordList);
    drawGrid(gameplayPanel, gridSize, gridContent);
    drawSidebarList(gameplayPanel);
}

function createGameplayPanel(container) {
    const gameplayPanel = document.createElement("div");
    gameplayPanel.id = "gameplayPanel";
    gameplayPanel.classList.add("no-select");

    container.appendChild(gameplayPanel);

    return gameplayPanel;
}

function drawWordList(container, wordList) {
    const wordListContainer = document.createElement("div");
    wordListContainer.id = "wordListContainer";
    wordListContainer.classList.add("word-list-container", "no-select");

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
        gridBox.classList.add(debugWordGridItemCssClass)
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
    triggerEvent(GameEvents.urToggleDebugHighlightingOfWordsInWordsearch);
}

function backToMainMenuBtn() {
    triggerEvent(GameEvents.urLoadMainMenu);
}

function drawWinBanner(container) {
    // draw it deactivated
    const winBannerContainer = document.createElement("div");
    winBannerContainer.id = "winBanner";
    winBannerContainer.classList.add("winBanner");

    const winBannerText = document.createElement("h2");
    winBannerText.innerText = "Wordsearch complete!"
    winBannerContainer.appendChild(winBannerText);

    container.appendChild(winBannerContainer);
}