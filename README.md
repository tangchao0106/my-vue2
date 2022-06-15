#### my-vue2 2022年
- 添加 --sourcemap 调试
- git commit -m "" --no-verify
- git commit -m "1模板解析-生成ast-优化ast" --no-verify
- git commit -m "通过能力检测的结果选择不同方式进行数组劫持" --no-verify
- git commit -m " 1 梳理3种类型的watcher，渲染watcher在mount模板的时候调用，计算属性watcher 懒加载get的时候放到dep收集，侦听器watcher 传参过来的是key，转换为vm['name']，cb回调在run 方法执行更新
  2 notify通知更新-遍历dep，得到watcher，创建watcher队列入栈。排序。执行run方法得到新value，执行next-tick 把cb回调数组，根据不同平台的对应方法执行 " --no-verify
- git commit -m "-AST生成render函数后调用_c函数，_c('cpn')如果不是默认标签，则开始处理组件3步骤， createElement 调用时如果是组件，则解析组件，1extend方法返回构造函数-2 注册组件钩子init方法-3返回vnode
patch的时候触发init钩子，标记_isComponent 为 true 表示它是一个组件 继续子组件$mount。循环，子组件的实例化实际上就是在这个时机执行， " --no-verify
