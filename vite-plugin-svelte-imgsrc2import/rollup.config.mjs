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