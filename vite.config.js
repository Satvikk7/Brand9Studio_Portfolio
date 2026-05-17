import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Auto-copy the uploaded studio9 logo asset on startup/compilation
try {
  const source = 'C:\\Users\\Satvik Gupta\\.gemini\\antigravity\\brain\\1b44ac79-8bc1-4a54-8d51-9641b1c00247\\media__1779008192250.png';
  const target = path.resolve(__dirname, './public/studio9.png');
  fs.copyFileSync(source, target);
  console.log('Successfully auto-copied logo asset to public/studio9.png');
} catch (err) {
  console.error('Failed to copy logo asset:', err.message);
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
