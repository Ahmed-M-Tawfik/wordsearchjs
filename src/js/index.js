function init() {
    let horizontal = 8;
    let vertical = 8;

    let gridTable = document.getElementById("gameBoardTable");
    for(let i = 0; i < vertical; i++) {
        const row = document.createElement("tr");
        for(let j = 0; j < horizontal; j++) {
            const td = document.createElement("td");
            td.textContent = generateRandomCharacter();
            td.onclick = getSelectionToggleFunc(td);
            row.appendChild(td);
        }
        gridTable.appendChild(row);
    }
}

function generateRandomCharacter() {
    let charCode = Math.round(65 + Math.random() * 25);
    return String.fromCharCode(charCode);
}

function getSelectionToggleFunc(node) {
    return function () {
        node.classList.toggle("selected");
    }
}

init();