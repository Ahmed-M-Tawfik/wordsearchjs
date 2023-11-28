import {createEmptyGrid} from "./GridCreator.mjs";

test("emptyGridGenerationSquare", () => {
    let result = createEmptyGrid(3, 3);
    expect(result.length).toBe(3);
    expect(result[0].length).toBe(3);
});

test("emptyGridGenerationRectangular", () => {
    let result = createEmptyGrid(2, 5);
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(5);
});
