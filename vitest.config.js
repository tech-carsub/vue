import { defineConfig } from 'vitest/config'
import config from './example/vite.config.js'

export default defineConfig({
  ...config,
  test: {
    environment: 'happy-dom'
  }
})
