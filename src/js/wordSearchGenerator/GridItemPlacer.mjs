import {GridItem} from "./GridItem.mjs";
import {generateRandomCharacter} from "./CharacterGenerator.mjs";

export function placeRandomCharsInEmptyGridSpaces(rows, columns, grid) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (!grid[i][j]) {
                grid[i][j] = new GridItem(generateRandomCharacter());
            }
        }
    }
}