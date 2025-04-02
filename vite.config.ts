import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, PluginOption } from 'vite'
// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react() as PluginOption,
    tailwindcss() as PluginOption
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    open: true
  },
  preview: {
    port: 3001,
    strictPort: true
  }
})
