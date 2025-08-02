import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  dts: true,
  clean: true,
});
