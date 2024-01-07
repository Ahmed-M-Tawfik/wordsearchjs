import * as Controller from "./controller.js";
import * as WordSearchGamePageActions from "../ui/wordSearchPage/wordSearchGamePageActions.js";

export function registerAllComponents() {
    Controller.registerComponents();
    WordSearchGamePageActions.registerComponents();
}