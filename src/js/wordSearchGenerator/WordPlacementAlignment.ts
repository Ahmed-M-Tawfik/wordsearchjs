import {GridSize} from "../model/GridSize.js";
import {GridItem} from "./GridItem.js";

export function selectPlacementAlignment() {
    // randomly pick alignment (horizontal, vertical, reverse h, reverse v)
    let alignment = Math.floor(Math.random() * 2); // todo make 4

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
    let maxStartingRow = gridSize.rows - wordToBeAdded.length;
    let startingRow = Math.floor(Math.random() * maxStartingRow);
    let column = Math.floor(Math.random() * gridSize.columns);

    let getGridElementAt = function (grid: GridItem[][], n: number) {
        return grid[n + startingRow][column];
    }
    let setGridElementAt = function (grid: GridItem[][], n: number, data: GridItem) {
        grid[n + startingRow][column] = data;
    }

    return {getGridElementAt, setGridElementAt};
}

function getHorizontalPlacementLocation(wordToBeAdded: string, gridSize: GridSize) {
    // find the right starting point
    let maxStartingColumn = gridSize.columns - wordToBeAdded.length;
    let startingColumn = Math.floor(Math.random() * maxStartingColumn);
    let row = Math.floor(Math.random() * gridSize.rows);

    let getGridElementAt = function (grid: GridItem[][], n: number) {
        return grid[row][n + startingColumn];
    }
    let setGridElementAt = function (grid: GridItem[][], n: number, data: GridItem) {
        grid[row][n + startingColumn] = data;
    }

    return {getGridElementAt, setGridElementAt};
}