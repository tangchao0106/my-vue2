function test() {
  out: for (let i = 0; i < 10; i++) {
    console.log("i==外层循环", i);

    for (let j = 0; j < 10; j++) {
      console.log("j==内层循环", j);
      if (j == 2) {
        break out;
      }
    }
  }
}
test();

const hasOwnProperty = Object.prototype.hasOwnProperty;
let obj = {
  name: "aaaa",
};
let res = hasOwnProperty.call(obj, "name1");
console.log(res);
