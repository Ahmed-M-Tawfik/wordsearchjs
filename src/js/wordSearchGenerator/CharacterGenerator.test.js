import {afterEach, it, vi, expect} from "vitest";
import {generateRandomCharacter} from "./CharacterGenerator.ts";

afterEach(() => {
    vi.spyOn(global.Math, 'random').mockRestore();
})

it("should generate N to be the random character", () => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.5);
    expect(generateRandomCharacter()).toBe("N");
});

it("should generate F to be the random character", () => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.2);
    expect(generateRandomCharacter()).toBe("F");
});
