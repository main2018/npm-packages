
/**
 * Recursively traverses an Abstract Syntax Tree (AST), invoking custom
 * `enter` and `leave` callbacks for each node. Allows for selective
 * traversal control, such as skipping or breaking traversal of child
 * nodes, and supports node modification or removal.
 *
 * @param {Object} ast - The root of the AST to traverse.
 * @param {Object} options - Configuration options for traversal.
 * @param {Function} options.enter - A callback function invoked when
 * entering a node. Can return 'skip' to skip child nodes, 'break' to
 * halt traversal, or modify the node.
 * @param {Function} options.leave - A callback function invoked when
 * leaving a node. Can return 'remove' to delete the node, 'break' to
 * halt traversal, or modify the node.
 * @param {Object} [options.visitors={}] - An object where keys are node
 * types and values are objects containing `enter` and `leave` functions
 * for specific node types, overriding the general `enter` and `leave`
 * functions.
 */

// function walk(ast, { enter, leave, visitors = {} }) {
//   // 递归遍历节点
//   function visit(node, parent, prop, index) {
//       if (!node || typeof node !== 'object') return;

//       // 获取当前节点类型的自定义 enter 和 leave 回调
//       const nodeVisitors = visitors[node.type] || {};
//       const enterNode = nodeVisitors.enter || enter;
//       const leaveNode = nodeVisitors.leave || leave;

//       // 调用 enter 回调
//       let enterResult;
//       if (enterNode) {
//           enterResult = enterNode(node, parent, prop, index);
//       }

//       // 如果 enter 返回 skip，跳过当前节点的子节点
//       if (enterResult === 'skip') {
//           return;
//       }

//       // 如果 enter 返回 break，停止遍历
//       if (enterResult === 'break') {
//           return 'break';
//       }

//       // 遍历节点的所有属性
//       for (const key in node) {
//           if (key === 'parent') continue; // 避免循环引用
//           const value = node[key];

//           if (Array.isArray(value)) {
//               // 遍历数组中的每个元素
//               for (let i = 0; i < value.length; i++) {
//                   const child = value[i];
//                   if (child && typeof child === 'object') {
//                       child.parent = node; // 添加 parent 引用
//                       const visitResult = visit(child, node, key, i);
//                       if (visitResult === 'break') {
//                           return 'break'; // 停止遍历
//                       }
//                       if (visitResult === 'remove') {
//                           value.splice(i, 1); // 删除当前节点
//                           i--; // 调整索引
//                       }
//                   }
//               }
//           } else if (value && typeof value === 'object') {
//               // 递归访问对象
//               value.parent = node; // 添加 parent 引用
//               const visitResult = visit(value, node, key, null);
//               if (visitResult === 'break') {
//                   return 'break'; // 停止遍历
//               }
//               if (visitResult === 'remove') {
//                   delete node[key]; // 删除当前节点
//               }
//           }
//       }

//       // 调用 leave 回调
//       let leaveResult;
//       if (leaveNode) {
//           leaveResult = leaveNode(node, parent, prop, index);
//       }

//       // 如果 leave 返回 remove，删除当前节点
//       if (leaveResult === 'remove') {
//           if (Array.isArray(parent[prop])) {
//               return 'remove'; // 通知父节点删除
//           } else {
//               delete parent[prop]; // 直接删除
//           }
//       }

//       // 如果 leave 返回 break，停止遍历
//       if (leaveResult === 'break') {
//           return 'break';
//       }
//   }

//   // 开始遍历
//   visit(ast, null, null, null);
// }

function walk(ast, { enter, leave, visitors = {} }) {
    function visit(node, parent, prop, index) {
      if (!node || typeof node !== 'object') return;
  
      // 注入 context 给 enter/leave，用来支持 this.skip this.break this.remove
      const context = {
        skip: () => context._skip = true,
        break: () => context._break = true,
        remove: () => context._remove = true,
      };
  
      const nodeVisitors = visitors[node.type] || {};
      const enterNode = nodeVisitors.enter || enter;
      const leaveNode = nodeVisitors.leave || leave;
  
      // 调用 enter
      if (enterNode) {
        enterNode.call(context, node, parent, prop, index);
      }
  
      if (context._break) return 'break'; // 停止整个遍历
      if (context._remove) return 'remove'; // 当前节点需要被移除
      if (!context._skip) {
        // 继续递归子节点
        for (const key in node) {
          if (key[0] === '_') continue; // 忽略 _开头的辅助属性，比如 _parent
          const value = node[key];
  
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              const child = value[i];
              if (child && typeof child === 'object') {
                child._parent = node; // 添加 _parent 引用
                const visitResult = visit(child, node, key, i);
                if (visitResult === 'break') return 'break';
                if (visitResult === 'remove') {
                  value.splice(i, 1);
                  i--;
                }
              }
            }
          } else if (value && typeof value === 'object') {
            value._parent = node;
            const visitResult = visit(value, node, key, null);
            if (visitResult === 'break') return 'break';
            if (visitResult === 'remove') {
              delete node[key];
            }
          }
        }
      }
  
      // leave
      context._skip = false; // leave之前把skip清掉
      if (leaveNode) {
        leaveNode.call(context, node, parent, prop, index);
      }
  
      if (context._break) return 'break';
      if (context._remove) {
        if (Array.isArray(parent?.[prop])) {
          return 'remove';
        } else {
          delete parent[prop];
        }
      }
    }
  
    visit(ast, null, null, null);
  }
  

// // 示例：遍历 AST 并测试自定义节点访问逻辑
// const ast = {
//   type: 'Program',
//   body: [
//       {
//           type: 'VariableDeclaration',
//           declarations: [
//               {
//                   type: 'VariableDeclarator',
//                   id: { type: 'Identifier', name: 'x' },
//                   init: { type: 'Literal', value: 42 }
//               }
//           ],
//           kind: 'let'
//       },
//       {
//           type: 'ExpressionStatement',
//           expression: {
//               type: 'CallExpression',
//               callee: { type: 'Identifier', name: 'console.log' },
//               arguments: [{ type: 'Identifier', name: 'x' }]
//           }
//       }
//   ]
// };

// walk(ast, {
//   // 通用的 enter 回调
//   enter(node, parent, prop, index) {
//       console.log(`Entering ${node.type}`);
//   },
//   // 通用的 leave 回调
//   leave(node, parent, prop, index) {
//       console.log(`Leaving ${node.type}`);
//   },
//   // 自定义节点访问逻辑
//   visitors: {
//       Identifier: {
//           enter(node, parent, prop, index) {
//               console.log(`Entering Identifier: ${node.name}`);
//               if (node.name === 'x') {
//                   node.name = 'y'; // 修改 Identifier 的名称
//               }
//           },
//           leave(node, parent, prop, index) {
//               console.log(`Leaving Identifier: ${node.name}`);
//           }
//       },
//       Literal: {
//           enter(node, parent, prop, index) {
//               console.log(`Entering Literal: ${node.value}`);
//               if (node.value === 42) {
//                   node.value = 100; // 修改 Literal 的值
//               }
//           },
//           leave(node, parent, prop, index) {
//               console.log(`Leaving Literal: ${node.value}`);
//           }
//       }
//   }
// });

// console.log(JSON.stringify(ast, null, 2));

export default walk;