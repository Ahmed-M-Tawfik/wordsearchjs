import {it, expect} from "vitest";
import {generateWordSearchContent} from "./Main.ts";
import {GridSize} from "../model/GridSize.ts";

it('should generate word search grid with random characters', () => {
    const rows = 8;
    const columns = 8;
    const gridSize = new GridSize(rows, columns);
    const wordCount = 6;
    const sourceDictionary = ["apple", "banana", "carrot", "durian", "eggplant", "fig", "guava", "horseradish", "jackfruit", "kale", "lemon"]

    const result = generateWordSearchContent(gridSize, wordCount, sourceDictionary);

    // WORD LIST EXPECTATIONS
    expect(result.wordList.length).toBe(wordCount);
    expect(result.wordList).toContainUniqueItems();
    // ensure word list contains words that exist in source dictionary
    expect(sourceDictionary).toEqual(expect.arrayContaining(result.wordList));
    // specific words that shouldn't appear in the list
    expect(result.wordList).not.toContain("horseradish");
    expect(result.wordList).not.toContain("jackfruit");

    // GRID EXPECTATIONS
    expect(result.grid.length).toEqual(rows);
    for(const gridRow of result.grid)
        expect(gridRow.length).toEqual(columns);
})