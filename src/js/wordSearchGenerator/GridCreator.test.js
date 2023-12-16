import {afterEach, it, vi, expect} from "vitest";
import {createEmptyGrid} from "./GridCreator.mjs";

it("should generate a 3x3 square empty grid", () => {
    const result = createEmptyGrid(3, 3);

    expect(result.length).toBe(3);
    expect(result[0].length).toBe(3);
    expect(result[0][0]).toBeUndefined();
});

it("should generate a 2x3 rectangular empty grid", () => {
    const result = createEmptyGrid(2, 5);

    expect(result.length).toBe(2);
    expect(result[0].length).toBe(5);
    expect(result[0][0]).toBeUndefined();
});
