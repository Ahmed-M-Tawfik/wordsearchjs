import {gameInit, gameState} from "../gameState.mjs";
import {generateWordSearchContent} from "../wordSearchGenerator/Main.mjs";
import {drawWordSearchPage} from "../ui/wordSearchPage/wordSearchGamePageGenerator.mjs";
import {drawMainMenu} from "../ui/mainMenuPage.js";
import {clearPage} from "../ui/general.js";

export function startDefaultGame() {
    const gameBoard = getGameContainer();

    clearPage(gameBoard);

    const gameConfig = {
        rows: 8,
        columns: 8,
        wordCount: 6,
        sourceDictionary: ["apple", "banana", "carrot", "durian", "eggplant", "fig", "guava", "horseradish", /*"i",*/ "jackfruit", "kale", "lemon", /*"m", "n"*/]
    }

    gameInit(gameConfig, generateWordSearchContent(gameConfig.rows, gameConfig.columns, gameConfig.wordCount, gameConfig.sourceDictionary));

    drawWordSearchPage(gameBoard, gameState.gridSize, gameState.grid, gameState.wordList);
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
        return gameState.grid[coord[0]][coord[1]];
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

    if (selectedWordIndex == null || gameState.wordList[selectedWordIndex].length !== coords.length) {
        console.log("Failed to match word " + selectedWordIndex + " " + coords.length);
        return false;
    }

    console.log("Word matched " + gameState.wordList[selectedWordIndex]);
    return gameState.wordList[selectedWordIndex];
}

function getGameContainer() {
    return document.getElementById("gameBoard");
}