import {createWordList} from "./WordListCreator.js";
import {placeRandomCharsInEmptyGridSpaces,} from "./GridItemPlacer.js";
import {placeWordsInGrid} from "./WordPlacer.js";
import {GridSize} from "../model/GridSize.js";
import {WordSearchContent} from "../model/WordSearchContent.js";

export function generateWordSearchContent(gridSize: GridSize, wordCount: number, sourceDictionary: string[]): WordSearchContent {
    return wordSearchFillAlgorithm(gridSize, wordCount, sourceDictionary);
}

function wordSearchFillAlgorithm(gridSize: GridSize, wordCount: number, sourceDictionary: string[]): WordSearchContent {
    // generate word list from dictionary
    let wordList = createWordList(Math.max(gridSize.rows, gridSize.columns), wordCount, sourceDictionary);
    console.log("Word list: " + wordList);

    // add word list to the grid
    let grid = placeWordsInGrid(gridSize, wordCount, wordList);

    // fill remaining grid boxes with random characters
    placeRandomCharsInEmptyGridSpaces(grid);

    return new WordSearchContent(grid, wordList);
}