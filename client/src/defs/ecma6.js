var ecma6 = {
  "!name": "ecma6",
  "!define": {
    "Promise.prototype": {
      "catch": {
        "!doc": "The catch() method returns a Promise and deals with rejected cases only. It behaves the same as calling Promise.prototype.then(undefined, onRejected).",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch",
        "!type": "fn(onRejected: fn(reason: ?)) -> !this"
      },
      "then": {
        "!doc": "The then() method returns a Promise. It takes two arguments, both are callback functions for the success and failure cases of the Promise.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then",
        "!type": "fn(onFulfilled: fn(value: ?), onRejected: fn(reason: ?)) -> !custom:Promise_then",
        "!effects": ["call !0 !this.:t"]
      }
    },
    "Promise_reject": {
      "!type": "fn(reason: ?) -> !this",
      "!doc": "The Promise.reject(reason) method returns a Promise object that is rejected with the given reason.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject"
    },
    "iter_prototype": {
      ":Symbol.iterator": "fn() -> !this"
    },
    "iter": {
      "!proto": "iter_prototype",
      "next": {
        "!type": "fn() -> +iter_result[value=!this.:t]",
        "!doc": "Return the next item in the sequence.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators"
      },
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators"
    },
    "iter_result": {
      "done": "bool",
      "value": "?"
    },
    "generator_prototype": {
      "!proto": "iter_prototype",
      "next": "fn(value?: ?) -> iter_result",
      "return": "fn(value?: ?) -> iter_result",
      "throw": "fn(exception: +Error)"
    },
    "Proxy_handler": {
      "!doc": "The proxy's handler object is a placeholder object which contains traps for proxies.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler",
      "getPrototypeOf": "fn(target: ?)",
      "setPrototypeOf": "fn(target: ?, prototype: ?)",
      "isExtensible": "fn(target: ?)",
      "preventExtensions": "fn(target: ?)",
      "getOwnPropertyDescriptor": "fn(target: ?, property: string)",
      "defineProperty": "fn(target: ?, property: string, descriptor: ?)",
      "has": "fn(target: ?, property: string)",
      "get": "fn(target: ?, property: string)",
      "set": "fn(target: ?, property: string, value: ?)",
      "deleteProperty": "fn(target: ?, property: string)",
      "enumerate": "fn(target: ?)",
      "ownKeys": "fn(target: ?)",
      "apply": "fn(target: ?, self: ?, arguments: [?])",
      "construct": "fn(target: ?, arguments: [?])"
    },
    "Proxy_revocable": {
      "proxy": "+Proxy",
      "revoke": "fn()"
    },
    "TypedArray": {
      "!type": "fn(size: number)",
      "!doc": "A TypedArray object describes an array-like view of an underlying binary data buffer. There is no global property named TypedArray, nor is there a directly visible TypedArray constructor.  Instead, there are a number of different global properties, whose values are typed array constructors for specific element types, listed below. On the following pages you will find common properties and methods that can be used with any typed array containing elements of any type.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray",
      "from": {
        "!type": "fn(arrayLike: ?, mapFn?: fn(elt: ?, i: number) -> number, thisArg?: ?) -> +TypedArray",
        "!effects": ["call !1 this=!2 !0.<i> number"],
        "!doc": "Creates a new typed array from an array-like or iterable object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from"
      },
      "of": {
        "!type": "fn(elements: number) -> +TypedArray",
        "!doc": "Creates a new typed array from a variable number of arguments.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of"
      },
      "BYTES_PER_ELEMENT": {
        "!type": "number",
        "!doc": "The TypedArray.BYTES_PER_ELEMENT property represents the size in bytes of each element in an typed array.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT"
      },
      "name": {
        "!type": "string",
        "!doc": "The TypedArray.name property represents a string value of the typed array constructor name.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/name"
      },
      "prototype": {
        "<i>": "number",
        "buffer": {
          "!type": "+ArrayBuffer",
          "!doc": "The buffer accessor property represents the ArrayBuffer referenced by a TypedArray at construction time.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer"
        },
        "byteLength": {
          "!type": "number",
          "!doc": "The byteLength accessor property represents the length (in bytes) of a typed array from the start of its ArrayBuffer.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteLength"
        },
        "byteOffset": {
          "!type": "number",
          "!doc": "The byteOffset accessor property represents the offset (in bytes) of a typed array from the start of its ArrayBuffer.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteOffset"
        },
        "copyWithin": {
          "!type": "fn(target: number, start: number, end?: number) -> ?",
          "!doc": "The copyWithin() method copies the sequence of array elements within the array to the position starting at target. The copy is taken from the index positions of the second and third arguments start and end. The end argument is optional and defaults to the length of the array. This method has the same algorithm as Array.prototype.copyWithin. TypedArray is one of the typed array types here.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/copyWithin"
        },
        "entries": {
          "!type": "fn() -> +iter[:t=number]",
          "!doc": "The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/entries"
        },
        "every": {
          "!type": "fn(callback: fn(element: number, index: number, array: TypedArray) -> bool, thisArg?: ?) -> bool",
          "!effects": ["call !0 this=!1 number number !this"],
          "!doc": "The every() method tests whether all elements in the typed array pass the test implemented by the provided function. This method has the same algorithm as Array.prototype.every(). TypedArray is one of the typed array types here.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/every"
        },
        "fill": {
          "!type": "fn(value: number, start?: number, end?: number)",
          "!doc": "The fill() method fills all the elements of a typed array from a start index to an end index with a static value. This method has the same algorithm as Array.prototype.fill(). TypedArray is one of the typed array types here.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/fill"
        },
        "filter": {
          "!type": "fn(test: fn(element: number, i: number) -> bool, context?: ?) -> !this",
          "!effects": ["call !0 this=!1 number number"],
          "!doc": "Creates a new array with all of the elements of this array for which the provided filtering function returns true. See also Array.prototype.filter().",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/filter"
        },
        "find": {
          "!type": "fn(callback: fn(element: number, index: number, array: +TypedArray) -> bool, thisArg?: ?) -> number",
          "!effects": ["call !0 this=!1 number number !this"],
          "!doc": "The find() method returns a value in the typed array, if an element satisfies the provided testing function. Otherwise undefined is returned. TypedArray is one of the typed array types here.\nSee also the findIndex() method, which returns the index of a found element in the typed array instead of its value.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/find"
        },
        "findIndex": {
          "!type": "fn(callback: fn(element: number, index: number, array: +TypedArray) -> bool, thisArg?: ?) -> number",
          "!effects": ["call !0 this=!1 number number !this"],
          "!doc": "The findIndex() method returns an index in the typed array, if an element in the typed array satisfies the provided testing function. Otherwise -1 is returned.\nSee also the find() method, which returns the value of a found element in the typed array instead of its index.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findIndex"
        },
        "forEach": {
          "!type": "fn(callback: fn(value: number, key: number, array: +TypedArray), thisArg?: ?)",
          "!effects": ["call !0 this=!1 number number !this"],
          "!doc": "Executes a provided function once per array element.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/forEach"
        },
        "indexOf": {
          "!type": "fn(searchElement: number, fromIndex?: number) -> number",
          "!doc": "The indexOf() method returns the first index at which a given element can be found in the typed array, or -1 if it is not present. This method has the same algorithm as Array.prototype.indexOf(). TypedArray is one of the typed array types here.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/indexOf"
        },
        "join": {
          "!type": "fn(separator?: string) -> string",
          "!doc": "The join() method joins all elements of an array into a string. This method has the same algorithm as Array.prototype.join(). TypedArray is one of the typed array types here.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/join"
        },
        "keys": {
          "!type": "fn() -> +iter[:t=number]",
          "!doc": "The keys() method returns a new Array Iterator object that contains the keys for each index in the array.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/keys"
        },
        "lastIndexOf": {
          "!type": "fn(searchElement: number, fromIndex?: number) -> number",
          "!doc": "The lastIndexOf() method returns the last index at which a given element can be found in the typed array, or -1 if it is not present. The typed array is searched backwards, starting at fromIndex. This method has the same algorithm as Array.prototype.lastIndexOf(). TypedArray is one of the typed array types here.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/lastIndexOf"
        },
        "length": {
          "!type": "number",
          "!doc": "Returns the number of elements hold in the typed array. Fixed at construction time and thus read only.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length"
        },
        "map": {
          "!type": "fn(f: fn(element: number, i: number) -> number, context?: ?) -> +TypedArray",
          "!effects": ["call !0 this=!1 number number"],
          "!doc": "Creates a new array with the results of calling a provided function on every element in this array. See also Array.prototype.map().",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map"
        },
        "reduce": {
          "!type": "fn(combine: fn(sum: ?, elt: number, i: number) -> ?, init?: ?) -> !0.!ret",
          "!effects": ["call !0 !1 number number"],
          "!doc": "Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value. See also Array.prototype.reduce().",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduce"
        },
        "reduceRight": {
          "!type": "fn(combine: fn(sum: ?, elt: number, i: number) -> ?, init?: ?) -> !0.!ret",
          "!effects": ["call !0 !1 number number"],
          "!doc": "Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value. See also Array.prototype.reduceRight().",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduceRight"
        },
        "reverse": {
          "!type": "fn()",
          "!doc": "The reverse() method reverses a typed array in place. The first typed array element becomes the last and the last becomes the first. This method has the same algorithm as Array.prototype.reverse(). TypedArray is one of the typed array types here.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reverse"
        },
        "set": {
          "!type": "fn(array: [number], offset?: number)",
          "!doc": "The set() method stores multiple values in the typed array, reading input values from a specified array.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set"
        },
        "slice": {
          "!type": "fn(from: number, to?: number) -> +TypedArray",
          "!doc": "Extracts a section of an array and returns a new array. See also Array.prototype.slice().",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice"
        },
        "some": {
          "!type": "fn(test: fn(elt: number, i: number) -> bool, context?: ?) -> bool",
          "!effects": ["call !0 this=!1 number number"],
          "!doc": "The some() method tests whether some element in the typed array passes the test implemented by the provided function. This method has the same algorithm as Array.prototype.some(). TypedArray is one of the typed array types here.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/some"
        },
        "sort": {
          "!type": "fn(compare?: fn(a: number, b: number) -> number)",
          "!effects": ["call !0 number number"],
          "!doc": "Sorts the elements of an array in place and returns the array. See also Array.prototype.sort().",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort"
        },
        "subarray": {
          "!type": "fn(begin?: number, end?: number) -> +TypedArray",
          "!doc": "The subarray() method returns a new TypedArray on the same ArrayBuffer store and with the same element types as for this TypedArray object. The begin offset is inclusive and the end offset is exclusive. TypedArray is one of the typed array types.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray"
        },
        "values": {
          "!type": "fn() -> +iter[:t=number]",
          "!doc": "The values() method returns a new Array Iterator object that contains the values for each index in the array.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/values"
        },
        ":Symbol.iterator": {
          "!type": "fn() -> +iter[:t=number]",
          "!doc": "Returns a new Array Iterator object that contains the values for each index in the array.",
          "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/@@iterator"
        }
      }
    }
  },
  "Array": {
    "from": {
      "!type": "fn(arrayLike: ?, mapFn?: fn(elt: ?, i: number) -> ?, thisArg?: ?) -> [!0.<i>]",
      "!effects": [
        "call !1 this=!2 !0.<i> number"
      ],
      "!doc": "The Array.from() method creates a new Array instance from an array-like or iterable object.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from"
    },
    "of": {
      "!type": "fn(elementN: ?) -> [!0]",
      "!doc": "The Array.of() method creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of"
    },
    "prototype": {
      "copyWithin": {
        "!type": "fn(target: number, start: number, end?: number) -> !this",
        "!doc": "The copyWithin() method copies the sequence of array elements within the array to the position starting at target. The copy is taken from the index positions of the second and third arguments start and end.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin"
      },
      "entries": {
        "!type": "fn() -> +iter[:t=[number, !this.<i>]]",
        "!doc": "The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries"
      },
      "fill": {
        "!type": "fn(value: ?, start?: number, end?: number) -> !this",
        "!doc": "The fill() method fills all the elements of an array from a start index to an end index with a static value.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill"
      },
      "find": {
        "!type": "fn(callback: fn(element: ?, index: number, array: [?]) -> bool, thisArg?: ?) -> !this.<i>",
        "!effects": ["call !0 this=!2 !this.<i> number"],
        "!doc": "The find() method returns a value in the array, if an element in the array satisfies the provided testing function. Otherwise undefined is returned.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find"
      },
      "findIndex": {
        "!type": "fn(callback: fn(element: ?, index: number, array: [?]), thisArg?: ?) -> number",
        "!effects": ["call !0 this=!2 !this.<i> number"],
        "!doc": "The findIndex() method returns an index in the array, if an element in the array satisfies the provided testing function. Otherwise -1 is returned.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex"
      },
      "keys": {
        "!type": "fn() -> +iter[:t=number]",
        "!doc": "The keys() method returns a new Array Iterator that contains the keys for each index in the array.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys"
      },
      "values": {
        "!type": "fn() -> +iter[:t=!this.<i>]",
        "!doc": "The values() method returns a new Array Iterator object that contains the values for each index in the array.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values"
      },
      ":Symbol.iterator": {
        "!type": "fn() -> +iter[:t=!this.<i>]",
        "!doc": "Returns a new Array Iterator object that contains the values for each index in the array.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator"
      }
    }
  },
  "ArrayBuffer": {
    "!type": "fn(length: number)",
    "!doc": "The ArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer.",
    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer",
    "isView": {
      "!type": "fn(arg: +ArrayBuffer) -> bool",
      "!doc": "The ArrayBuffer.isView() method returns true if arg is one of the ArrayBuffer views, such as typed array objects or a DataView; false otherwise.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView"
    },
    "prototype": {
      "byteLength": {
        "!type": "number",
        "!doc": "The byteLength accessor property represents the length of an ArrayBuffer in bytes.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/byteLength"
      },
      "slice": {
        "!type": "fn(begin: number, end?: number) -> +ArrayBuffer",
        "!doc": "The slice() method returns a new ArrayBuffer whose contents are a copy of this ArrayBuffer's bytes from begin, inclusive, up to end, exclusive.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/slice"
      }
    }
  },
  "DataView": {
    "!type": "fn(buffer: +ArrayBuffer, byteOffset?: number, byteLength?: number)",
    "!doc": "The DataView view provides a low-level interface for reading data from and writing it to an ArrayBuffer.",
    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView",
    "prototype": {
      "buffer": {
        "!type": "+ArrayBuffer",
        "!doc": "The buffer accessor property represents the ArrayBuffer referenced by the DataView at construction time.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/buffer"
      },
      "byteLength": {
        "!type": "number",
        "!doc": "The byteLength accessor property represents the length (in bytes) of this view from the start of its ArrayBuffer.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/byteLength"
      },
      "byteOffset": {
        "!type": "number",
        "!doc": "The byteOffset accessor property represents the offset (in bytes) of this view from the start of its ArrayBuffer.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/byteOffset"
      },
      "getFloat32": {
        "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
        "!doc": "The getFloat32() method gets a signed 32-bit integer (float) at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat32"
      },
      "getFloat64": {
        "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
        "!doc": "The getFloat64() method gets a signed 64-bit float (double) at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat64"
      },
      "getInt16": {
        "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
        "!doc": "The getInt16() method gets a signed 16-bit integer (short) at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt16"
      },
      "getInt32": {
        "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
        "!doc": "The getInt32() method gets a signed 32-bit integer (long) at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt32"
      },
      "getInt8": {
        "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
        "!doc": "The getInt8() method gets a signed 8-bit integer (byte) at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt8"
      },
      "getUint16": {
        "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
        "!doc": "The getUint16() method gets an unsigned 16-bit integer (unsigned short) at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint16"
      },
      "getUint32": {
        "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
        "!doc": "The getUint32() method gets an unsigned 32-bit integer (unsigned long) at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint32"
      },
      "getUint8": {
        "!type": "fn(byteOffset: number) -> number",
        "!doc": "The getUint8() method gets an unsigned 8-bit integer (unsigned byte) at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint8"
      },
      "setFloat32": {
        "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
        "!doc": "The setFloat32() method stores a signed 32-bit integer (float) value at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat32"
      },
      "setFloat64": {
        "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
        "!doc": "The setFloat64() method stores a signed 64-bit integer (double) value at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat64"
      },
      "setInt16": {
        "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
        "!doc": "The setInt16() method stores a signed 16-bit integer (short) value at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt16"
      },
      "setInt32": {
        "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
        "!doc": "The setInt32() method stores a signed 32-bit integer (long) value at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt32"
      },
      "setInt8": {
        "!type": "fn(byteOffset: number, value: number)",
        "!doc": "The setInt8() method stores a signed 8-bit integer (byte) value at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt8"
      },
      "setUint16": {
        "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
        "!doc": "The setUint16() method stores an unsigned 16-bit integer (unsigned short) value at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint16"
      },
      "setUint32": {
        "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
        "!doc": "The setUint32() method stores an unsigned 32-bit integer (unsigned long) value at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint32"
      },
      "setUint8": {
        "!type": "fn(byteOffset: number, value: number)",
        "!doc": "The setUint8() method stores an unsigned 8-bit integer (byte) value at the specified byte offset from the start of the DataView.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint8"
      }
    }
  },
  "Date": {
    "prototype": {
      "toJSON": {
        "!type": "fn() -> string",
        "!doc": "Returns a string (using toISOString()) representing the Date object's value.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON"
      }
    }
  },
  "Float32Array": "TypedArray",
  "Float64Array": "TypedArray",
  "Int16Array": "TypedArray",
  "Int32Array": "TypedArray",
  "Int8Array": "TypedArray",
  "Map": {
    "!type": "fn(iterable?: [?])",
    "!doc": "The Map object is a simple key/value map. Any value (both objects and primitive values) may be used as either a key or a value.",
    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
    "prototype": {
      "clear": {
        "!type": "fn()",
        "!doc": "The clear() method removes all elements from a Map object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear"
      },
      "delete": {
        "!type": "fn(key: ?)",
        "!doc": "The delete() method removes the specified element from a Map object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete"
      },
      "entries": {
        "!type": "fn() -> +iter[:t=[!this.:key, !this.:value]]",
        "!doc": "The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries"
      },
      "forEach": {
        "!type": "fn(callback: fn(value: ?, key: ?, map: +Map), thisArg?: ?)",
        "!effects": ["call !0 this=!1 !this.:value !this.:key !this"],
        "!doc": "The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach"
      },
      "get": {
        "!type": "fn(key: ?) -> !this.:value",
        "!doc": "The get() method returns a specified element from a Map object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get"
      },
      "has": {
        "!type": "fn(key: ?) -> bool",
        "!doc": "The has() method returns a boolean indicating whether an element with the specified key exists or not.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has"
      },
      "keys": {
        "!type": "fn() -> +iter[:t=!this.:key]",
        "!doc": "The keys() method returns a new Iterator object that contains the keys for each element in the Map object in insertion order.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys"
      },
      "set": {
        "!type": "fn(key: ?, value: ?) -> !this",
        "!effects": ["propagate !0 !this.:key", "propagate !1 !this.:value"],
        "!doc": "The set() method adds a new element with a specified key and value to a Map object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set"
      },
      "size": {
        "!type": "number",
        "!doc": "The size accessor property returns the number of elements in a Map object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size"
      },
      "values": {
        "!type": "fn() -> +iter[:t=!this.:value]",
        "!doc": "The values() method returns a new Iterator object that contains the values for each element in the Map object in insertion order.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values"
      },
      ":Symbol.iterator": {
        "!type": "fn() -> +iter[:t=[!this.:key, !this.:value]]",
        "!doc": "Returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator"
      }
    }
  },
  "Math": {
    "acosh": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.acosh() function returns the hyperbolic arc-cosine of a number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh"
    },
    "asinh": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.asinh() function returns the hyperbolic arcsine of a number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh"
    },
    "atanh": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.atanh() function returns the hyperbolic arctangent of a number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh"
    },
    "cbrt": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.cbrt() function returns the cube root of a number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt"
    },
    "clz32": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.clz32() function returns the number of leading zero bits in the 32-bit binary representation of a number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32"
    },
    "cosh": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.cosh() function returns the hyperbolic cosine of a number, that can be expressed using the constant e:",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh"
    },
    "expm1": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.expm1() function returns ex - 1, where x is the argument, and e the base of the natural logarithms.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1"
    },
    "fround": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.fround() function returns the nearest single precision float representation of a number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround"
    },
    "hypot": {
      "!type": "fn(value: number) -> number",
      "!doc": "The Math.hypot() function returns the square root of the sum of squares of its arguments.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot"
    },
    "imul": {
      "!type": "fn(a: number, b: number) -> number",
      "!doc": "The Math.imul() function returns the result of the C-like 32-bit multiplication of the two parameters.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul"
    },
    "log10": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.log10() function returns the base 10 logarithm of a number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10"
    },
    "log1p": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.log1p() function returns the natural logarithm (base e) of 1 + a number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log1p"
    },
    "log2": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.log2() function returns the base 2 logarithm of a number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log2"
    },
    "sign": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.sign() function returns the sign of a number, indicating whether the number is positive, negative or zero.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign"
    },
    "sinh": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.sinh() function returns the hyperbolic sine of a number, that can be expressed using the constant e:",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh"
    },
    "tanh": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.tanh() function returns the hyperbolic tangent of a number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh"
    },
    "trunc": {
      "!type": "fn(x: number) -> number",
      "!doc": "The Math.trunc() function returns the integral part of a number by removing any fractional digits. It does not round any numbers. The function can be expressed with the floor() and ceil() function:",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc"
    }
  },
  "Number": {
    "EPSILON": {
      "!type": "number",
      "!doc": "The Number.EPSILON property represents the difference between one and the smallest value greater than one that can be represented as a Number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON"
    },
    "MAX_SAFE_INTEGER": {
      "!type": "number",
      "!doc": "The Number.MAX_SAFE_INTEGER constant represents the maximum safe integer in JavaScript (253 - 1).",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER"
    },
    "MIN_SAFE_INTEGER": {
      "!type": "number",
      "!doc": "The Number.MIN_SAFE_INTEGER constant represents the minimum safe integer in JavaScript (-(253 - 1)).",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER"
    },
    "isFinite": {
      "!type": "fn(testValue: ?) -> bool",
      "!doc": "The Number.isFinite() method determines whether the passed value is finite.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite"
    },
    "isInteger": {
      "!type": "fn(testValue: ?) -> bool",
      "!doc": "The Number.isInteger() method determines whether the passed value is an integer.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger"
    },
    "isNaN": {
      "!type": "fn(testValue: ?) -> bool",
      "!doc": "The Number.isNaN() method determines whether the passed value is NaN. More robust version of the original global isNaN().",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN"
    },
    "isSafeInteger": {
      "!type": "fn(testValue: ?) -> bool",
      "!doc": "The Number.isSafeInteger() method determines whether the provided value is a number that is a safe integer. A safe integer is an integer that",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger"
    },
    "parseFloat": {
      "!type": "fn(string: string) -> number",
      "!doc": "The Number.parseFloat() method parses a string argument and returns a floating point number.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat"
    },
    "parseInt": {
      "!type": "fn(string: string, radix?: number) -> number",
      "!doc": "The Number.parseInt() method parses a string argument and returns an integer of the specified radix or base.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt"
    }
  },
  "Object": {
    "assign": {
      "!type": "fn(target: ?, source: ?, source?: ?) -> !0",
      "!effects": ["copy !1 !0"],
      "!doc": "The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign"
    },
    "getOwnPropertySymbols": {
      "!type": "fn(obj: ?) -> !custom:getOwnPropertySymbols",
      "!doc": "The Object.getOwnPropertySymbols() method returns an array of all symbol properties found directly upon a given object.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols"
    },
    "is": {
      "!type": "fn(value1: ?, value2: ?) -> bool",
      "!doc": "The Object.is() method determines whether two values are the same value.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is"
    },
    "setPrototypeOf": {
      "!type": "fn(obj: ?, prototype: ?)",
      "!doc": "The Object.setPrototype() method sets the prototype (i.e., the internal [[Prototype]] property) of a specified object to another object or null.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf"
    }
  },
  "Promise": {
    "!type": "fn(executor: fn(resolve: fn(value: ?), reject: fn(reason: ?))) -> !custom:Promise_ctor",
    "!doc": "The Promise object is used for deferred and asynchronous computations. A Promise is in one of the three states:",
    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    "all": {
      "!type": "fn(iterable: [+Promise]) -> +Promise[:t=[!0.<i>.:t]]",
      "!doc": "The Promise.all(iterable) method returns a promise that resolves when all of the promises in the iterable argument have resolved.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all"
    },
    "race": {
      "!type": "fn(iterable: [+Promise]) -> !0.<i>",
      "!doc": "The Promise.race(iterable) method returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race"
    },
    "reject": "Promise_reject",
    "resolve": {
      "!type": "fn(value: ?) -> +Promise[:t=!0]",
      "!doc": "The Promise.resolve(value) method returns a Promise object that is resolved with the given value. If the value is a thenable (i.e. has a then method), the returned promise will 'follow' that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve"
    },
    "prototype": "Promise.prototype"
  },
  "Proxy": {
    "!type": "fn(target: ?, handler: Proxy_handler)",
    "!doc": "The Proxy object is used to define the custom behavior in JavaScript fundamental operation (e.g. property lookup, assignment, enumeration, function invocation, etc).",
    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy",
    "revocable": {
      "!type": "fn(target: ?, handler: Proxy_handler) -> Proxy_revocable",
      "!doc": "The Proxy.revocable() method is used to create a revocable Proxy object.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable"
    }
  },
  "Reflect": {
    "!doc": "Reflect is a built-in object that provides methods for interceptable JavaScript operations.",
    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect",
    "apply": {
      "!type": "fn(target: fn(), thisArg?: ?, argumentList?: [?]) -> !0.!ret",
      "!doc": "Calls a target function with arguments as specified.",
      "!url":  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply"
    },
    "construct": {
      "!type": "fn(target: fn(), argumentList?: [?]) -> ?",
      "!doc": "Acts like the new operator as a function. It is equivalent to calling new target(...args).",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct"
    },
    "defineProperty": {
      "!type": "fn(target: ?, property: string, attributes: ?) -> bool",
      "!doc": "The static Reflect.defineProperty() method is like Object.defineProperty() but returns a Boolean.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty"
    },
    "deleteProperty": {
      "!type": "fn(target: ?, property: string) -> bool",
      "!doc": "Works like the delete operator as a function.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty"
    },
    "enumerate": {
      "!type": "fn(target: ?) -> +iter[:t=string]",
      "!doc": "Returns an iterator with the enumerable own and inherited properties of the target object.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/enumerate"
    },
    "get": {
      "!type": "fn(target: ?, property: string) -> ?",
      "!doc": "Gets a property from an object.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get"
    },
    "getOwnPropertyDescriptor": {
      "!type": "fn(target: ?, property: string) -> ?",
      "!doc": "Returns a property descriptor of the given property if it exists on the object, undefined otherwise.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor"
    },
    "getPrototypeOf": {
      "!type": "fn(target: ?) -> ?",
      "!doc": "Returns the prototype of the specified object.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf"
    },
    "has": {
      "!type": "fn(target: ?, property: string) -> bool",
      "!doc": "The static Reflect.has() method works like the in operator as a function.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has"
    },
    "isExtensible": {
      "!type": "fn(target: ?) -> bool",
      "!doc": "Determines if an object is extensible (whether it can have new properties added to it).",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible"
    },
    "ownKeys": {
      "!type": "fn(target: ?) -> [string]",
      "!doc": "Returns an array of the target object's own property keys.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys"
    },
    "preventExtensions": {
      "!type": "fn(target: ?) -> bool",
      "!doc": "Prevents new properties from ever being added to an object.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions"
    },
    "set": {
      "!type": "fn(target: ?, property: string, value: ?) -> bool",
      "!doc": "Set a property on an object.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set"
    },
    "setPrototypeOf": {
      "!type": "fn(target: ?, prototype: ?) -> bool",
      "!doc": "Sets the prototype of a specified object to another object or to null.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf"
    }
  },
  "RegExp": {
    "prototype": {
      "flags": {
        "!type": "string",
        "!doc": "The flags property returns a string consisting of the flags of the current regular expression object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags"
      },
      "sticky": {
        "!type": "bool",
        "!doc": "The sticky property reflects whether or not the search is sticky (searches in strings only from the index indicated by the lastIndex property of this regular expression). sticky is a read-only property of an individual regular expression object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky"
      },
      "unicode": {
        "!type": "bool",
        "!doc": "The 'u' flag enables various Unicode-related features.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode"
      }
    }
  },
  "Set": {
    "!type": "fn(iterable?: [?])",
    "!doc": "The Set object lets you store unique values of any type, whether primitive values or object references.",
    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
    "prototype": {
      "add": {
        "!type": "fn(value: ?) -> !this",
        "!effects": ["propagate !0 !this.:t"],
        "!doc": "The add() method appends a new element with a specified value to the end of a Set object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add"
      },
      "clear": {
        "!type": "fn()",
        "!doc": "The clear() method removes all elements from a Set object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear"
      },
      "delete": {
        "!type": "fn(value: ?) -> bool",
        "!doc": "The delete() method removes the specified element from a Set object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete"
      },
      "entries": {
        "!type": "fn() -> +iter[:t=[!this.:t]]",
        "!doc": "The entries() method returns a new Iterator object that contains an array of [value, value] for each element in the Set object, in insertion order. For Set objects there is no key like in Map objects. However, to keep the API similar to the Map object, each entry has the same value for its key and value here, so that an array [value, value] is returned.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries"
      },
      "forEach": {
        "!type": "fn(callback: fn(value: ?, value2: ?, set: +Set), thisArg?: ?)",
        "!effects": ["call !0 this=!1 !this.:t number !this"],
        "!doc": "The forEach() method executes a provided function once per each value in the Set object, in insertion order.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach"
      },
      "has": {
        "!type": "fn(value: ?) -> bool",
        "!doc": "The has() method returns a boolean indicating whether an element with the specified value exists in a Set object or not.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has"
      },
      "keys": {
        "!type": "fn() -> +iter[:t=!this.:t]",
        "!doc": "The values() method returns a new Iterator object that contains the values for each element in the Set object in insertion order.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys"
      },
      "size": {
        "!type": "number",
        "!doc": "The size accessor property returns the number of elements in a Set object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size"
      },
      "values": {
        "!type": "fn() -> +iter[:t=!this.:t]",
        "!doc": "The values() method returns a new Iterator object that contains the values for each element in the Set object in insertion order.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values"
      },
      ":Symbol.iterator": {
        "!type": "fn() -> +iter[:t=!this.:t]",
        "!doc": "Returns a new Iterator object that contains the values for each element in the Set object in insertion order.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator"
      }
    }
  },
  "String": {
    "fromCodePoint": {
      "!type": "fn(point: number, point?: number) -> string",
      "!doc": "The static String.fromCodePoint() method returns a string created by using the specified sequence of code points.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint"
    },
    "raw": {
      "!type": "fn(template: [string], substitutions: ?, templateString: ?) -> string",
      "!doc": "The static String.raw() method is a tag function of template strings, used to get the raw string form of template strings.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw"
    },
    "prototype": {
      "codePointAt": {
        "!type": "fn(pos: number) -> number",
        "!doc": "The codePointAt() method returns a non-negative integer that is the UTF-16 encoded code point value.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt"
      },
      "endsWith": {
        "!type": "fn(searchString: string, position?: number) -> bool",
        "!doc": "The endsWith() method determines whether a string ends with the characters of another string, returning true or false as appropriate.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith"
      },
      "includes": {
        "!type": "fn(searchString: string, position?: number) -> bool",
        "!doc": "The includes() method determines whether one string may be found within another string, returning true or false as appropriate.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains"
      },
      "normalize": {
        "!type": "fn(form: string) -> string",
        "!doc": "The normalize() method returns the Unicode Normalization Form of a given string (if the value isn't a string, it will be converted to one first).",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize"
      },
      "repeat": {
        "!type": "fn(count: number) -> string",
        "!doc": "The repeat() method constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat"
      },
      "startsWith": {
        "!type": "fn(searchString: string, position?: number) -> bool",
        "!doc": "The startsWith() method determines whether a string begins with the characters of another string, returning true or false as appropriate.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith"
      },
      ":Symbol.iterator": {
        "!type": "fn() -> +iter[:t=string]",
        "!doc": "Returns a new Iterator object that iterates over the code points of a String value, returning each code point as a String value.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator"
      }
    }
  },
  "Symbol": {
    "!type": "fn(description?: string) -> !custom:getSymbol",
    "!doc": "A symbol is a unique and immutable data type and may be used as an identifier for object properties. The symbol object is an implicit object wrapper for the symbol primitive data type.",
    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
    "for": {
      "!type": "fn(key: string) -> !custom:getSymbol",
      "!doc": "The Symbol.for(key) method searches for existing symbols in a runtime-wide symbol registry with the given key and returns it if found. Otherwise a new symbol gets created in the global symbol registry with this key.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for"
    },
    "keyFor": {
      "!type": "fn(sym: +Symbol) -> string",
      "!doc": "The Symbol.keyFor(sym) method retrieves a shared symbol key from the global symbol registry for the given symbol.",
      "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor"
    },
    "hasInstance": ":Symbol.hasInstance",
    "isConcatSpreadable": ":Symbol.isConcatSpreadable",
    "iterator": ":Symbol.iterator",
    "keyFor": ":Symbol.keyFor",
    "match": ":Symbol.match",
    "replace": ":Symbol.replace",
    "search": ":Symbol.search",
    "species": ":Symbol.species",
    "split": ":Symbol.split",
    "toStringTag": ":Symbol.toStringTag",
    "unscopables": ":Symbol.unscopables",
    "prototype": {
      "!stdProto": "Symbol"
    }
  },
  "Uint16Array": "TypedArray",
  "Uint32Array": "TypedArray",
  "Uint8Array": "TypedArray",
  "Uint8ClampedArray": "TypedArray",
  "WeakMap": {
    "!type": "fn(iterable?: [?])",
    "!doc": "The WeakMap object is a collection of key/value pairs in which the keys are objects and the values can be arbitrary values.",
    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
    "prototype": {
      "delete": {
        "!type": "fn(key: ?) -> bool",
        "!doc": "The delete() method removes the specified element from a WeakMap object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete"
      },
      "get": {
        "!type": "fn(key: ?) -> !this.:value",
        "!doc": "The get() method returns a specified element from a WeakMap object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get"
      },
      "has": {
        "!type": "fn(key: ?) -> bool",
        "!doc": "The has() method returns a boolean indicating whether an element with the specified key exists in the WeakMap object or not.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has"
      },
      "set": {
        "!type": "fn(key: ?, value: ?)",
        "!effects": ["propagate !0 !this.:key", "propagate !1 !this.:value"],
        "!doc": "The set() method adds a new element with a specified key and value to a WeakMap object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set"
      }
    }
  },
  "WeakSet": {
    "!type": "fn(iterable?: [?])",
    "!doc": "The WeakSet object lets you store weakly held objects in a collection.",
    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet",
    "prototype": {
      "add": {
        "!type": "fn(value: ?)",
        "!doc": "The add() method appends a new object to the end of a WeakSet object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/add"
      },
      "delete": {
        "!type": "fn(value: ?) -> bool",
        "!doc": "The delete() method removes the specified element from a WeakSet object.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/delete"
      },
      "has": {
        "!type": "fn(value: ?) -> bool",
        "!doc": "The has() method returns a boolean indicating whether an object exists in a WeakSet or not.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/has"
      }
    }
  }
}