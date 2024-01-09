import {GridItem} from "./GridItem.ts";
import * as CharacterGenerator from "./CharacterGenerator.ts";

export function placeRandomCharsInEmptyGridSpaces(grid: GridItem[][] | null[][]) {
    const rows = grid.length;
    const columns = grid[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (!grid[i][j]) {
                grid[i][j] = new GridItem(CharacterGenerator.generateRandomCharacter());
            }
        }
    }
}