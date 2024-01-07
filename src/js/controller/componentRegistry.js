import * as Controller from "./controller.js";
import * as WordSearchGamePageActions from "../ui/wordSearchPage/wordSearchGamePageActions.js";
import * as WordSearchGridInteractions from "../ui/wordSearchPage/wordSearchGridInteraction.js";
import * as WordSearchWordListInteraction from "../ui/wordSearchPage/wordSearchWordListInteraction.js";

export function registerAllComponents() {
    Controller.registerComponents();
    WordSearchGamePageActions.registerComponents();
    WordSearchGridInteractions.registerComponents();
    WordSearchWordListInteraction.registerComponents();
}