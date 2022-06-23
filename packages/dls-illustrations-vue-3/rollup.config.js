import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import autoExternal from 'rollup-plugin-auto-external'

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from'
  ],
  exclude: 'node_modules/**',
  extensions: ['.js'],
  babelHelpers: 'bundled',
}

export default {
  input: 'src/index.js',
  plugins: [
    resolve(),
    babel(babelConfig),
    autoExternal({ dependencies: false }),
  ],
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
}
