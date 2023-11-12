export let gameState = {}

function generateRandomCharacter() {
    let charCode = Math.round(65 + Math.random() * 25);
    return String.fromCharCode(charCode);
}

export function gameInit(gameConfig) {
    gameState = {
        gridSize: {
            rows: gameConfig.rows,
            columns: gameConfig.columns
        },
        grid: Array(gameConfig.rows)
            .fill()
            .map(() => Array(gameConfig.columns)
                .fill()
                .map(() => generateRandomCharacter())),
        currentSelection: Array,
        existingWords: Array
    };
}