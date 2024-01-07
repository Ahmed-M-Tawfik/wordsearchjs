import {registerEvent, triggerEvent} from "/dist/js/event/eventRegistry.js";
import {GameEvents} from "/dist/js/game/gameEvents.js";

export function registerComponents() {
    registerEvent(GameEvents.validCharacterSequenceSelected, updateFoundStateUi);
}

let isDragging = false;
let selectedBoxes = new Set();

function handleMouseDown(event) {
    isDragging = true;

    selectedBoxes = new Set();
    selectedBoxes.add(event.target);
    updateSelectionUi(selectedBoxes);
}

function handleMouseMove(event) {
    if (!isDragging) {
        return;
    }

    const currentBox = event.target;
    if (!selectedBoxes.has(currentBox) && currentBox.classList.contains('gridBox')) {
        selectedBoxes.add(currentBox);
        updateSelectionUi(selectedBoxes);
    }
}

function handleMouseUp(event) {
    if(!isDragging)
        return;

    isDragging = false;

    selectedBoxes.add(event.target);

    console.log("Finished dragging. Selected boxes: " + Array.from(selectedBoxes).map(box => box.id).join(', '));

    const coordsOfSelectedCharacters = Array.from(selectedBoxes).map((gridBox) => {
        // each id comes as 'gridBox-X.Y'. Split and retrieve the coordinates
        const coordStr = gridBox.id.split("-")[1];
        return coordStr.split(".");
    });

    triggerEvent(GameEvents.urSelectCharacterSequence, coordsOfSelectedCharacters);

    clearSelectionUi();
}

function handleMouseLeave(event) {
    isDragging = false;

    clearSelectionUi();
}

export function attachEventListeners(gridContainer) {
    gridContainer.addEventListener('mousedown', handleMouseDown);
    gridContainer.addEventListener('mousemove', handleMouseMove);
    gridContainer.addEventListener('mouseup', handleMouseUp);
    gridContainer.addEventListener('mouseleave', handleMouseLeave);
}

export function updateSelectionUi(boxesSelected) {
    boxesSelected.forEach((gridBox) => {
        gridBox.classList.add("selected");
    });
}

function clearSelectionUi() {
    const list = document.getElementsByClassName("selected");
    Array.from(list).forEach(function(gridItem) {
        gridItem.classList.remove("selected");
    });
}

export function updateFoundStateUi() {
    selectedBoxes.forEach((gridBox) => {
        gridBox.classList.add("found");
    });
}