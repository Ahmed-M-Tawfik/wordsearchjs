import {registerEvent, triggerEvent} from "/dist/js/event/eventRegistry.js";
import {GameEvents} from "/dist/js/game/gameEvents.js";
import {debugWordGridItemCssClass} from "./wordSearchGamePageGenerator.js";

export function registerComponents() {
    registerEvent(GameEvents.urToggleDebugHighlightingOfWordsInWordsearch, toggleDebugHighlighting);
}

const debugHighlightActiveCssClass = "debug-highlight";

export function toggleDebugHighlighting() {
    const wordGridItems = document.getElementsByClassName(debugWordGridItemCssClass);
    for(const wordGridItem of wordGridItems) {
        wordGridItem.classList.toggle(debugHighlightActiveCssClass);
    }
    triggerEvent(GameEvents.debugHighlightingOfWordsInWordsearchToggled);
}