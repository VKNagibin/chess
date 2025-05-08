import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'chess',
      manifest: true,
      remotes: {
        redButton: {
          type: 'module',
          name: 'redButton',
          entry: 'http://localhost:3001',
        },
      },
      shared: {
        react: {
          singleton: true,
        },
        'react/': {
          singleton: true,
        },
      },
    }),
  ],
  server: {
    origin: 'http://localhost:2000',
    port: 2000,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@img', replacement: path.resolve(__dirname, './src/assets') },
      { find: '@mui/styled-engine', replacement: '@mui/styled-engine-sc' },
    ],
  },
});
