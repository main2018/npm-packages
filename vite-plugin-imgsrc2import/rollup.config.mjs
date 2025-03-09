import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import clear from 'rollup-plugin-clear';

export default {
  input: 'src/index.js', // 入口文件
  output: {
    
    file: 'dist/index.js', // 输出文件
    format: 'esm', // 输出格式为 ES 模块
    sourcemap: false, // 生成 sourcemap
  },
  plugins: [
    clear({ targets: ['dist'] }),
    resolve(), // 解析第三方模块
    commonjs(), // 将 CommonJS 模块转换为 ES 模块
    // typescript(), // 支持 TypeScript
    terser({
      format: {
        comments: false, // 移除注释
      },
      compress: {
        drop_console: true, // 移除 console
        drop_debugger: true, // 移除 debugger
      },
    }), // 压缩代码
  ],
};