#### my-vue2 2022年
- 添加 --sourcemap 调试
- git commit -m "" --no-verify
git commit -m "1模板解析-生成ast-优化ast" --no-verify
git commit -m "通过能力检测的结果选择不同方式进行数组劫持" --no-verify
git commit -m " 1 梳理3种类型的watcher，渲染watcher在mount模板的时候调用，计算属性watcher 懒加载get的时候放到dep收集，侦听器watcher 传参过来的是key，转换为vm['name']，cb回调在run 方法执行更新
  2 notify通知更新-遍历dep，得到watcher，创建watcher队列入栈。排序。执行run方法得到新value，执行next-tick 把cb回调数组，根据不同平台的对应方法执行 " --no-verify

