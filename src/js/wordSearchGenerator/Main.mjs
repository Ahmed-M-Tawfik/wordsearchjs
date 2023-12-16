import {createWordList} from "./WordListCreator.mjs";
import {placeRandomCharsInEmptyGridSpaces, } from "./GridItemPlacer.mjs";
import {placeWordsInGrid} from "./WordPlacer.mjs";

export function generateWordSearchContent(rows, columns, wordCount, sourceDictionary) {
    return wordSearchFillAlgorithm(rows, columns, wordCount, sourceDictionary);
}

function wordSearchFillAlgorithm(rows, columns, wordCount, sourceDictionary) {
    // generate word list from dictionary
    let wordList = createWordList(Math.max(rows, columns), wordCount, sourceDictionary);
    console.log("Word list: " + wordList);

    // add word list to the grid
    let grid = placeWordsInGrid(rows, columns, wordCount, wordList);

    // fill remaining grid boxes with random characters
    placeRandomCharsInEmptyGridSpaces(grid);

    return {
        "grid": grid,
        "wordList": wordList
    };
}