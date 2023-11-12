import {stringIsBlank} from "./utils.js";

const WORD_PLACEMENT_MAX_RETRIES = 5;

export function generateWordSearchContent(rows, columns, wordCount, sourceDictionary) {
    return wordSearchFillAlgorithm(rows, columns, wordCount, sourceDictionary);
}

function wordSearchFillAlgorithm(rows, columns, wordCount, sourceDictionary) {
    let grid = Array(rows)
        .fill()
        .map(() => Array(columns).fill());

    // pick out random words from dictionary
    let wordList = Array(wordCount);
    for (let i = 0; i < wordCount; i++) {
        let pickedWord = null;
        do {
            let dictionaryIndex = Math.floor(Math.random() * sourceDictionary.length);
            pickedWord = sourceDictionary[dictionaryIndex];
        } while (stringIsBlank(pickedWord) || (pickedWord.length > rows || pickedWord.length > columns) || wordList.includes(pickedWord));
        wordList[i] = pickedWord;
    }

    console.log("Picked words: " + wordList);

    // add picked words to the grid
    for (let i = 0; i < wordCount; i++) {
        let wordToBeAdded = wordList[i];

        let retries = -1;
        let wordSuccessfullyAdded = false;
        do {
            let badPlacementDetected = false;
            retries++;

            // randomly pick alignment (horizontal, vertical, reverse h, reverse v)
            let alignment = Math.floor(Math.random() * 2); // todo make 4

            // try to place
            if(alignment === 0) { // horizontal, left to right
                // find the right starting point
                let maxStartingColumn = columns - wordToBeAdded.length;
                let startingColumn = Math.floor(Math.random() * maxStartingColumn);
                let row = Math.floor(Math.random() * rows);

                // check validity
                for(let n = 0; n < wordToBeAdded.length; n++) {
                    if(grid[row][n + startingColumn]) {
                        badPlacementDetected = true;
                        break;
                    }
                }
                if(badPlacementDetected) {
                    continue; // skip and retry placement
                }

                // place
                for(let n = 0; n < wordToBeAdded.length; n++) {
                    grid[row][n + startingColumn] = addGridBoxData(wordToBeAdded[n], i);
                }
                wordSuccessfullyAdded = true;
            } else if(alignment === 1) { // vertical, top to bottom
                // find the right starting point
                let maxStartingRow = rows - wordToBeAdded.length;
                let startingRow = Math.floor(Math.random() * maxStartingRow);
                let column = Math.floor(Math.random() * columns);

                // place
                for(let n = 0; n < wordToBeAdded.length; n++) {
                    grid[n + startingRow][column] = addGridBoxData(wordToBeAdded[n], i);
                }
                wordSuccessfullyAdded = true;
            }

        } while (retries < WORD_PLACEMENT_MAX_RETRIES && !wordSuccessfullyAdded);
        // if reached max retries scrap and restart fill from zero
        if(!wordSuccessfullyAdded) {
            // todo - add restart logic
            alert("Reached max retries while trying to add `" + wordToBeAdded + "` to grid");
        }
    }

    // fill remaining grid boxes with random characters
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            if(!grid[i][j]) {
                grid[i][j] = addGridBoxData(generateRandomCharacter());
            }
        }
    }

    return {
        "grid": grid,
        "wordList": wordList
    };
}

function generateRandomCharacter() {
    let charCode = Math.round(65 + Math.random() * 25);
    return String.fromCharCode(charCode);
}

function addGridBoxData(content, index = null) {
    return {
        "content": content,
        "wordIndex": index,
        "getContent": function () {
            return content;
        },
        "getWordIndex": function () {
            return index;
        }
    }
}