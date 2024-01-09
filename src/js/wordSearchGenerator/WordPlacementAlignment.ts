import {GridSize} from "../model/GridSize.ts";
import {GridItem} from "./GridItem.js";

export function selectPlacementAlignment() {
    // randomly pick alignment (horizontal, vertical, reverse h, reverse v)
    const alignment = Math.floor(Math.random() * 2); // todo make 4

    // get relevant placement logic
    let placementLocationFunc = getHorizontalPlacementLocation;
    if (alignment === 0) { // horizontal, left to right
        placementLocationFunc = getHorizontalPlacementLocation;
    } else if (alignment === 1) { // vertical, top to bottom
        placementLocationFunc = getVerticalPlacementLocation;
    }

    return placementLocationFunc;
}

function getVerticalPlacementLocation(wordToBeAdded: string, gridSize: GridSize) {
    const maxStartingRow = gridSize.rows - wordToBeAdded.length;
    const startingRow = Math.floor(Math.random() * maxStartingRow);
    const column = Math.floor(Math.random() * gridSize.columns);

    const getGridElementAt = function (grid: GridItem[][], n: number) {
        return grid[n + startingRow][column];
    }
    const setGridElementAt = function (grid: GridItem[][], n: number, data: GridItem) {
        grid[n + startingRow][column] = data;
    }

    return {getGridElementAt, setGridElementAt};
}

function getHorizontalPlacementLocation(wordToBeAdded: string, gridSize: GridSize) {
    // find the right starting point
    const maxStartingColumn = gridSize.columns - wordToBeAdded.length;
    const startingColumn = Math.floor(Math.random() * maxStartingColumn);
    const row = Math.floor(Math.random() * gridSize.rows);

    const getGridElementAt = function (grid: GridItem[][], n: number): GridItem {
        return grid[row][n + startingColumn];
    }
    const setGridElementAt = function (grid: GridItem[][], n: number, data: GridItem): void {
        grid[row][n + startingColumn] = data;
    }

    return {getGridElementAt, setGridElementAt};
}