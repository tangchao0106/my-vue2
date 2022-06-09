function toArray(list, start) {
  start = start || 0;
  let i = list.length - start;
  console.log("ii==", i);
  const ret = new Array(i);
  console.log("ret==", ret);

  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

console.log(toArray([1, 2, 3], 1));
