import {GridItem} from "../wordSearchGenerator/GridItem.js";

export class WordSearchContent {
    grid: GridItem[][];
    wordList: string[];

    constructor(grid: GridItem[][], wordList: string[]) {
        this.grid = grid;
        this.wordList = wordList;
    }
}