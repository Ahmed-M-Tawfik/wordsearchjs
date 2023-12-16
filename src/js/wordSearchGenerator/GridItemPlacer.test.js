import {afterEach, it, vi, expect} from "vitest";
import * as CharacterGenerator from "./CharacterGenerator";
import {placeRandomCharsInEmptyGridSpaces} from "./GridItemPlacer.mjs";
import {GridItem} from "./GridItem.mjs";

afterEach(() => {
    vi.restoreAllMocks();
})

it('should not change the size of the given grid, given a grid', () => {
    const gridSize = 3;
    const grid = [[, , ,], [, , ,], [, , ,]];

    placeRandomCharsInEmptyGridSpaces(grid);

    expect(grid.length).toBe(gridSize);
    for (const gridRow of grid)
        expect(gridRow.length).toBe(gridSize);
})

it('should place N in all grid spaces, given an empty grid', () => {
    const grid = [[, , ,], [, , ,], [, , ,]];

    vi.spyOn(CharacterGenerator, 'generateRandomCharacter').mockImplementation(() => 'N')

    placeRandomCharsInEmptyGridSpaces(grid);

    for (const gridRow of grid)
        for (const gridItem of gridRow)
            expect(gridItem.content).toBe('N');
})

it('should place N in only empty grid spaces, given a semi-populated grid', () => {
    const gridSize = 3;
    const grid = [
        [, , ,],
        [new GridItem('C'), new GridItem('C'), new GridItem('C'),],
        [, , ,]];

    vi.spyOn(CharacterGenerator, 'generateRandomCharacter').mockImplementation(() => 'N')

    placeRandomCharsInEmptyGridSpaces(grid);

    for (const gridItem of grid[0])
        expect(gridItem.content).toBe('N');
    for (const gridItem of grid[1])
        expect(gridItem.content).toBe('C');
    for (const gridItem of grid[2])
        expect(gridItem.content).toBe('N');
})