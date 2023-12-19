import {defineConfig} from 'astro/config';


// https://astro.build/config
export default defineConfig({
  base: '/fontable/',
  markdown: {
    syntaxHighlight: 'prism'
  },
  integrations: [],
  devToolbar: {
    enabled: false
  },
});
