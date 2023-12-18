import {gameInit, gameState} from "./gameState.mjs";
import {generateWordSearchContent} from "./wordSearchGenerator/Main.mjs";
import {drawGrid} from "./ui.mjs";

export function startDefaultGame(container) {
    const gameConfig = {
        rows: 8,
        columns: 8,
        wordCount: 6,
        sourceDictionary: ["apple", "banana", "carrot", "durian", "eggplant", "fig", "guava", "horseradish", /*"i",*/ "jackfruit", "kale", "lemon", /*"m", "n"*/]
    }

    gameInit(gameConfig, generateWordSearchContent(gameConfig.rows, gameConfig.columns, gameConfig.wordCount, gameConfig.sourceDictionary));

    drawGrid(container, gameState.gridSize, gameState.grid);
}