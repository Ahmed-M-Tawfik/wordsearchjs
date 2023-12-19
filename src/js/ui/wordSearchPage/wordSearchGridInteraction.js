import {isWordSelectedInGrid} from "../../controller/controller.js";
import {markWordAsFound} from "./wordSearchWordListInteraction.js";

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

    const wordSelected = isWordSelectedInGrid(Array.from(selectedBoxes).map((gridBox) => {
        const coordStr = gridBox.id.split("-")[1];
        return coordStr.split(".");
    }));

    clearSelection();

    if(wordSelected) {
        updateFoundState(selectedBoxes);
        markWordAsFound(wordSelected);
    }
}

function handleMouseLeave(event) {
    isDragging = false;

    clearSelection();
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

function clearSelection() {
    const list = document.getElementsByClassName("selected")
    Array.from(list).forEach(function(gridItem) {
        gridItem.classList.remove("selected");
    });
}

export function updateFoundState(boxesSelected) {
    boxesSelected.forEach((gridBox) => {
        gridBox.classList.add("found");
    });
}