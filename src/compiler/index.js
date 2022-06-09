/* @flow */

import { parse } from "./parser/index";
import { optimize } from "./optimizer";
import { generate } from "./codegen/index";
import { createCompilerCreator } from "./create-compiler";

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile(
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 解析模板字符串生成 AST
  const ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    // 优化语法树 把一些 AST 节点优化成静态节点
    // 为什么要有优化过程，因为我们知道 Vue 是数据驱动，是响应式的，
    // 但是我们的模板并不是所有数据都是响应式的，也有很多数据是首次渲染后就永远不会变化的，那么这部分数据生成的 DOM 也不会变化，我们可以在 patch 的过程跳过对他们的比对。
    optimize(ast, options);
    // 我们发现每一个 AST 元素节点都多了 staic 属性，并且 type 为 1 的普通元素 AST 节点多了 staticRoot 属性
    // 深度遍历这个 AST 树，去检测它的每一颗子树是不是静态节点，如果是静态节点则它们生成 DOM 永远不需要改变，这对运行时对模板的更新起到极大的优化作用。
  }
  // 生成代码 优化后的 AST 树转换成可执行的代码
  const code = generate(ast, options);
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns,
  };
});
