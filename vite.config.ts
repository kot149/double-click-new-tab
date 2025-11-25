import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        author: "https://github.com/kot149",
        description: "Double-click a link to open it in a new tab.",
        homepageURL: "https://github.com/kot149/double-click-new-tab",
        downloadURL: "https://github.com/kot149/double-click-new-tab/releases/latest/download/double-click-new-tab.user.js",
        match: ['*://*/*'],
        'run-at': 'document-start',
        'grant': ['GM_xmlhttpRequest'],
      },
      build: {
        fileName: 'double-click-new-tab.user.js',
        externalGlobals: {},
      },
    }),
  ],
});
