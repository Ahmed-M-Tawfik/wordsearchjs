import {registerEvent, triggerEvent} from "/dist/js/event/eventRegistry.js";
import {GameEvents} from "/dist/js/game/gameEvents.js";
import {debugWordGridItemCssClass} from "./wordSearchGamePageGenerator.js";

export function registerComponents() {
    registerEvent(GameEvents.urToggleDebugHighlightingOfWordsInWordsearch, toggleDebugHighlighting);

    registerEvent(GameEvents.gameCompleted, displayGameComplete);
}

const debugHighlightActiveCssClass = "debug-highlight";

function toggleDebugHighlighting() {
    const wordGridItems = document.getElementsByClassName(debugWordGridItemCssClass);
    for(const wordGridItem of wordGridItems) {
        wordGridItem.classList.toggle(debugHighlightActiveCssClass);
    }
    triggerEvent(GameEvents.debugHighlightingOfWordsInWordsearchToggled);
}

function displayGameComplete() {
    const winBanner = document.getElementById("winBanner");
    winBanner.classList.add("gameComplete");
}
