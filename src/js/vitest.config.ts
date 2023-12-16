import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        setupFiles: ["./src/js/setup.vitest.js"]
    },
});