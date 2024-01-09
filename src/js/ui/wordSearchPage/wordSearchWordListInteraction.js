import {wordListItemIdPrefix} from "./wordSearchGamePageGenerator.js";
import {registerEvent} from "/src/js/event/eventRegistry.ts";
import {GameEvents} from "/src/js/game/gameEvents.ts";

export function registerComponents() {
    registerEvent(GameEvents.validCharacterSequenceSelected, markWordAsFound);
}

const wordFoundCssClass = "word-list-item-found";

export function markWordAsFound(wordFoundData) {
    const listItem = document.getElementById(wordListItemIdPrefix + wordFoundData.name);
    listItem.classList.add(wordFoundCssClass);
}