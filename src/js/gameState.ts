import {WordSearchContent} from "./model/WordSearchContent.js";
import {GameConfig} from "./model/GameConfig.js";
import {GameState} from "./model/GameState.js";
import {WordSearchState} from "./model/WordSearchState.js";

export let gameState :GameState | null = null;

export function gameInit(gameConfig: GameConfig, wsContent: WordSearchContent) {
    const wordSearchState = new WordSearchState();
    gameState = new GameState(gameConfig, wsContent, wordSearchState);
}