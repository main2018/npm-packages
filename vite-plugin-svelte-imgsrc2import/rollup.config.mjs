import resolve from '@rollup/plugin-node-resolve'; // 解析第三方模块
import commonjs from '@rollup/plugin-commonjs'; // 将 CommonJS 模块转换为 ES 模块
// import typescript from '@rollup/plugin-typescript';
import babel from "@rollup/plugin-babel";
import terser from '@rollup/plugin-terser';
import clear from 'rollup-plugin-clear';

export default {
  // mode: 'production',
  input: 'src/index.js', // 入口文件
  output: [
    {
      file: 'dist/index.mjs', // 输出 ESM 格式
      format: 'esm', // ES 模块格式
      sourcemap: false, // 生成 sourcemap
    },
    {
      file: 'dist/index.cjs', // 输出 CJS 格式
      format: 'cjs', // CommonJS 格式
      sourcemap: false, // 生成 sourcemap
    },
  ],
  external: ['svelte', 'svelte/compiler', '@sveltejs/vite-plugin-svelte'],
  plugins: [
    clear({ targets: ['dist'] }),
    resolve(), // 解析第三方模块
    commonjs(), // 将 CommonJS 模块转换为 ES 模块
    // typescript(), // 支持 TypeScript
    babel({
      // 注意runtime模式如果未安装core-js，rollup会警告：且打包产物里会不包含polyfill代码，需要用户自己引入
      // (!) Unresolved dependencies
      // https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
      // core-js/modules/es.promise.js (imported by "src/index.js")
      // 
      // 如果安装了core-js，打包产物里会包含polyfill代码，无需用户引入
      babelHelpers: "runtime",
      exclude: "node_modules/**",
    }),
    terser({
      format: {
        comments: false, // 移除注释
      },
      compress: {
        // drop_console: true, // 移除 console
        drop_debugger: true, // 移除 debugger
        pure_funcs: [ // 移除指定函数
          'console.log',
          'console.debug',
          'console.info'
        ]
      },
    }), // 压缩代码
  ],
};