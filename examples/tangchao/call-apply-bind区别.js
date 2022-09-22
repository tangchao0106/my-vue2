// call 是函数的方法 改变this指向
function fn() {
  console.log("call 是函数的方法 改变this指向", this.name);
}
let dog = {
  name: "dog-name",
};
// fn.call(dog);
let dog2 = {
  name: "dog2",
  say(a, b) {
    console.log("传参", this.name, a, b);
  },
};
// dog2.say();
// dog2.say.call(dog);
// dog2.say.call(dog, "aa", "bb");
// dog2.say.apply(dog, ["apply1", "apply12"]);

// bind返回函数;
// let fun3 = dog2.say.bind(dog, "aa", "bb");
// fun3();
let fun3 = dog2.say.bind(dog);
fun3("11", "22");
//传参
