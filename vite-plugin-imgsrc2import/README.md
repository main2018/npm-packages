[npm]: https://img.shields.io/npm/v/vite-plugin-imgsrc2import
[npm-url]: https://www.npmjs.com/package/vite-plugin-imgsrc2import
[size]: https://packagephobia.now.sh/badge?p=vite-plugin-imgsrc2import
[size-url]: https://packagephobia.now.sh/result?p=vite-plugin-imgsrc2import

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# vite-plugin-imgsrc2import

🍣 A vite plugin to convert Svelte img src to import.

## covert
before convert:
```svelte
<img src="./assets/logo.png" alt="logo">
```
after convert:
```svelte
<script>
  import img___assets_logo_png from './assets/img/a.png';
</script>
<img src={img___assets_logo_png} alt="logo">
```

## Install

Using npm:

```console
npm install vite-plugin-imgsrc2import --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```typescript
import imgSrcToImport from 'vite-plugin-imgsrc2import';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [imgSrcToImport()]
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Options

```typescript
import imgSrcToImport from 'vite-plugin-imgsrc2import';

export default {
  ...
  plugins: [
    imgSrcToImport({
      include: '**/*.svelte', // 处理所有 .svelte 文件
      exclude: '**/ignore/*.svelte', // 排除 ignore 目录下的 .svelte 文件
      prefix: 'customPrefix_', // 自定义变量名前缀
    }),
  ]
};
```

<!-- ## Meta

[CONTRIBUTING](/.github/CONTRIBUTING.md)

[LICENSE (MIT)](/LICENSE) -->
