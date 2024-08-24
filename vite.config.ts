import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '_comp', replacement: path.resolve(__dirname, './src/components') },
      { find: '_img', replacement: path.resolve(__dirname, './src/assets') },
    ],
  },
});
