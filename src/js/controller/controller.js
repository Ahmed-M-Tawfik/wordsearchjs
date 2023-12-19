import {gameInit, gameState} from "../gameState.mjs";
import {generateWordSearchContent} from "../wordSearchGenerator/Main.mjs";
import {drawWordSearchPage} from "../ui/wordSearchGamePage.mjs";

export function startDefaultGame(container) {
    const gameConfig = {
        rows: 8,
        columns: 8,
        wordCount: 6,
        sourceDictionary: ["apple", "banana", "carrot", "durian", "eggplant", "fig", "guava", "horseradish", /*"i",*/ "jackfruit", "kale", "lemon", /*"m", "n"*/]
    }

    gameInit(gameConfig, generateWordSearchContent(gameConfig.rows, gameConfig.columns, gameConfig.wordCount, gameConfig.sourceDictionary));

    drawWordSearchPage(container, gameState.gridSize, gameState.grid, gameState.wordList);
}

export function selectedWordSearchGrid(coords) {
    if (coords.length === 0)
        return;

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

    if (!selectedWordIndex || gameState.wordList[selectedWordIndex].length !== coords.length) {
        console.log("Failed to match word " + selectedWordIndex + " " + coords.length);
        return;
    }

    console.log("Word matched " + gameState.wordList[selectedWordIndex]);
}