import {GameConfig} from "./GameConfig.ts";
import {WordSearchContent} from "./WordSearchContent.js";
import {WordSearchState} from "./WordSearchState.js";

export class GameState {
    gameConfig: GameConfig;
    wordSearchContent: WordSearchContent;
    wordSearchState: WordSearchState;

    constructor(gameConfig: GameConfig, wordSearchContent: WordSearchContent, wordSearchState: WordSearchState) {
        this.gameConfig = gameConfig;
        this.wordSearchContent = wordSearchContent;
        this.wordSearchState = wordSearchState;
    }
}