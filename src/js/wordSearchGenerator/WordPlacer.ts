import {createEmptyGrid} from "./GridCreator.js";
import {selectPlacementAlignment} from "./WordPlacementAlignment.js";
import {GridItem} from "./GridItem.js";
import * as WordPlacer from "./WordPlacer.js";
import {GridSize} from "../model/GridSize.js";

const WORD_PLACEMENT_MAX_RETRIES = 20;

export function placeWordsInGrid(gridSize: GridSize, wordCount: number, wordList: string[]): GridItem[][] {
    let wordSuccessfullyAdded = true;
    let grid = null;

    let retryCount = -1; // breaker to avoid infinite loop in rare cases where no solution possible
    do {
        retryCount++;

        grid = createEmptyGrid(gridSize);
        wordSuccessfullyAdded = WordPlacer.attemptWordsPlacement(gridSize, wordCount, wordList, grid);
    } while (!wordSuccessfullyAdded && retryCount < WORD_PLACEMENT_MAX_RETRIES);

    if (!wordSuccessfullyAdded) {
        throw new Error("Unable to find word placement solution for word list: " + wordList);
    }

    return grid;
}

export function attemptWordsPlacement(gridSize: GridSize, wordCount: number, wordList: string[], grid: GridItem[][]) {
    let wordSuccessfullyAdded = true;
    for (let i = 0; i < wordCount && wordSuccessfullyAdded; i++) {
        let wordToBeAdded = wordList[i];
        wordSuccessfullyAdded = wordSuccessfullyAdded && WordPlacer.attemptWordPlacement(wordToBeAdded, i, gridSize, grid);
    }
    return wordSuccessfullyAdded;
}

/**
 * Attempts to add the given word to the grid, multiple times, as per the WORD_PLACEMENT_MAX_RETRIES constant. Returns false if unable after retries.
 * @param word to be added to grid
 * @param index of word in word list, used as marking of 'ownership' of each character of the word in the grid
 * @param gridSize
 * @param grid in which the word will be placed
 * @returns successful placement of word
 */
export function attemptWordPlacement(word: string, index: number, gridSize: GridSize, grid: GridItem[][]) {
    let retries = -1;
    let wordSuccessfullyAdded = false;

    do {
        retries++;

        let placementLocationFunc = selectPlacementAlignment();
        const alignmentSpecificFunctions = placementLocationFunc(word, gridSize);

        if (WordPlacer.invalidWordPlacementInGrid(word, grid, alignmentSpecificFunctions.getGridElementAt)) {
            continue; // skip and retry placement
        }

        WordPlacer.placeWordInGrid(word, grid, index, alignmentSpecificFunctions.setGridElementAt);
        wordSuccessfullyAdded = true;

    } while (retries < WORD_PLACEMENT_MAX_RETRIES && !wordSuccessfullyAdded);

    return wordSuccessfullyAdded;
}

export function placeWordInGrid(wordToBeAdded: string, grid: GridItem[][], wordIndex: number, setGridElementAt: any) {
    for (let n = 0; n < wordToBeAdded.length; n++) {
        setGridElementAt(grid, n, new GridItem(wordToBeAdded[n], wordIndex));
    }
}

export function invalidWordPlacementInGrid(wordToBeAdded: string, grid: GridItem[][], getGridElementAt: any) {
    let badPlacementDetected = false;
    for (let n = 0; n < wordToBeAdded.length; n++) {
        if (getGridElementAt(grid, n)) {
            badPlacementDetected = true;
            break;
        }
    }
    return badPlacementDetected;
}