// import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// import { dependencies } from './package.json';

export default defineConfig({
  publicDir: 'public',
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    // federation({
    //   name: 'chess',
    //   remotes: {
    //     redButton: {
    //       name: 'redButton',
    //       type: 'module',
    //       entry: './dist/remoteEntry.js',
    //     },
    //   },
    //   shared: {
    //     react: {
    //       singleton: true,
    //       requiredVersion: dependencies['react'],
    //     },
    //     'react-dom': {
    //       singleton: true,
    //       requiredVersion: dependencies['react-dom'],
    //     },
    //   },
    // }),
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
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
