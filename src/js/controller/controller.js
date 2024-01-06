import {gameInit, gameState} from "/dist/js/gameState.js";
import {generateWordSearchContent} from "/dist/js/wordSearchGenerator/Main.js";
import {drawWordSearchPage} from "../ui/wordSearchPage/wordSearchGamePageGenerator.js";
import {drawMainMenu} from "../ui/mainMenuPage.js";
import {clearPage} from "../ui/general.js";
import {GridSize} from "/dist/js/model/GridSize.js";
import {GameConfig} from "/dist/js/model/GameConfig.js";
import {registerEvent} from "/dist/js/event/eventRegistry.js";
import {GameEvents} from "/dist/js/game/gameEvents.js";

export function registerComponents() {
    registerEvent(GameEvents.urLoadMainMenu, loadMainMenu);

    registerEvent(GameEvents.urLoadGame, startDefaultGame);
}

export function startDefaultGame() {
    const gameBoard = getGameContainer();

    clearPage(gameBoard);

    const gridSize = new GridSize(8, 8);

    const gameConfig = new GameConfig(6, gridSize,
        ["apple", "banana", "carrot", "durian", "eggplant", "fig", "guava", "horseradish", /*"i",*/ "jackfruit", "kale", "lemon", /*"m", "n"*/]);

    gameInit(gameConfig, generateWordSearchContent(gridSize, gameConfig.targetWordCount, gameConfig.sourceDictionary));

    drawWordSearchPage(gameBoard, gameState.gameConfig.gridSize, gameState.wordSearchContent.grid, gameState.wordSearchContent.wordList);
}

export function loadMainMenu() {
    const gameBoard = getGameContainer();
    clearPage(gameBoard);
    drawMainMenu(gameBoard);
}

export function isWordSelectedInGrid(coords) {
    if (coords.length === 0)
        return false;

    const gridItems = coords.map((coord) => {
        return gameState.wordSearchContent.grid[coord[0]][coord[1]];
    });

    // purity: all selected values are for one word
    // handle randoms: no index = random char -> fail
    // whole word selected; not partial

    const selectedWordIndex = gridItems.reduce(
        (accumulator, currentValue) => {
            const wordIndex = currentValue.index;
            if (accumulator !== wordIndex) {
                // impure selection, fail validation
                return null;
            }
            // pure selection, preserve initial value
            return accumulator;
        },
        gridItems[0].index
    );

    if (selectedWordIndex == null || gameState.wordSearchContent.wordList[selectedWordIndex].length !== coords.length) {
        console.log("Failed to match word " + selectedWordIndex + " " + coords.length);
        return false;
    }

    console.log("Word matched " + gameState.wordSearchContent.wordList[selectedWordIndex]);
    return gameState.wordSearchContent.wordList[selectedWordIndex];
}

function getGameContainer() {
    return document.getElementById("gameBoard");
}