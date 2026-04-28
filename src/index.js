"use strict";
function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) {
    this[i] = args[i];
    this.length++;
  }
}

MyArray.prototype.reduceRight = reduceRightProto;

function reduceRightProto(callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError("You can't reduce an empty array");
  }

  let i = this.length - 1;
  let accumulator;

  if (initialValue !== undefined) {
    accumulator = initialValue;
  } else {
    accumulator = this[i];
    i--;
  }

  for (; i >= 0; i--) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
}


console.log(new MyArray(10, 2, 1).reduceRight((acc, el) => acc - el));
console.log(new MyArray(100, 5, 2).reduceRight((acc, el) => acc / el, 200));
console.log(new MyArray(4, 2, 3).reduceRight((acc, el) => acc - el, 40));