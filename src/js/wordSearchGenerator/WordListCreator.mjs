import {stringIsBlank} from "../utils.mjs";
import * as WordListCreator from "./WordListCreator.mjs"

export function pickWord(sourceDictionary) {
    if (sourceDictionary.length === 0) {
        throw new Error("Dictionary must contain at least one item");
    }

    let dictionaryIndex = Math.floor(Math.random() * sourceDictionary.length);
    return sourceDictionary[dictionaryIndex];
}

export function validateWordForUse(pickedWord, maxWordSize, wordsToNotUse) {
    let canUse = true;

    canUse &&= !stringIsBlank(pickedWord);
    canUse &&= pickedWord.length <= maxWordSize;
    canUse &&= !wordsToNotUse.includes(pickedWord);

    return canUse;
}

export function createWordList(maxWordSize, wordCount, sourceDictionary) {
    if(wordCount > sourceDictionary.length)
        throw new Error("Requested word count greater than source dictionary word count")

    let wordList = Array(wordCount);

    for (let i = 0; i < wordCount; i++) {
        let circuitBreaker = 0;

        let pickedWord = null;
        let canUse = null;
        do {
            circuitBreaker++;
            if(circuitBreaker >= 100) {
                throw new Error("Circuit breaker triggered; cannot find word list as requested. " +
                    "MaxWordSize: " + maxWordSize + "; WordCount: " + wordCount + "; SourceDictionaryLength: " + sourceDictionary.length)
            }

            pickedWord = WordListCreator.pickWord(sourceDictionary);
            canUse = WordListCreator.validateWordForUse(pickedWord, maxWordSize, wordList);
            console.log("Picked word: " + pickedWord + " canUse: " + canUse);
        } while (!canUse);
        wordList[i] = pickedWord;
    }

    return wordList;
}