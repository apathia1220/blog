import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    autoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: './src/auto-import.d.ts',

      eslintrc: {
        enabled: true
      }
    }),
    vue(),
    viteCompression()
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        // target: 'http://150.158.91.46:8080',
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
