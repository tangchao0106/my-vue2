#### my-vue2 2022年
- 添加 --sourcemap 调试
- git commit -m "" --no-verify
- git commit -m "1模板解析-生成ast-优化ast" --no-verify
- git commit -m "通过能力检测的结果选择不同方式进行数组劫持" --no-verify
- git commit -m " 1 梳理3种类型的watcher，渲染watcher在mount模板的时候调用，计算属性watcher 懒加载get的时候放到dep收集，侦听器watcher 传参过来的是key，转换为vm['name']，cb回调在run 方法执行更新
  2 notify通知更新-遍历dep，得到watcher，创建watcher队列入栈。排序。执行run方法得到新value，执行next-tick 把cb回调数组，根据不同平台的对应方法执行 " --no-verify
- git commit -m "-AST生成render函数后调用_c函数，_c('cpn')如果不是默认标签，则开始处理组件3步骤， createElement 调用时如果是组件，则解析组件，1extend方法返回构造函数-2 注册组件钩子init方法-3返回vnodepatch的时候触发init钩子，标记_isComponent 为 true 表示它是一个组件 继续子组件$mount。循环，子组件的实例化实际上就是在这个时机执行， " --no-verify

- git commit -m "1全局api梳理 $forceUpdate 学习 $watch返回取消函数" --no-verify
- git commit -m "
因为HTML标签的属性名是大小写不敏感的，会被自动识别成小写
因此无法在标签标签中使用驼峰命名，但js却可以使用驼峰命名
为了解决这个冲突，Vue会在底层自动将短横线式等价为命名驼峰式，使用短横线命名在DOM模板中使用 " --no-verify

### 生命周期合并策略
- git commit -m "vue2生命周期，合并策略梳理" --no-verify
![生命周期合并策略梳理](https://github.com/tangchao0106/my-vue2/blob/main/study-images/vue2%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%90%88%E5%B9%B6%E7%AD%96%E7%95%A5%20.png)

### 组件何时挂载？
- 在组件的 VNode patch 到 DOM 后，在patch.js  会执⾏ invokeInsertHook 函数
- 执行invokeInsertHook函数。触发insert 钩子函数被触发的时候，触发了组件的mounted方法，因此组件的mounted生命周期是在VNode触发insert钩子函数的时候被调用的；代码位置 create-component.js
- 触发mounted钩子 callHook(componentInstance, "mounted");`开始遍历同类型的钩子`。
####  [生命周期合并策略](https://tangchao0106.github.io/tc-blog/vuebook/vue2%E6%BA%90%E7%A0%81%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%90%88%E5%B9%B6%E7%AD%96%E7%95%A5%E6%A2%B3%E7%90%86.html)
- 1在参数合并阶段会把所有同类钩子先合并成数组，然后存放在 vm.$options
  - 由于 insertedVnodeQueue 的添加顺序是先⼦后⽗，所以对于同步渲染的⼦组件⽽⾔，mounted 钩 ⼦函数的执⾏顺序也是先⼦后⽗
- 2初始化设置一些标志位，表明是否已经完成某种钩子;
- 3调用生命周期钩子函数执行的 callHook 方法
- 4当组件检测到存在生命周期钩子的事件侦听器时，这个时候就会执行vm.$emit('hook:' + hook) 回调函数

- 添加Git Hooks
