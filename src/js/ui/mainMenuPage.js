import {startDefaultGame} from "../controller/controller.js";

let gameContainer = null;

export function drawMainMenu(container) {
    gameContainer = container;

    const menuContainer = document.createElement("div");
    menuContainer.id = "menuContainer";
    menuContainer.classList.add("no-select");
    // menuContainer.classList.add("menu", "no-select");

    const startDefaultGameButton = document.createElement("button");
    startDefaultGameButton.textContent = "Start default game";
    startDefaultGameButton.addEventListener('click', startGameDefaultSettings)
    menuContainer.appendChild(startDefaultGameButton);

    const customConfigGameButton = document.createElement("button");
    customConfigGameButton.textContent = "Configure and start game";
    //startDefaultGameButton.addEventListener()
    menuContainer.appendChild(customConfigGameButton);

    container.appendChild(menuContainer);
}

function clearMainMenu(container) {
    container.replaceChildren();
}

function startGameDefaultSettings() {
    clearMainMenu(gameContainer);
    startDefaultGame(gameContainer);
}