import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // Permite usar describe/it sem importar em cada arquivo
    environment: 'node', // Define o ambiente como Node.js
    coverage: {
      provider: 'v8', // Usa c8 para relatório de cobertura
      enabled: true,
      include: ['**/*.ts'],
      exclude: ['node_modules', 'dist', '**/*.d.ts'],
    },
  },
})
