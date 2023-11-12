export let gameState = {}

export function gameInit(gameConfig, gameContent) {
    gameState = {
        gridSize: {
            rows: gameConfig.rows,
            columns: gameConfig.columns
        },
        grid: gameContent.grid,
        currentSelection: Array,
        existingWords: gameContent.wordList
    };
}