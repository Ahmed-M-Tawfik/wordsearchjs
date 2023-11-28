export function createEmptyGrid(rows, columns) {
    return Array(rows).fill(null)
        .map(
            () => Array(columns)
        );
}