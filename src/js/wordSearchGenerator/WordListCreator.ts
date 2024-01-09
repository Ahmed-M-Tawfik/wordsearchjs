import {stringIsBlank} from "../utils.ts";
import * as WordListCreator from "./WordListCreator.ts"

export function pickWord(sourceDictionary: string[]) {
    if (sourceDictionary.length === 0) {
        throw new Error("Dictionary must contain at least one item");
    }

    const dictionaryIndex = Math.floor(Math.random() * sourceDictionary.length);
    return sourceDictionary[dictionaryIndex];
}

export function validateWordForUse(pickedWord: string, maxWordSize: number, wordsToNotUse: string[]) {
    let canUse = true;

    canUse &&= !stringIsBlank(pickedWord);
    canUse &&= pickedWord.length <= maxWordSize;
    canUse &&= !wordsToNotUse.includes(pickedWord);

    return canUse;
}

export function createWordList(maxWordSize: number, wordCount: number, sourceDictionary: string[]) {
    if(wordCount > sourceDictionary.length)
        throw new Error("Requested word count greater than source dictionary word count")

    const wordList = Array(wordCount);

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
        } while (!canUse);
        wordList[i] = pickedWord;
    }

    return wordList;
}