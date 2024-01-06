import {registerAllComponents} from "./controller/componentRegistry.js";
import {triggerEvent} from "/dist/js/event/eventRegistry.js";
import {GameEvents} from "/dist/js/game/gameEvents.js";

function init() {
    registerAllComponents();

    triggerEvent(GameEvents.urLoadMainMenu);
}

init();
