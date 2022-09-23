/* @flow */

import config from "../config";
import { warn } from "./debug";
import { inBrowser, inWeex } from "./env";
import { isPromise } from "shared/util";
import { pushTarget, popTarget } from "../observer/dep";

export function handleError(err: Error, vm: any, info: string) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      let cur = vm;
      while ((cur = cur.$parent)) {
        const hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (let i = 0; i < hooks.length; i++) {
            try {
              const capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) return;
            } catch (e) {
              globalHandleError(e, cur, "errorCaptured hook");
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

// 根据传⼊的字符串 hook ，去拿到 vm.$options[hook] 对应的回调函数数组
// invokeWithErrorHandling 的作用就是把 handlers 数组里面的方法的 this 指向 vm，为了保证生命周期钩子函数内可以通过 this 访问实例对象；

export function invokeWithErrorHandling(
  handler: Function,
  context: any,
  args: null | any[],
  vm: any,
  info: string
) {
  let res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch((e) => handleError(e, vm, info + ` (Promise/async)`));
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, "config.errorHandler");
      }
    }
  }
  logError(err, vm, info);
}

function logError(err, vm, info) {
  if (process.env.NODE_ENV !== "production") {
    warn(`Error in ${info}: "${err.toString()}"`, vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== "undefined") {
    console.error(err);
  } else {
    throw err;
  }
}
