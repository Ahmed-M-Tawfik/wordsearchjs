import {wordListItemIdPrefix} from "./wordSearchGamePageGenerator.js";

export function markWordAsFound(wordSelected) {
    const listItem = document.getElementById(wordListItemIdPrefix + wordSelected);
    listItem.classList.add("word-list-item-found");
}