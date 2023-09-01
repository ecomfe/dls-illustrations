> ⚠️ - Breaking Changes

## 1.4.2

- Fixed Vue version.

## 1.4.1

- Added instance IDs to prevent conflict.

## 1.4.0

- Added TypeScript support.
- Added `forwardRef` support for React version.

## 1.3.3

- Fixed `className` for React.

## 1.3.2

- Fixed rollup config and now the output depends on `dls-graphics`.

## 1.3.1

- Fixed intrinsic class output for `dls-illustrations-vue`.

## 1.3.0

- Deprecated `partial-{*}` and `under-review`.
- Added spot level illustrations.
- Added more hero level illustrations.

## 1.3.0-beta.1

- Added `dls-illustrations-{react,vue,vue-3}`.

## 1.2.0

- Added `under-review`.

## 1.1.2

- Updated deps for SVGO.
- Added ID cleanup and prevent collision.

## 1.1.1

- Updated `not-found`.

## 1.1.0

- Updated `blank`, `partial-blank`, `partial-blank-brush`, `image-placeholder`, `forbidden`, `not-found`, `partial-error`, `partial-forbidden` and `server-error`.

## 1.0.0

- Adjusted the implementation of `loading` so that it won't trigger Chrome's bug that sometimes animation of different eleeents is not synchronized.

## 1.0.0-alpha.2

- Added `blank`, `partial-blank`, `partial-blank-brush` and `image-placeholder`.

## 1.0.0-alpha.2

- New design for `forbidden`, `not-found` and `server-error`.
- Added `partial-error` and `partial-forbidden`.

## 1.0.0-alpha.1

- ⚠️ Removed `dist/separate/index.js`.
- All exports are merged in the main entry. For an asset named `foo`, we always export `foo`, `fooContent` and `fooCss` at the same time.
- Provided a CJS entry at `dist/index.cjs.js`.

## 0.1.4

- Fix `module` entry.

## 0.1.3

- Export `<name>Css` even when no styles can be extracted so that implementation can be more transparent.

## 0.1.2

- ⚠️ Adjuted the output of separate data. Move CSS content to individual export statements.

## 0.1.1

- ⚠️ Renamed `dist/separated` to `dist/separate`.
- Added separate data to ES output.

## 0.1.0

- First release, add loading/forbidden/not-found/server-error.
