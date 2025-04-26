/*
 * @Author: haobin.wang
 * @Date: 2025-02-08 10:40:41
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-26 22:48:54
 * @Description: Do not edit
 */
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-') || warning.code.startsWith('a11y_')) return
    handler(warning)
  },
}
process.on('beforeExit', (code) => {
  console.log('⚠️ beforeExit code:', code);
});

process.on('exit', (code) => {
  console.log('✅ exit code:', code);
});

process.on('uncaughtException', (err) => {
  console.error('💥 uncaughtException:', err);
});
