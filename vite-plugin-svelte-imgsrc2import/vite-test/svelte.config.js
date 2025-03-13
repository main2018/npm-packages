/*
 * @Author: haobin.wang
 * @Date: 2025-02-08 10:40:41
 * @LastEditors: haobin.wang
 * @LastEditTime: 2025-02-21 14:26:23
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
