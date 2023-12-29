import {GameConfig} from "./GameConfig.js";
import {WordSearchContent} from "./WordSearchContent.js";
import {WordSearchState} from "./WordSearchState.js";

export class GameState {
    gameConfig: GameConfig;
    wordSearchContent: WordSearchContent;
    wordSearchState: any;

    constructor(gameConfig: GameConfig, wordSearchContent: WordSearchContent, wordSearchState: WordSearchState) {
        this.gameConfig = gameConfig;
        this.wordSearchContent = wordSearchContent;
        this.wordSearchState = wordSearchState;
    }
}