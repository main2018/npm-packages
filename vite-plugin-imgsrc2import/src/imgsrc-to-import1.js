/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-08 14:28:11
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-08 21:42:01
 * @FilePath: /h5-sesame/vitePlugins/imgsrc-to-import1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createFilter } from '@rollup/pluginutils';
import { parse } from 'svelte/compiler';

export default function imgSrcToImport() {
  const filter = createFilter('**/*.svelte'); // 只处理 .svelte 文件

  return {
    name: 'vite-plugin-img-src-to-import', // 插件名称
    transform(code, id) {
      if (!filter(id)) return; // 如果不是 .svelte 文件，直接返回

      try {
        // 解析 Svelte 文件为 AST
        const ast = parse(code, { filename: id });

        let transformedCode = code;
        let importStatements = '';

        // 用于存储已处理的 src 路径，避免重复导入
        const importedSrcMap = new Map();

        // 递归遍历 AST
        const traverse = (node) => {
          if (node.type === 'Element' && node.name === 'img') {
            // 找到 src 属性
            const srcAttr = node.attributes.find((attr) => attr.name === 'src');
            if (srcAttr && srcAttr.value.length > 0) {
              const srcValue = srcAttr.value[0].data; // 获取 src 的值
              if (srcValue.startsWith('.') && !importedSrcMap.has(srcValue)) {
                // 生成唯一的变量名
                const importName = `img_${srcValue.replace(/[^a-zA-Z0-9]/g, '_')}`;

                // 添加 import 语句
                importStatements += `import ${importName} from '${srcValue}';\n`;

                // 记录已处理的 src 路径
                importedSrcMap.set(srcValue, importName);
              }

              // 替换 src 属性的值
              if (importedSrcMap.has(srcValue)) {
                const importName = importedSrcMap.get(srcValue);
                const { start, end } = srcAttr.value[0]; // 获取 src 值的起始和结束位置

                // 替换 src 属性的值
                transformedCode =
                  transformedCode.slice(0, start) + // 保留 src 值之前的部分
                  `{${importName}}` + // 替换为动态导入的变量
                  transformedCode.slice(end); // 保留 src 值之后的部分
              }
            }
          }

          // 递归遍历子节点
          if (node.children) {
            node.children.forEach(traverse);
          }
        };

        // 从根节点开始遍历
        traverse(ast.html);

        // 在代码开头插入所有 import 语句
        if (importStatements) {
          transformedCode = `${importStatements}\n${transformedCode}`;
        }

        return {
          code: transformedCode,
          map: null, // 不生成 sourcemap
        };
      } catch (error) {
        console.error('Error transforming Svelte file:', error);
        return null;
      }
    },
  };
}