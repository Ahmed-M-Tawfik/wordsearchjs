import {expect} from "vitest";

expect.extend({
    toContainUniqueItems(received) {
        const items = [...(received || [])];
        items.sort();
        for (let i = 0; i < items.length - 1; i++) {
            if (items[i] === items[i + 1]) {
                return {
                    pass: false,
                    message: () => `item ${items[i]} is repeated in [${items}]`,
                };
            }
        }

        return {
            pass: true,
            message: () => `all items are unique in [${items}]`,
        };
    },
});