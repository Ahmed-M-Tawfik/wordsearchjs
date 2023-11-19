import {createWordList} from "./WordListCreator.js";
import {placeRandomCharsInEmptyGridSpaces, } from "./GridItemPlacer.js";
import {placeWordsInGrid} from "./WordPlacer.js";

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
    placeRandomCharsInEmptyGridSpaces(rows, columns, grid);

    return {
        "grid": grid,
        "wordList": wordList
    };
}