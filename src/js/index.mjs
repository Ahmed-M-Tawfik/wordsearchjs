import {gameInit, gameState} from './gameState.mjs';
import {generateWordSearchContent} from "./wordSearchGenerator/Main.mjs";
import {drawGrid} from "./ui.mjs";

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