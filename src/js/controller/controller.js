import {gameInit, gameState} from "/src/js/gameState.ts";
import {generateWordSearchContent} from "/src/js/wordSearchGenerator/Main.ts";
import {drawWordSearchPage} from "../ui/wordSearchPage/wordSearchGamePageGenerator.js";
import {drawMainMenu} from "../ui/mainMenuPage.js";
import {clearPage} from "../ui/general.js";
import {GridSize} from "/src/js/model/GridSize.ts";
import {GameConfig} from "/src/js/model/GameConfig.ts";
import {registerEvent, triggerEvent} from "/src/js/event/eventRegistry.ts";
import {GameEvents} from "/src/js/game/gameEvents.ts";

// to access from web console
window.getGameState = () => gameState;

export function registerComponents() {
    registerEvent(GameEvents.urLoadMainMenu, loadMainMenu);
    registerEvent(GameEvents.urLoadGame, startDefaultGame);
    registerEvent(GameEvents.urSelectCharacterSequence, evalWordSelectedInGrid);
    registerEvent(GameEvents.validCharacterSequenceSelected, markWordAsFound);
    registerEvent(GameEvents.wordMarkedAsFound, evalAllWordsFound);
    registerEvent(GameEvents.allWordsFound, markGameAsComplete);
}

function startDefaultGame() {
    const gameBoard = getGameContainer();

    clearPage(gameBoard);

    const gridSize = new GridSize(8, 8);

    const gameConfig = new GameConfig(6, gridSize,
        ["apple", "banana", "carrot", "durian", "eggplant", "fig", "guava", "horseradish", /*"i",*/ "jackfruit", "kale", "lemon", /*"m", "n"*/]);

    gameInit(gameConfig, generateWordSearchContent(gridSize, gameConfig.targetWordCount, gameConfig.sourceDictionary));

    drawWordSearchPage(gameBoard, gameState.gameConfig.gridSize, gameState.wordSearchContent.grid, gameState.wordSearchContent.wordList);
}

function loadMainMenu() {
    const gameBoard = getGameContainer();
    clearPage(gameBoard);
    drawMainMenu(gameBoard);
}

function evalWordSelectedInGrid(coords) {
    if (coords.length === 0) {
        // no op, neither invalid nor valid - should never happen
        return;
    }

    const gridItems = coords.map((coord) => {
        return gameState.wordSearchContent.grid[coord[0]][coord[1]];
    });

    // purity: all selected values are for one word
    // handle randoms: no index = random char -> fail
    // whole word selected; not partial

    const selectedWordIndex = gridItems.reduce(
        (accumulator, currentValue) => {
            const wordIndex = currentValue.index;
            if (accumulator !== wordIndex) {
                // impure selection, fail validation
                return null;
            }
            // pure selection, preserve initial value
            return accumulator;
        },
        gridItems[0].index
    );

    if (selectedWordIndex == null || gameState.wordSearchContent.wordList[selectedWordIndex].length !== coords.length) {
        console.log("Failed to match word " + selectedWordIndex + " " + coords.length);

        triggerEvent(GameEvents.invalidCharacterSequenceSelected, coords);
        return;
    }

    const wordFoundData = {
        "index": selectedWordIndex,
        "name": gameState.wordSearchContent.wordList[selectedWordIndex]
    }
    console.log("Word matched " + wordFoundData.name);
    triggerEvent(GameEvents.validCharacterSequenceSelected, wordFoundData);
}

function markWordAsFound(wordFoundData) {
    gameState.wordSearchState.wordFoundIndex.push(wordFoundData.index);
    triggerEvent(GameEvents.wordMarkedAsFound, wordFoundData);
}

function evalAllWordsFound() {
    if(gameState.wordSearchContent.wordList.length === gameState.wordSearchState.wordFoundIndex.length) {
        triggerEvent(GameEvents.allWordsFound);
    }
}

function markGameAsComplete() {
    // nothing to do, given current logic of the game
    triggerEvent(GameEvents.gameCompleted);
}

function getGameContainer() {
    return document.getElementById("gameBoard");
}