import {GridSize} from "./GridSize.js";

export class GameConfig {
    targetWordCount: number;
    gridSize: GridSize;
    sourceDictionary: string[];

    constructor(targetWordCount: number, gridSize: GridSize, sourceDictionary: string[]) {
        this.targetWordCount = targetWordCount;
        this.gridSize = gridSize;
        this.sourceDictionary = sourceDictionary;
    }
}