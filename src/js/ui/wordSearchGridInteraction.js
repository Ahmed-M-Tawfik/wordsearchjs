let isDragging = false;

let selectedBoxes = new Set();

function handleMouseDown(event) {
    isDragging = true;

    selectedBoxes = new Set();
    selectedBoxes.add(event.target);

    console.log("Started dragging");
}

function handleMouseMove(event) {
    if (!isDragging) {
        return;
    }

    const currentBox = event.target;
    if (!selectedBoxes.has(currentBox) && currentBox.classList.contains('gridBox')) {
        selectedBoxes.add(currentBox);

        console.log("Dragging over new box");
    }
}

function handleMouseUp(event) {
    isDragging = false;

    selectedBoxes.add(event.target);

    console.log("Finished dragging. Selected boxes: " + Array.from(selectedBoxes).map(box => box.id).join(', '));
}

export function attachEventListeners(gridContainer) {
    gridContainer.addEventListener('mousedown', handleMouseDown);
    gridContainer.addEventListener('mousemove', handleMouseMove);
    gridContainer.addEventListener('mouseup', handleMouseUp);
}