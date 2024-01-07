import {wordListItemIdPrefix} from "./wordSearchGamePageGenerator.js";
import {registerEvent} from "/dist/js/event/eventRegistry.js";
import {GameEvents} from "/dist/js/game/gameEvents.js";

export function registerComponents() {
    registerEvent(GameEvents.validCharacterSequenceSelected, markWordAsFound);
}

export function markWordAsFound(wordSelected) {
    const listItem = document.getElementById(wordListItemIdPrefix + wordSelected);
    listItem.classList.add("word-list-item-found");
}