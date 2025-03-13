[npm]: https://img.shields.io/npm/v/vite-plugin-svelte-imgsrc2import
[npm-url]: https://www.npmjs.com/package/vite-plugin-svelte-imgsrc2import
[size]: https://packagephobia.now.sh/badge?p=vite-plugin-svelte-imgsrc2import
[size-url]: https://packagephobia.now.sh/result?p=vite-plugin-svelte-imgsrc2import

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# vite-plugin-svelte-imgsrc2import

🍣 A vite plugin to convert Svelte img src to import. 
🚀🚀🚀 You don't have to manually import the resource "import logo from './assets/logo.png'" and write "src={logo}", You just write 'src="./assets/logo.png"' as usual.

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
npm install vite-plugin-svelte-imgsrc2import --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```typescript
import svelteImgSrcToImport from 'vite-plugin-svelte-imgsrc2import';

export default {
  ...
  plugins: [
    svelteImgSrcToImport(),
    svelte(),
  ]
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Options

```typescript
import svelteImgSrcToImport from 'vite-plugin-svelte-imgsrc2import';

export default {
  ...
  plugins: [
    svelteImgSrcToImport({
      include: '**/*.svelte', // Process all .svelte files
      exclude: '**/ignore/*.svelte', // Exclude .svelte files in the ignore directory
      prefix: 'customPrefix_', // Custom variable name prefix
    }),
    svelte(),
  ]
};
```

<!-- ## Meta

[CONTRIBUTING](/.github/CONTRIBUTING.md)

[LICENSE (MIT)](/LICENSE) -->
