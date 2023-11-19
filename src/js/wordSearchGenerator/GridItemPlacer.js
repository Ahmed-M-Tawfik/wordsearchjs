import {GridItem} from "./GridItem.js";
import {generateRandomCharacter} from "./CharacterGenerator.js";

export function placeRandomCharsInEmptyGridSpaces(rows, columns, grid) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (!grid[i][j]) {
                grid[i][j] = new GridItem(generateRandomCharacter());
            }
        }
    }
}