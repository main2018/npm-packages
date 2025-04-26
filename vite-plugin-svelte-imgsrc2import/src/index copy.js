import { createFilter } from '@rollup/pluginutils';
import { parse, preprocess } from 'svelte/compiler';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import MagicString from 'magic-string';
// svelte在线编译地址：https://svelte.dev/repl 或者 https://svelte.dev/playground/hello-world?version=5.27.0

// import { compileStringAsync } from 'sass-embedded';
import walk from './walk';
import path from 'path';
import fs from 'fs';
// import { walk } from 'estree-walker'
// import fs from 'fs'
const MyPluginName = 'vite-plugin-svelte-imgsrc2import'

const resolveSrcPath = (base, relativePath) => path.resolve(path.dirname(base), relativePath);


/**
 * 收集 Svelte 文件中通过特定函数（如 $state、$derived）声明的响应式变量
 * @param {object} ast - 通过 parse(code) 得到的 Svelte AST
 * @param {Set<string>} reactiveFns - 哪些函数名视为响应式函数
 * @returns {Set<string>} - 所有收集到的变量名
 */
export function collectAllReactiveVars(ast, reactiveFns = new Set(['$state', '$derived'])) {
  const reactiveVars = new Set();

  function scanScript(contentAst) {
    if (!contentAst) return;
    walk(contentAst, {
      enter(node) {
        if (node.type === 'VariableDeclaration') {
          // if (node.kind !== 'let' && node.kind !== 'const') return; // 只处理 let 和 const 声明的变量
          // console.log(node, 77777777);
          
          for (const decl of node.declarations) {
            // console.log(decl.init.type, decl.init.callee, decl.init.callee?.name, 8888888);
            if (
              decl.init &&
              decl.init.type === 'CallExpression' &&
              decl.init.callee?.type === 'Identifier' &&
              reactiveFns.has(decl.init.callee.name)
            ) {
              // console.log(decl.init.callee?.name, decl.id.name, 9999999);
              reactiveVars.add(decl.id.name);
            }
          }
        }
      }
    });
  }
  
  scanScript(ast.instance?.content); // 扫描 <script>
  scanScript(ast.module?.content);   // 扫描 <script context="module">

  return reactiveVars;
}
/**
 * 收集一个expression里所有用到的Identifier名字
 * @param {object} expression - svelte AST的 expression节点（比如MustacheTag.expression）
 * @returns {Set<string>} - 所有出现过的变量名字
 */
function collectIdentifiersFromExpression(expression) {
  const identifiers = new Set();

  if (!expression) return identifiers;

  walk(expression, {
    enter(node) {
      if (node.type === 'Identifier') {
        identifiers.add(node.name);
      }
    }
  });

  return identifiers;
}
/**
 * 收集一个expression里所有用到的Identifier名字，只收集最顶层的Identifier(比如a.b.c.d会只收集到a)
 * @param {object} expression - svelte AST的 expression节点（比如MustacheTag.expression）
 * @returns {Set<string>} - 所有出现过的变量名字
 * */
function collectTopLevelIdentifiersFromExpression(expression) {
  const identifiers = new Set();

  if (!expression) return identifiers;

  walk(expression, {
    enter(node) {
      if (node.type === 'Identifier') {
        identifiers.add(node.name);
      }
      if (node.type === 'MemberExpression') {
        let object = node.object;
        // 一直往上找到最顶层的 Identifier
        while (object && object.type === 'MemberExpression') {
          object = object.object;
        }
        if (object && object.type === 'Identifier') {
          identifiers.add(object.name);
        }
        // 遇到 MemberExpression 不继续往下 walk，避免重复收集
        this.skip();
      }
    }
  });

  return identifiers;
}

