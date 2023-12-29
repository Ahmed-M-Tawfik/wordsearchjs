import {GridSize} from "../model/GridSize.js";
import {GridItem} from "./GridItem.js";

export function createEmptyGrid(gridSize: GridSize):GridItem[][] {
    return Array(gridSize.rows).fill(null)
        .map(
            () => Array(gridSize.columns)
        );
}