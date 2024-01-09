import {afterEach, it, vi, expect} from "vitest";
import * as CharacterGenerator from "./CharacterGenerator.ts";
import {placeRandomCharsInEmptyGridSpaces} from "./GridItemPlacer.ts";
import {GridItem} from "./GridItem.ts";

afterEach(() => {
    vi.restoreAllMocks();
})

it('should not change the size of the given grid, given a grid', () => {
    const gridSize = 3;
    const grid = Array.from({ length: 3 }, () => Array(3).fill(undefined));

    placeRandomCharsInEmptyGridSpaces(grid);

    expect(grid.length).toBe(gridSize);
    for (const gridRow of grid)
        expect(gridRow.length).toBe(gridSize);
})

it('should place N in all grid spaces, given an empty grid', () => {
    const grid = Array.from({ length: 3 }, () => Array(3).fill(undefined));

    vi.spyOn(CharacterGenerator, 'generateRandomCharacter').mockImplementation(() => 'N')

    placeRandomCharsInEmptyGridSpaces(grid);

    for (const gridRow of grid)
        for (const gridItem of gridRow)
            expect(gridItem.content).toBe('N');
})

it('should place N in only empty grid spaces, given a semi-populated grid', () => {
    const grid = [
        [undefined, undefined, undefined,],
        [new GridItem('C'), new GridItem('C'), new GridItem('C'),],
        [undefined, undefined, undefined,]];

    vi.spyOn(CharacterGenerator, 'generateRandomCharacter').mockImplementation(() => 'N')

    placeRandomCharsInEmptyGridSpaces(grid);

    for (const gridItem of grid[0])
        expect(gridItem.content).toBe('N');
    for (const gridItem of grid[1])
        expect(gridItem.content).toBe('C');
    for (const gridItem of grid[2])
        expect(gridItem.content).toBe('N');
})