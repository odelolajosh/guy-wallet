import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
  },
  // configure aliases
  resolve: {
    alias: {
      '@': '/'
    }
  }
})