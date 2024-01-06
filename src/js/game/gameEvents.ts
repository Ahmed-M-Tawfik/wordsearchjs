import {GameEvent} from "../event/GameEvent.js";

/**
 * Retrieve an event from here and use with event registry
 */
export const Events = {
    // ur: user requests - user initiated actions
    // nounVerb (past tense): game events - generated by game logic

    "urLoadMainMenu": new GameEvent("urLoadMainMenu"),
    "mainMenuLoaded": new GameEvent("mainMenuLoaded"),

    "urLoadCustomGameConfigMenu": new GameEvent("urLoadCustomGameConfigMenu"),
    "customGameConfigMenuLoaded": new GameEvent("customGameConfigMenuLoaded"),

    "urLoadGame": new GameEvent("urLoadGame"),
    "gameLoaded": new GameEvent("gameLoaded"),

    // user has selected a sequence of characters in the wordsearch
    "urSelectCharacterSequence": new GameEvent("urSelectCharacterSequence"),
    // char sequence matches a word in the word list
    "validCharacterSequenceSelected": new GameEvent("validCharacterSequenceSelected"),
    // char sequence does NOT match a word in the word list
    "invalidCharacterSequenceSelected": new GameEvent("invalidCharacterSequenceSelected"),

    "wordMarkedAsFound": new GameEvent("wordMarkedAsFound"),
    "allWordsFound": new GameEvent("allWordsFound"),

    // win scenario has been achieved
    "gameCompleted": new GameEvent("gameCompleted"),
}