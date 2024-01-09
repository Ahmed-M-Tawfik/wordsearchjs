import {createWordList} from "./WordListCreator.ts";
import {placeRandomCharsInEmptyGridSpaces,} from "./GridItemPlacer.ts";
import {placeWordsInGrid} from "./WordPlacer.ts";
import {GridSize} from "../model/GridSize.ts";
import {WordSearchContent} from "../model/WordSearchContent.ts";

export function generateWordSearchContent(gridSize: GridSize, wordCount: number, sourceDictionary: string[]): WordSearchContent {
    return wordSearchFillAlgorithm(gridSize, wordCount, sourceDictionary);
}

function wordSearchFillAlgorithm(gridSize: GridSize, wordCount: number, sourceDictionary: string[]): WordSearchContent {
    // generate word list from dictionary
    const wordList = createWordList(Math.max(gridSize.rows, gridSize.columns), wordCount, sourceDictionary);
    console.log("Word list: " + wordList);

    // add word list to the grid
    const grid = placeWordsInGrid(gridSize, wordCount, wordList);

    // fill remaining grid boxes with random characters
    placeRandomCharsInEmptyGridSpaces(grid);

    return new WordSearchContent(grid, wordList);
}