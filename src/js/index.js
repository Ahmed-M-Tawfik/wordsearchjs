import {registerAllComponents} from "./controller/componentRegistry.js";
import {triggerEvent} from "./event/eventRegistry.ts";
import {GameEvents} from "./game/gameEvents.ts";

function init() {
    registerAllComponents();

    triggerEvent(GameEvents.urLoadMainMenu);
}

init();
