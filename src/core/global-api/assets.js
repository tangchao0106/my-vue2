/* @flow */

import { template } from "lodash";
import { ASSET_TYPES } from "shared/constants";
import { isPlainObject, validateComponentName } from "../util/index";

export function initAssetRegisters(Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach((type) => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + "s"][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== "production" && type === "component") {
          validateComponentName(id);
        }
        if (type === "component" && isPlainObject(definition)) {
          //把配置的组件转换，放在options上，
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === "directive" && typeof definition === "function") {
          definition = { bind: definition, update: definition };
        }
        this.options[type + "s"][id] = definition;
        return definition;
      }
    };
  });
}
// 使用 注册全局组件
// let cmp = Vue.component("cpn", {
//   data() {},
//   template: "<h2>注册全局组件</h2>",
// });

// 注册
// Vue.directive('my-directive', {
//   bind: function () {},
//   inserted: function () {},
//   update: function () {},
//   componentUpdated: function () {},
//   unbind: function () {}
// })

// // 注册 (指令函数)
// Vue.directive('my-directive', function () {
//   // 这里将会被 `bind` 和 `update` 调用
// })

// // getter，返回已注册的指令
// var myDirective = Vue.directive('my-directive')

// 注册
// Vue.filter('my-filter', function (value) {
//   // 返回处理后的值
// })

// // getter，返回已注册的过滤器
// var myFilter = Vue.filter('my-filter')
