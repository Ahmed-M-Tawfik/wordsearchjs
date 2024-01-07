import {wordListItemIdPrefix} from "./wordSearchGamePageGenerator.js";
import {registerEvent} from "/dist/js/event/eventRegistry.js";
import {GameEvents} from "/dist/js/game/gameEvents.js";

export function registerComponents() {
    registerEvent(GameEvents.validCharacterSequenceSelected, markWordAsFound);
}

const wordFoundCssClass = "word-list-item-found";

export function markWordAsFound(wordFoundData) {
    const listItem = document.getElementById(wordListItemIdPrefix + wordFoundData.name);
    listItem.classList.add(wordFoundCssClass);
}