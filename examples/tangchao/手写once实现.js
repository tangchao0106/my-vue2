function once(fn) {
  let res;
  return function (...args) {
    if (!fn) return res;
    res = fn(...args);
    fn = undefined;
    return res;
  };
}

const addOnce = once(function (a, b) {
  return a + b;
});

console.log(addOnce(1, 2));
console.log(addOnce(1, 2000));
