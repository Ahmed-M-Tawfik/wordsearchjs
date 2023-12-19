import {wordListItemIdPrefix} from "./wordSearchGamePageGenerator.mjs";

export function markWordAsFound(wordSelected) {
    const listItem = document.getElementById(wordListItemIdPrefix + wordSelected);
    listItem.classList.add("word-list-item-found");
}