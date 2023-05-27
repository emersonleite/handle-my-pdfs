import { generateSW } from 'workbox-build';

generateSW({
  swDest: './dist/sw.js',
  globDirectory: './dist',
  globPatterns: ['**/*.js', '**/*.css', '**/*.svg'],
});
