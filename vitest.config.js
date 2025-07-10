/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/__tests__/**/*.{test,spec}.ts'], // opsional, sesuai struktur foldermu
    deps: {
      inline: ['@vue', 'pinia'], // jika pakai composables dari Vue atau Pinia
    }
  }
})