// import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import app from './package.json';

// import { dependencies } from './package.json';

export default defineConfig({
  publicDir: 'public',
  build: {
    outDir: 'build',
    minify: 'esbuild',
    sourcemap: false,
  },
  define: {
    __APP__: JSON.stringify({
      name: app.name,
      version: app.version,
    }),
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        svgo: true,
      },
      include: '**/*.svg',
      exclude: ['/public'],
    }),
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
    devSourcemap: false,
  },
  server: {
    port: 2000,
    strictPort: true,
    open: true,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'test', replacement: path.resolve(__dirname, 'test') },
      { find: 'icons', replacement: path.resolve(__dirname, 'src', 'assets', 'icons') },
    ],
  },
});

// npx vite-bundle-analyzer build/
