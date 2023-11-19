import {stringIsBlank} from "../utils.js";

export function createWordList(maxWordSize, wordCount, sourceDictionary) {
    let wordList = Array(wordCount);

    for (let i = 0; i < wordCount; i++) {
        let pickedWord = null;
        do {
            let dictionaryIndex = Math.floor(Math.random() * sourceDictionary.length);
            pickedWord = sourceDictionary[dictionaryIndex];
        } while (stringIsBlank(pickedWord) || pickedWord.length > maxWordSize || wordList.includes(pickedWord));
        wordList[i] = pickedWord;
    }

    return wordList;
}