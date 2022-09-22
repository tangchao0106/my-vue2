function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 * 对连字符分隔的字符串进行骆驼化。
 */
const camelizeRE = /-(\w)/g;
const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

/**
 * Capitalize a string.
 */
const capitalize = cached((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

// console.log(capitalize("AbdfbaBdfa"));
console.log(camelize("Abdfb_aBdfa"));
