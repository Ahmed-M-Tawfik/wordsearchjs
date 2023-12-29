import {describe, beforeEach, it, vi, expect} from "vitest";
import * as WordListCreator from "./WordListCreator.ts";

beforeEach(() => {
    vi.restoreAllMocks();
})

describe('pickWord', () => {
    it('should pick within bounds (lower)', () => {
        const sourceDictionary = ['apple', 'banana', 'carrot', 'durian', 'eggeg'];

        vi.spyOn(Math, 'random').mockImplementation(() => 1);

        const pickedWord = WordListCreator.pickWord(sourceDictionary);

        expect(pickedWord).toBe(sourceDictionary[sourceDictionary.length]);
    })

    it('should pick within bounds (upper)', () => {
        const sourceDictionary = ['apple', 'banana', 'carrot', 'durian', 'eggeg'];

        vi.spyOn(Math, 'random').mockImplementation(() => 0);

        const pickedWord = WordListCreator.pickWord(sourceDictionary);

        expect(pickedWord).toBe(sourceDictionary[0]);
    })

    it('should pick within bounds (upper)', () => {
        const sourceDictionary = ['apple', 'banana', 'carrot', 'durian', 'eggeg'];

        vi.spyOn(Math, 'random').mockImplementation(() => 0);

        const pickedWord = WordListCreator.pickWord(sourceDictionary);

        expect(pickedWord).toBe(sourceDictionary[0]);
    })

    it('should throw error when not passed an argument', () => {
        const resultFn = () => {
            WordListCreator.pickWord()
        };
        expect(resultFn).toThrow();
    })

    it('should throw error when passed an empty array', () => {
        const sourceDictionary = [];

        const resultFn = () => {
            console.log(WordListCreator.pickWord(sourceDictionary))
        };
        expect(resultFn).toThrow("Dictionary must contain at least one item");
    })
})

describe('pickWordAndEvaluate', () => {
    it('should validation word as true, given all criteria met - word equals max length allowed', () => {
        const word = 'test';
        const maxWordCharacterLength = 4;
        const wordsToNotUse = [];

        const canUse = WordListCreator.validateWordForUse(word, maxWordCharacterLength, wordsToNotUse);

        expect(canUse).toBe(true);
    });

    it('should validation word as true, given all criteria met - word less than max length allowed', () => {
        const word = 'tst';
        const maxWordCharacterLength = 4;
        const wordsToNotUse = [];

        const canUse = WordListCreator.validateWordForUse(word, maxWordCharacterLength, wordsToNotUse);

        expect(canUse).toBe(true);
    });

    it('should validation word as false, given word length greater than max', () => {
        const word = 'test';
        const maxWordCharacterLength = 3;
        const wordsToNotUse = [];

        const canUse = WordListCreator.validateWordForUse(word, maxWordCharacterLength, wordsToNotUse);

        expect(canUse).toBe(false);
    });

    it('should validation word as false, given word exists in list of words to not use (e.g. duplicates, offensive word list, etc)', () => {
        const word = 'test';
        const maxWordCharacterLength = 4;
        const wordsToNotUse = ['test'];

        const canUse = WordListCreator.validateWordForUse(word, maxWordCharacterLength, wordsToNotUse);

        expect(canUse).toBe(false);
    });

    it('should validation word as false, given word is blank', () => {
        const word = ' ';
        const maxWordCharacterLength = 4;
        const wordsToNotUse = [];

        const canUse = WordListCreator.validateWordForUse(word, maxWordCharacterLength, wordsToNotUse);

        expect(canUse).toBe(false);
    });
})

describe('createWordList', () => {
    it('should create word list with one approved word, given one word to list and a valid word', () => {
        // inputs made (partially or totally) redundant by mocks
        const maxWordCharacterLength = 4;
        const sourceDictionary = [,];

        // effective inputs
        const maxWordsToAddToList = 1;
        const word = 'apple';

        vi.spyOn(WordListCreator, 'pickWord').mockImplementation(() => word);
        vi.spyOn(WordListCreator, 'validateWordForUse').mockImplementation(() => true);

        const wordList = WordListCreator.createWordList(maxWordCharacterLength, maxWordsToAddToList, sourceDictionary);

        expect(wordList.length).toBe(1);
        expect(wordList[0]).toBe(word);
    })

    it('should create word list with approved words, given words to list and valid words', () => {
        // inputs made (partially or totally) redundant by mocks
        const maxWordCharacterLength = 4;
        const sourceDictionary = [, , , ,];

        // effective inputs
        const maxWordsToAddToList = 4;
        const word = 'apple';

        vi.spyOn(WordListCreator, 'pickWord').mockImplementation(() => word);
        vi.spyOn(WordListCreator, 'validateWordForUse').mockImplementation(() => true);

        const wordList = WordListCreator.createWordList(maxWordCharacterLength, maxWordsToAddToList, sourceDictionary);

        expect(wordList.length).toBe(4);
        for (const resultWord of wordList)
            expect(resultWord).toBe(word);
    })

    it('should throw error when given more words to find than words available in the source dictionary', () => {
        const maxWordCharacterLength = 4;
        const sourceDictionary = [,];
        const maxWordsToAddToList = 4;

        const resultFn = () => WordListCreator.createWordList(maxWordCharacterLength, maxWordsToAddToList, sourceDictionary);

        expect(resultFn).toThrow("Requested word count greater than source dictionary word count");
    })

    it('should throw error when circuit breaker triggers due to inability to find a valid word', () => {
        const maxWordCharacterLength = 4;
        const sourceDictionary = [,];
        const maxWordsToAddToList = 1;

        const resultFn = () => WordListCreator.createWordList(maxWordCharacterLength, maxWordsToAddToList, sourceDictionary);

        expect(resultFn).toThrow(/Circuit breaker triggered; cannot find word list as requested./);
    })
})

describe('createWordList integrationTest', () => {
    it('should generate a valid word list given list of words and word selection criteria', () => {
        const maxWordCharacterLength = 8;
        const sourceDictionary = ["apple", "banana", "carrot", "durian", "eggplant", "fig", "guava", "horseradish", "jackfruit", "kale", "lemon"];
        const maxWordsToAddToList = 6;

        const wordList = WordListCreator.createWordList(maxWordCharacterLength, maxWordsToAddToList, sourceDictionary);

        expect(wordList).length(maxWordsToAddToList);
    })
});