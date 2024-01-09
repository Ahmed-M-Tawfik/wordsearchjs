import {GridItem} from "../wordSearchGenerator/GridItem.ts";

export class WordSearchContent {
    grid: GridItem[][];
    wordList: string[];

    constructor(grid: GridItem[][], wordList: string[]) {
        this.grid = grid;
        this.wordList = wordList;
    }
}