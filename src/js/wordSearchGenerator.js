import {createWordList} from "./wordSearchGenerator/wordListCreator.js";
import {GridItem} from "./wordSearchGenerator/GridItem.js";

const WORD_PLACEMENT_MAX_RETRIES = 20;

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

function placeWordsInGrid(rows, columns, wordCount, wordList) {
    let wordSuccessfullyAdded = true;
    let grid = null;

    let retryCount = -1; // breaker to avoid infinite loop in rare cases where no solution possible
    do {
        retryCount++;

        grid = createEmptyGrid(rows, columns);
        wordSuccessfullyAdded = attemptWordsPlacement(rows, columns, wordCount, wordList, grid);
    } while (!wordSuccessfullyAdded && retryCount < WORD_PLACEMENT_MAX_RETRIES);
    if (!wordSuccessfullyAdded) {
        console.error("Unable to find word placement solution");
    }

    return grid;
}

function createEmptyGrid(rows, columns) {
    return Array(rows).fill('')
        .map(
            () => Array(columns).fill('')
        );
}

function attemptWordsPlacement(rows, columns, wordCount, wordList, grid) {
    let wordSuccessfullyAdded = true;
    for (let i = 0; i < wordCount && wordSuccessfullyAdded; i++) {
        let wordToBeAdded = wordList[i];
        wordSuccessfullyAdded &= attemptWordPlacement(wordToBeAdded, i, rows, columns, grid);
    }
    return wordSuccessfullyAdded;
}

/**
 * Attempts to add the given word to the grid, multiple times, as per the WORD_PLACEMENT_MAX_RETRIES constant. Returns false if unable after retries.
 * @param word to be added to grid
 * @param index of word in word list, used as marking of 'ownership' of each character of the word in the grid
 * @param rows in the grid
 * @param columns in the grid
 * @param grid in which the word will be placed
 * @returns successful placement of word
 */
function attemptWordPlacement(word, index, rows, columns, grid) {
    let retries = -1;
    let wordSuccessfullyAdded = false;

    do {
        retries++;

        let placementLocationFunc = selectPlacementAlignment();
        const alignmentSpecificFunctions = placementLocationFunc(word, rows, columns);

        if (wordPlacementInGridIsValid(word, grid, alignmentSpecificFunctions.getGridElementAt)) {
            continue; // skip and retry placement
        }

        placeWordInGrid(word, grid, index, alignmentSpecificFunctions.setGridElementAt);
        wordSuccessfullyAdded = true;

    } while (retries < WORD_PLACEMENT_MAX_RETRIES && !wordSuccessfullyAdded);

    return wordSuccessfullyAdded;
}

function selectPlacementAlignment() {
    // randomly pick alignment (horizontal, vertical, reverse h, reverse v)
    let alignment = Math.floor(Math.random() * 2); // todo make 4

    // get relevant placement logic
    let placementLocationFunc = getHorizontalPlacementLocation;
    if (alignment === 0) { // horizontal, left to right
        placementLocationFunc = getHorizontalPlacementLocation;
    } else if (alignment === 1) { // vertical, top to bottom
        placementLocationFunc = getVerticalPlacementLocation;
    }

    return placementLocationFunc;
}

function getVerticalPlacementLocation(wordToBeAdded, rows, columns) {
    let maxStartingRow = rows - wordToBeAdded.length;
    let startingRow = Math.floor(Math.random() * maxStartingRow);
    let column = Math.floor(Math.random() * columns);

    let getGridElementAt = function (grid, n) {
        return grid[n + startingRow][column];
    }
    let setGridElementAt = function (grid, n, data) {
        grid[n + startingRow][column] = data;
    }

    return {getGridElementAt, setGridElementAt};
}

function getHorizontalPlacementLocation(wordToBeAdded, columns, rows) {
    // find the right starting point
    let maxStartingColumn = columns - wordToBeAdded.length;
    let startingColumn = Math.floor(Math.random() * maxStartingColumn);
    let row = Math.floor(Math.random() * rows);

    let getGridElementAt = function (grid, n) {
        return grid[row][n + startingColumn];
    }
    let setGridElementAt = function (grid, n, data) {
        grid[row][n + startingColumn] = data;
    }

    return {getGridElementAt, setGridElementAt};
}

function wordPlacementInGridIsValid(wordToBeAdded, grid, getGridElementAt) {
    let badPlacementDetected = false;
    for (let n = 0; n < wordToBeAdded.length; n++) {
        if (getGridElementAt(grid, n)) {
            badPlacementDetected = true;
            break;
        }
    }
    return badPlacementDetected;
}

function placeWordInGrid(wordToBeAdded, grid, wordIndex, setGridElementAt) {
    for (let n = 0; n < wordToBeAdded.length; n++) {
        setGridElementAt(grid, n, new GridItem(wordToBeAdded[n], wordIndex));
    }
}

function placeRandomCharsInEmptyGridSpaces(rows, columns, grid) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (!grid[i][j]) {
                grid[i][j] = new GridItem(generateRandomCharacter());
            }
        }
    }
}

function generateRandomCharacter() {
    let charCode = Math.round(65 + Math.random() * 25);
    return String.fromCharCode(charCode);
}