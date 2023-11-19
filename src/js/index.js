import {gameInit, gameState} from './gameState.js';
import {generateWordSearchContent} from "./wordSearchGenerator/Main.js";
import {drawGrid} from "./ui.js";

function init(gameConfig) {
    gameInit(gameConfig, generateWordSearchContent(gameConfig.rows, gameConfig.columns, gameConfig.wordCount, gameConfig.sourceDictionary));

    drawGrid(document.getElementById("gameBoard"), gameState.gridSize, gameState.grid);
}

const gameConfig = {
    rows: 8,
    columns: 8,
    wordCount: 6,
    sourceDictionary: ["apple", "banana", "carrot", "durian", "eggplant", "fig", "guava", "horseradish", /*"i",*/ "jackfruit", "kale", "lemon", /*"m", "n"*/]
}

init(gameConfig);