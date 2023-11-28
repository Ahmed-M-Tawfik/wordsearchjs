import {jest} from '@jest/globals'
import {generateRandomCharacter} from "./CharacterGenerator.mjs";

afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
})

test("generateRandomCharacterN", () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    expect(generateRandomCharacter()).toBe("N");
});

test("generateRandomCharacterF", () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.2);
    expect(generateRandomCharacter()).toBe("F");
});
