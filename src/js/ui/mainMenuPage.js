import {triggerEvent} from "/dist/js/event/eventRegistry.js";
import {GameEvents} from "/dist/js/game/gameEvents.js";

let gameContainer = null;

export function drawMainMenu(container) {
    gameContainer = container;

    const menuContainer = document.createElement("div");
    menuContainer.id = "menuContainer";
    menuContainer.classList.add("no-select", "menuContainer");

    const startDefaultGameButton = document.createElement("button");
    startDefaultGameButton.textContent = "Start default game";
    startDefaultGameButton.addEventListener('click', startGameDefaultSettingsBtn)
    menuContainer.appendChild(startDefaultGameButton);

    const customConfigGameButton = document.createElement("button");
    customConfigGameButton.textContent = "Configure and start game";
    //startDefaultGameButton.addEventListener()
    menuContainer.appendChild(customConfigGameButton);

    container.appendChild(menuContainer);
}

function startGameDefaultSettingsBtn() {
    triggerEvent(GameEvents.urLoadGame);
}