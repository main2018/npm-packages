import { createFilter } from '@rollup/pluginutils';
import { parse } from 'svelte/compiler';
// import { walk } from 'estree-walker'
import fs from 'fs'

export default function imgSrcToImport(options) {
  // 默认配置
  const defaultOptions = {
    include: '**/*.svelte', // 默认处理所有 .svelte 文件
    exclude: undefined, // 默认不排除任何文件
    prefix: 'img_', // 默认变量名前缀
  };
  // 合并用户配置和默认配置
  const finalOptions = { ...defaultOptions, ...options };


  // const filter = createFilter('**/*.svelte'); // 只处理 .svelte 文件
  // 创建文件过滤器
  const filter = createFilter(finalOptions.include, finalOptions.exclude);

  return {
    name: 'vite-plugin-img-src-to-import', // 插件名称
    // enforce: 'pre', // 确保插件在解析 Svelte 文件之前运行
    // apply: 'build', // 插件在开发（serve）和构建（build）模式中调用
    load(id) {
      // if (!id.includes('submissionRecord')) return
      if (!filter(id)) return; // 如果不是 .svelte 文件，直接返回
      try {
        // 解析 Svelte 文件为 AST
        const codeRaw = fs.readFileSync(id, 'utf-8');
        console.log(codeRaw, 111111);
        const ast = parse(codeRaw, { filename: id });
        // console.log(codeRaw.substring(ast.instance?.content.start, ast.instance?.content.end), 222222222);
        console.log('解析成功了');
        let transformedCode = codeRaw;
        let importStatements = '';

        // 用于存储已处理的 src 路径，避免重复导入
        const importedSrcMap = new Map();
        // 用于记录代码修改的偏移量
        let offset = 0,
            offsetScript = 0


        // 递归遍历 AST
        const traverse = (node) => {
          if (node.type === 'Element' && node.name === 'img') {
            // console.log(node, 888888);
            // 找到 src 属性
            const srcAttr = node.attributes.find((attr) => attr.name === 'src');
            if (srcAttr && srcAttr.value.length > 0) {
              const srcValue = srcAttr.value[0].data; // 获取 src 的值
              // const srcValue = transformedCode.substring(srcAttr.value[0].start + offset, srcAttr.value[0].end + offset); // 获取 src 的值
              // console.log(transformedCode.substring(srcAttr.value[0].start + offset, srcAttr.value[0].end + offset), srcAttr.value[0].data, 999999);
              if (!srcValue) return
              if (srcValue.startsWith('.') && !importedSrcMap.has(srcValue)) {
                // 生成唯一的变量名
                // const importName = `img_${srcValue.replace(/[^a-zA-Z0-9]/g, '_')}`;
                const importName = `${finalOptions.prefix}${srcValue.replace(
                  /[^a-zA-Z0-9]/g,
                  '_'
                )}`;

                // 添加 import 语句
                importStatements += `  import ${importName} from '${srcValue}';\n`;

                // 记录已处理的 src 路径
                importedSrcMap.set(srcValue, importName);
              }

              // 替换 src 属性
              if (importedSrcMap.has(srcValue)) {
                const importName = importedSrcMap.get(srcValue);
                const { start, end } = srcAttr.value[0]; // 获取 src 值的起始和结束位置
                // transformedCode = transformedCode.replace(
                //   `src="${srcValue}"`,
                //   `src={${importName}}`
                // );
                // 改进成用start end
                transformedCode =
                  transformedCode.slice(0, start + offset) + // 保留 src 值之前的部分
                  `{${importName}}` + // 替换为动态导入的变量
                  transformedCode.slice(end + offset); // 保留 src 值之后的部分
                // srcAttr.value[0].data = `{${importName}}`;
                  // console.log(srcAttr.value[0].data, "ABCD");
                // 更新偏移量
                // html不用考虑前后问题，因为是顺序处理的
                offset += `{${importName}}`.length - (end - start);
                // 判断当前元素在script之前还是之后，之前需要修改offsetScript，之后不需要
                const isDomAfterScript =  start > ast.instance?.content.start
                // console.log(srcAttr.value[0].data, isDomAfterScript, 999999);
                if (!isDomAfterScript) offsetScript += `{${importName}}`.length - (end - start)
              }
            }
          }

          // 递归遍历子节点
          if (node.children) {
            node.children.forEach(traverse);
          }
        };
        // walk(ast.html, {
        //   enter: (node) => {
            
        //   }
        // })

        // 从根节点开始遍历
        traverse(ast.html);

        // // 在代码开头插入所有 import 语句
        // if (importStatements) {
        //   // transformedCode = `${importStatements}\n${transformedCode}`;
        //   transformedCode = transformedCode.replace('<script>', `<script>\n${importStatements}`)
        // }
        // 找到 <script> 标签的位置

        // TODO: 直接通过字符串替换修改 transformedCode 会导致 AST 的ast.instance?.content的start/end发生改变错位，需要记录offset
        const scriptTag = ast.instance?.content;
        console.log(transformedCode.substring(ast.instance?.content.start + offsetScript, ast.instance?.content.end + offsetScript), 7777777);
        // console.log(ast.instance, transformedCode.substring(start, end), 7777777);
        if (scriptTag && importStatements) {
          // 在 <script> 标签内容开头插入 import 语句
          transformedCode =
            transformedCode.slice(0, scriptTag.start + offsetScript) + // 保留 <script> 标签之前的部分
            `\n${importStatements}\n` + // 插入 import 语句
            transformedCode.slice(scriptTag.start + offsetScript); // 保留 <script> 标签及其之后的部分
        }
        console.log(transformedCode, 666666);

        return transformedCode
      } catch (error) {
        console.error('Error transforming Svelte file:', error);
        return null;
      }
    },
    // transform(code, id) {
    //   if (!id.includes('submissionRecord')) return
    //   if (!filter(id)) return; // 如果不是 .svelte 文件，直接返回
    //   console.log(parse(code, 111111));
    //   return null
    // }
  };
}