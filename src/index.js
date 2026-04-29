"use strict";
function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) {
    this[i] = args[i];
    this.length++;
  }
}

MyArray.prototype = new MyArrayProto();

function MyArrayProto() {
  this.reduceRightProto = function (callback, initialValue) {
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
  };

  this.forEachProto = function (callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError(`${callback} is not a function`);
    }

    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };

  this.pushProto = function (...args) {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length++;
    }
    return this.length;
  };

  this.concatProto = function (...args) {
    const result = new MyArray();

    for (let i = 0; i < this.length; i++) {
      result.pushProto(this[i]);
    }

    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        result.pushProto(...args[i]);
      } else if (args[i] instanceof MyArray) {
        for (let j = 0; j < args[i].length; j++) {
          result.pushProto(args[i][j]);
        }
      } else {
        result.pushProto(args[i]);
      }
    }

    return result;
  };
  ////////////////////flat////////////////////////
  this.flatProto = function (depth = 1) {
    const result = new MyArray();

    const flatten = (arr, currentDepth) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof MyArray && currentDepth < depth) {
          flatten(arr[i], currentDepth + 1);
        } else if (Array.isArray(arr[i])) {
          continue;
        } else {
          result.pushProto(arr[i]);
        }
      }
    };
    flatten(this, 0);
    return result;
  };
}

const myArray = new MyArray(
  [],
  1,
  2,
  3,
  new MyArray(4, 5, new MyArray(6, 7)),
  [8, 9],
  new MyArray(10, 11),
);

const res1 = myArray.flatProto(1);
console.log(res1);

const res2 = myArray.flatProto(2);
console.log(res2);