function extractLiteralOrTemplate(node) {
  if (node.type === 'Literal') {
    return { value: node.value, isStatic: true };
  }

  if (node.type === 'TemplateLiteral') {
    const isStatic = node.expressions.length === 0;
    const value = node.quasis.map(q => q.value.raw).join('');
    return { value, isStatic };
  }

  return { isStatic: false };
}
function getConditionalExpressionChildNodes(node) {
  if (node.type !== 'ConditionalExpression') return [];
  const childNodes = [];
  [node.consequent, node.alternate].forEach(child => {
    if (!child) return;
    if (child.type === 'ConditionalExpression') {
      childNodes.push(...getConditionalExpressionChildNodes(child));
    } else {
      childNodes.push(child);
    }
  })
  return childNodes;
}
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
    name: 'vite-plugin-svelte-imgsrc2import', // 插件名称
    enforce: 'pre', // 确保插件在解析 Svelte 文件之前运行
    // apply: 'build', // 插件在开发（serve）和构建（build）模式中调用
    configResolved(config) {
      // console.log("Plugin order:", config.plugins.map(p => p.name), config.plugins.length);
      const sveltePluginIndex = config.plugins.findIndex(p => p.name === "vite-plugin-svelte");
      if (sveltePluginIndex !== -1) {
        const myPluginIndex = config.plugins.findIndex(p => p.name === MyPluginName);
        if (myPluginIndex > sveltePluginIndex) {
          // config.plugins.splice(myPluginIndex, 1);
          // config.plugins.splice(sveltePluginIndex, 0, MyPluginName);

          // 取出插件对象，而不是 name
          const [myPlugin] = config.plugins.splice(myPluginIndex, 1);
          config.plugins.splice(sveltePluginIndex, 0, myPlugin);
          // console.log("Plugin order After:", config.plugins.map(p => p.name), config.plugins.length);
          // throw new Error(
          //   'vite-plugin-my-plugin must be placed before @sveltejs/vite-plugin-svelte in the Vite config.'
          // );
        }
      }
    },
    async transform(code, id) {
      // if (!id.includes('submissionRecord')) return
      if (!filter(id)) return null; // 如果不是 .svelte 文件，直接返回
      try {
        console.log(id, 111111);
        // 解析 Svelte 文件为 AST
        // const codeRaw = fs.readFileSync(id, 'utf-8');
        // console.log(codeRaw, 111111);
        // const ast = parse(codeRaw, { filename: id });

        // ⚠️ transform函数的code参数是处理后的代码，而不是原始代码
        // -- 要使用transform的code，插件必须在svelte插件之前，否则解析会报错, configResolved就是为了调整插件顺序保证transform的code是svelte插件处理前的代码
        // -- 或者使用load函数处理，使用fs读取原始代码，然后parse

        // // 处理sass
        // const styleMatch = code.match(/<style[^>]*lang=["']scss["'][^>]*>([\s\S]*?)<\/style>/);
        // const scssContent = styleMatch?.[1] || '';
        // // 2. 编译 SCSS -> CSS
        // const result = await compileStringAsync(scssContent);
        // const css = result.css;
        // code = code.replace(
        //   /<style[^>]*lang=["']scss["'][^>]*>[\s\S]*?<\/style>/,
        //   `<style>${css}</style>`
        // );
        // // 处理sass结束

        const preprocessed = await preprocess(code, vitePreprocess(), { filename: id });
        // console.log(preprocessed, 'preprocessed');
        code = preprocessed.code
        
        // // 去除style
        // // code先去除css部分，再解析(不然解析sass的for会报错), 先把style提取出来包含style标签，后面再补上, style有可能是多个
        // const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
        // // const codeRaw = code.replace(/<style[^>]*>[\s\S]*?<\/style>/, '');
        // console.log(styleMatch, 111111);
        // code = code.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
        // // 去除style结束

        const ast = parse(code, { filename: id });
        // console.log(codeRaw.substring(ast.instance?.content.start, ast.instance?.content.end), 222222222);
        console.log('解析成功了');
        // let transformedCode = codeRaw;
        let transformedCode = code;
        let importStatements = '';
        let importAsyncStatements = '';

        // 用于存储已处理的 src 路径，避免重复导入
        const importedSrcMap = new Map();
        // 用于记录代码修改的偏移量
        let offset = 0,
            offsetScript = 0

        const reactiveFns = new Set(['$state', '$derived', '$customState']);
        const reactiveVars = collectAllReactiveVars(ast, reactiveFns);
        console.log('收集到的所有响应式变量:', reactiveVars);

        // 递归遍历 AST
        walk(ast.html, {
          enter(node, parent, prop, index) {
            // console.log(node, 111111);
            if (node.type === 'Element' && node.name === 'img') {
              // console.log(node, 888888);
              // 找到 src 属性
              const srcAttr = node.attributes.find((attr) => attr.name === 'src');
              if (srcAttr && srcAttr.value.length > 0) {
                const srcValue = srcAttr.value[0]; // 获取 src 的值
                // const srcValue = transformedCode.substring(srcAttr.value[0].start + offset, srcAttr.value[0].end + offset); // 获取 src 的值
                // console.log(transformedCode.substring(srcAttr.value[0].start + offset, srcAttr.value[0].end + offset), srcAttr.value[0].data, 999999);
                // if (!srcValue.data) return
                if (srcValue.type === 'Text') { // 处理普通字符串 src="../assets/top.png"
                  if (!srcValue.data.startsWith('.')) return null // 只处理相对路径的 src
                  if (!importedSrcMap.has(srcValue.data)) {
                    const absPath = resolveSrcPath(id, srcValue.data);
                    if (!fs.existsSync(absPath)) {
                      console.error(`[vite-plugin-svelte-imgsrc2import] 文件不存在: ${absPath}`);
                      // throw new Error(`[vite-plugin-svelte-imgsrc2import] 文件不存在: ${absPath}`);
                      return null; // 不处理这个 src
                    }
                    // 生成唯一的变量名
                    // const importName = `img_${srcValue.data.replace(/[^a-zA-Z0-9]/g, '_')}`;
                    const importName = `${finalOptions.prefix}${srcValue.data.replace(
                      /[^a-zA-Z0-9]/g,
                      '_'
                    )}`;
    
                    // 添加 import 语句
                    importStatements += `  import ${importName} from '${srcValue.data}';\n`;
    
                    // 记录已处理的 src 路径
                    importedSrcMap.set(srcValue.data, importName);
                  }
                } else if (srcValue.type === 'MustacheTag') { // 处理动态 src
                  if (srcValue.expression?.type != 'Identifier') {
                    // const srcStr = transformedCode.slice(srcValue.start + offset, srcValue.end + offset)
                    const srcStr = transformedCode.slice(srcValue.expression.start + offset, srcValue.expression.end + offset)
                    let srcStrCopy = srcStr
                    
                    console.log('MustacheTag', srcStr);
                    
                    if (!importedSrcMap.has(srcStr)) {
                      const regRex = /["'`]?(.*?)[/\\][^/\\]+["'`]?$/
                      if (srcValue.expression?.type == 'TemplateLiteral') {
                        const dirPath = srcValue.expression?.quasis?.[0]?.value?.raw
                        
                        const absPath = resolveSrcPath(id, dirPath.match(regRex)?.[1] || srcStr);
                        if (srcValue.expression?.type == 'ConditionalExpression') {
                          console.log('ConditionalExpression', srcStr,  srcValue.expression);
                        }
                        console.log('dirPath', absPath);
                        if (!fs.existsSync(absPath)) {
                          console.error(`[vite-plugin-svelte-imgsrc2import] 目录不存在: ${absPath}`);
                          return null;
                        }
                      } else if (srcValue.expression?.type == 'ConditionalExpression') {
                        // if (srcStr.includes('gold_big')) {
                        //   console.log([srcValue], 444444);
                        // }
                        // TODO: 待处理：深层嵌套的ConditionalExpression a ? b ? c : d
                        const childNodes = getConditionalExpressionChildNodes(srcValue.expression);
                        // console.log(childNodes, 111111);

                        // const dirPaths = [srcValue.expression.consequent, srcValue.expression.alternate].filter((item) => ['Literal', 'TemplateLiteral'].includes(item?.type))
                        const dirPaths = childNodes.filter((item) => ['Literal', 'TemplateLiteral'].includes(item?.type))
                        const magicString = new MagicString(srcStr);
                        for (const dirPathObj of dirPaths) {
                          const dirPath = dirPathObj.type == 'TemplateLiteral' ? dirPathObj.quasis[0].value.raw : dirPathObj.value
                          // 判断Literal/TemplateLiteral是否是静态字符串
                          // const srcValueStr = transformedCode.slice(dirPathObj.start + 1 + offset, dirPathObj.end - 1 + offset)
                          // const isStaticLiteral = dirPathObj.type === 'Literal'
                          //                         || (dirPathObj.type === 'TemplateLiteral' && dirPathObj.expressions.length === 0);
                          const {isStatic, value: srcValueStr} = extractLiteralOrTemplate(dirPathObj)
                          if (isStatic) {
                            // import导入
                            if (!srcValueStr.startsWith('.')) return null // 只处理相对路径的 src
                            const importName = `${finalOptions.prefix}${srcValueStr.replace(
                              /[^a-zA-Z0-9]/g,
                              '_'
                            )}`;
                            // 添加 import 语句
                            if (!importedSrcMap.has(srcValueStr)) {
                              importedSrcMap.set(srcValueStr, importName);
                              importStatements += `  import ${importName} from '${srcValueStr}';\n`;
                            }
                            // importStatements += `  import ${importName} from '${srcValueStr}';\n`;
                            // srcStrCopy = srcStrCopy.replaceAll(transformedCode.slice(dirPathObj.start + offset, dirPathObj.end + offset), importName)
                            magicString.overwrite(dirPathObj.start - srcValue.expression.start, dirPathObj.end - srcValue.expression.start, importName)
                            srcStrCopy = magicString.toString()
                            // console.log(magicString.toString(), 333333);
                          }

                          let absPath = dirPathObj.type == 'TemplateLiteral'
                          ? resolveSrcPath(id, dirPath.match(regRex)?.[1] || srcStr)
                          : resolveSrcPath(id, dirPath)
                          
                          if (!fs.existsSync(absPath)) {
                            console.error(`[vite-plugin-svelte-imgsrc2import] ${dirPathObj.type == 'TemplateLiteral' ? '目录' : '文件'}不存在: ${absPath}`);
                            return null;
                            // break
                          }
                        }
                      } else if (srcValue.expression?.type == 'Literal') { // src={"./assets/num-font.png"}
                        // TODO: src={"./assets/num-font.png"} 方式的MustacheTag看是否需要转成跟srcValue.type === 'Text' 类似的处理
                        // console.log(srcStr, srcValue.expression.value, srcValue.expression.value.startsWith('.'), 777777);
                        if (!srcValue.expression.value.startsWith('.')) return // 只处理相对路径的 src
                        const absPath = resolveSrcPath(id, srcValue.expression.value);
                        if (!fs.existsSync(absPath)) {
                          console.error(`[vite-plugin-svelte-imgsrc2import] 文件不存在: ${absPath}`);
                          return; // 不处理这个 src
                        }
                      } else {
                        return null
                      }
                      // console.log(srcStr, srcValue.expression?.type, 111111);
                      // TemplateLiteral/ConditionalExpression
                      // const identifiers = collectIdentifiersFromExpression(srcValue.expression);
                      const identifiers = collectTopLevelIdentifiersFromExpression(srcValue.expression);
                      console.log('出现的变量有：', identifiers);
                      const hasReactiveVar = [...identifiers].some((name) => reactiveVars.has(name));

                      let urlStr = `new URL(${srcStrCopy}, import.meta.url).href`
                      if (hasReactiveVar) {
                        console.error(`使用到的变量中包含了响应式变量:${[...identifiers].filter((name) => reactiveVars.has(name)).join(', ')}`);
                        // return
                        urlStr = `$derived(new URL(${srcStrCopy}, import.meta.url).href)`
                      }

                      const importName = `${finalOptions.prefix}${srcStr.replace(
                        /[^a-zA-Z0-9]/g,
                        '_'
                      )}`;
                      // importAsyncStatements += `  const ${importName} = new URL(${srcStr}, import.meta.url).href\n`;
                      // importAsyncStatements += `  const ${importName} = new URL(${srcStrCopy}, import.meta.url).href\n`;
                      importAsyncStatements += `  const ${importName} = ${urlStr}\n`;
                      // console.log(srcStr, importName, importAsyncStatements, 888888);
                      importedSrcMap.set(srcStr, importName);
                    }
                  } else {
                    // console.log('srcValue', srcValue);
                    // TODO: // 处理处理表达式的路径检查
                    return null
                  }
                  // if (srcValue.expression?.type == 'TemplateLiteral') { // 处理模板字符串 src={`../assets/top${rank}.png`}
                  // }
                  // else if (srcValue.expression?.type == 'ConditionalExpression') { // 处理三元表达式 src={rank1 <= 3 ? `../assets/top${rank1}.png` : `../assets/bg_light.png`}
                  // }

                  // return
                } else {
                  return null // 只处理 Text 和 MustacheTag 类型的 src
                }
  
                // 替换 src 属性
                const srcValueData = srcValue.type === 'Text'
                  ? srcValue.data
                  : transformedCode.slice(srcValue.expression.start + offset, srcValue.expression.end + offset);
                
                if (importedSrcMap.has(srcValueData)) {
                  const importName = importedSrcMap.get(srcValueData);
                  const { start, end } = srcValue; // 获取 src 值的起始和结束位置
                  // console.log('srcValueData', srcValueData, importName, transformedCode.slice(0, start + offset), 999999);

                  // transformedCode = transformedCode.replace(
                  //   `src="${srcValue.data}"`,
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
          },
        })

        // // 在代码开头插入所有 import 语句
        // if (importStatements) {
        //   // transformedCode = `${importStatements}\n${transformedCode}`;
        //   transformedCode = transformedCode.replace('<script>', `<script>\n${importStatements}`)
        // }
        // 找到 <script> 标签的位置

        // TODO: 直接通过字符串替换修改 transformedCode 会导致 AST 的ast.instance?.content的start/end发生改变错位，需要记录offset
        const scriptTag = ast.instance?.content;
        // console.log(transformedCode.substring(ast.instance?.content.start + offsetScript, ast.instance?.content.end + offsetScript), 7777777);
        // console.log(ast.instance, transformedCode.substring(start, end), 7777777);


        if (scriptTag && importStatements) {
          // 在 <script> 标签内容开头插入 import 语句
          transformedCode =
            transformedCode.slice(0, scriptTag.start + offsetScript) + // 保留 <script> 标签之前的部分
            `\n${importStatements}\n` + // 插入 import 语句
            transformedCode.slice(scriptTag.start + offsetScript); // 保留 <script> 标签及其之后的部分
          offsetScript += `\n${importStatements}\n`.length
        }
        if (scriptTag && importAsyncStatements) {
          // 在 <script> 标签内容开头插入 import 语句
          transformedCode =
            transformedCode.slice(0, scriptTag.end + offsetScript) + // 保留 <script> 标签之前的部分
            `\n${importAsyncStatements}\n` + // 插入 import 语句
            transformedCode.slice(scriptTag.end + offsetScript); // 保留 <script> 标签及其之后的部分
          offsetScript += `\n${importAsyncStatements}\n`.length
        }
        console.log(transformedCode, 666666);

        // transformedCode += styleMatch?.join('') || ''
        return {
          code: transformedCode,
          map: null, // 不生成 sourcemap
        }
      } catch (error) {
        console.error('[vite-plugin-svelte-imgsrc2import] Error transforming Svelte file:', error);
        return null;
      }
    },
    // transform(code, id) {
    //   if (!id.includes('submissionRecord')) return
    //   if (!filter(id)) return; // 如果不是 .svelte 文件，直接返回
    //   console.log(parse(code, 111111));
    //   return null
    // }
    // handleHotUpdate({ file, server, modules, timestamp }) {
    //   // console.log('handleHotUpdate', file, server, modules, timestamp);
    // }
  };
}