import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, PluginOption } from 'vite'
// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react() as PluginOption,
    tailwindcss() as PluginOption
  ],
})
