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

function getVerticalPlacementLocation(wordToBeAdded, rows, columns) {
    let maxStartingRow = rows - wordToBeAdded.length;
    let startingRow = Math.floor(Math.random() * maxStartingRow);
    let column = Math.floor(Math.random() * columns);

    let getGridElementAt = function (grid, n) {
        return grid[n + startingRow][column];
    }
    let setGridElementAt = function (grid, n, data) {
        grid[n + startingRow][column] = data;
    }

    return {getGridElementAt, setGridElementAt};
}

function getHorizontalPlacementLocation(wordToBeAdded, columns, rows) {
    // find the right starting point
    let maxStartingColumn = columns - wordToBeAdded.length;
    let startingColumn = Math.floor(Math.random() * maxStartingColumn);
    let row = Math.floor(Math.random() * rows);

    let getGridElementAt = function (grid, n) {
        return grid[row][n + startingColumn];
    }
    let setGridElementAt = function (grid, n, data) {
        grid[row][n + startingColumn] = data;
    }

    return {getGridElementAt, setGridElementAt};
}