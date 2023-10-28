import {defineConfig} from 'vite';
import {resolve} from 'path';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [dts(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: [
        resolve(__dirname, 'lib/index.ts'),
        resolve(__dirname, 'lib/auto.ts'),
      ]
    }
  }
});
