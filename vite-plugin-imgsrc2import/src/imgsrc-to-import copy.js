import { createFilter } from '@rollup/pluginutils';

export default function imgSrcToImport() {
  const filter = createFilter('**/*.svelte'); // 只处理 .svelte 文件

  return {
    name: 'vite-plugin-img-src-to-import', // 插件名称
    transform(code, id) {
      if (!filter(id)) return; // 如果不是 .svelte 文件，直接返回

      try {
        let transformedCode = code;
        const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g; // 匹配 <img> 标签
        let importStatements = '';

        // 查找所有 <img> 标签
        let match;
        while ((match = imgRegex.exec(code)) !== null) {
          const srcValue = match[1]; // 获取 src 属性的值
          if (srcValue.startsWith('.')) {
            // 生成唯一的变量名
            const importName = `img_${srcValue.replace(/[^a-zA-Z0-9]/g, '_')}`;

            // 添加 import 语句
            importStatements += `import ${importName} from '${srcValue}';\n`;

            // 替换 src 属性
            transformedCode = transformedCode.replace(
              `src="${srcValue}"`,
              `src={${importName}}`
            );
          }
        }

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