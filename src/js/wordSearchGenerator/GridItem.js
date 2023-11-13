export class GridItem {
    #content;
    #index;
    constructor(content, index = null) {
        this.#content = content;
        this.#index = index;
    }

    get content() {
        return this.#content;
    }
    get index() {
        return this.#index;
    }
}