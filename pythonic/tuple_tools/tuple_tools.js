"use strict";
function implementsInterfaceTupleSupportedArray(argument) {
    return argument._INTERFACE__DISCRIMINANT_ === "_INTERFACE__TUPLE_SUPPORTED_ARRAY_";
}
/**
 * Chinese Comments
 *
 * 两个Tuple进行比较的时候，除了实现TupleSupportedArray的类对象元素，其他元素只
 * 会进行浅层比较。对于实现了TupleSupportedArray的类对象元素，如果它们进行深层
 * 比较后相同的话，则说明两个TupleSupportedArray类对象元素相同。如果所有元素相
 * 等，则两个Tuple相等。
 *
 * 支持提供稀疏数组作为参数来创建Tuple。数组中为Empty Item的地方，在Tuple中也为
 * Empty Item。
 *
 * 提供数组类型参数进行Tuple构建的时候，构造函数只会将数字索引的值拷贝到新建的
 * Tuple对象中。
 */
class Tuple {
    constructor(...args) {
        this._INTERFACE__DISCRIMINANT_ = "_INTERFACE__TUPLE_SUPPORTED_ARRAY_";
        let array = [];
        if (args.length === 1) {
            let arg = args[0];
            if (arg instanceof Array
                || implementsInterfaceTupleSupportedArray(arg)) {
                let lengthString = "0";
                for (let key of Object.keys(arg).sort()) {
                    if (/^[1-9]\d*$/.test(key) === true) {
                        array[key] = arg[key];
                        lengthString = key;
                    }
                }
                this.length = parseInt(lengthString) + 1;
            }
            else {
                array = args;
                this.length = 1;
            }
        }
        else {
            array = args;
            this.length = args.length;
        }
        Object.assign(this, array);
    }
    find(predicate, thisArg) {
        return this.toArray().find(predicate, thisArg);
    }
    findIndex(predicate, thisArg) {
        return this.toArray().findIndex(predicate, thisArg);
    }
    [Symbol.iterator]() {
        return this.toArray()[Symbol.iterator]();
    }
    entries() {
        return this.toArray().entries();
    }
    keys() {
        return this.toArray().keys();
    }
    values() {
        return this.toArray().values();
    }
    includes(searchElement, fromIndex) {
        if (implementsInterfaceTupleSupportedArray(searchElement)) {
            let index = fromIndex >= 0 ? Math.floor(fromIndex) : 0;
            for (; index < this.length; index++) {
                if (index in this) {
                    let elemt = this[index];
                    if (implementsInterfaceTupleSupportedArray(elemt) && elemt.equals(searchElement)) {
                        return true;
                    }
                }
            }
            return false;
        }
        return this.toArray().includes(searchElement, fromIndex);
    }
    toString() {
        return `(${this.join()})`;
    }
    toLocaleString() {
        let string = "(";
        let isFirstLoop = true;
        for (let index = 0; index < this.length; index++) {
            if (isFirstLoop) {
                isFirstLoop = false;
            }
            else {
                string += ",";
            }
            if (index in this) {
                let elemt = this[index];
                if (elemt === null || elemt === undefined) {
                    string += elemt;
                }
                else if (typeof elemt === "function") {
                    string += `Function(${elemt.name})`;
                }
                else if (typeof elemt === "object") {
                    if (implementsInterfaceTupleSupportedArray(elemt)) {
                        string += elemt.toLocaleString();
                    }
                    else {
                        string += `Class(${elemt.constructor.name})`;
                    }
                }
                else {
                    string += elemt.toLocaleString();
                }
            }
        }
        return string + ")";
    }
    concat(...items) {
        return this.toArray().concat(...items);
    }
    join(separator = ",") {
        let string = "";
        let isFirstLoop = true;
        for (let index = 0; index < this.length; index++) {
            if (isFirstLoop) {
                isFirstLoop = false;
            }
            else {
                string += separator;
            }
            if (index in this) {
                let elemt = this[index];
                if (typeof elemt === "function") {
                    string += `Function(${elemt.name})`;
                }
                else if (typeof elemt === "object") {
                    if (elemt === null || implementsInterfaceTupleSupportedArray(elemt)) {
                        string += elemt;
                    }
                    else {
                        string += `Class(${elemt.constructor.name})`;
                    }
                }
                else if (typeof elemt === "symbol") {
                    string += elemt.toString();
                }
                else {
                    string += elemt;
                }
            }
        }
        return string;
    }
    slice(start, end) {
        return this.toArray().slice(start, end);
    }
    indexOf(searchElement, fromIndex) {
        if (implementsInterfaceTupleSupportedArray(searchElement)) {
            let index = fromIndex >= 0 ? Math.floor(fromIndex) : 0;
            for (; index < this.length; index++) {
                if (index in this) {
                    let elemt = this[index];
                    if (implementsInterfaceTupleSupportedArray(elemt) && elemt.equals(searchElement)) {
                        return index;
                    }
                }
            }
            return -1;
        }
        return this.toArray().indexOf(searchElement, fromIndex);
    }
    lastIndexOf(searchElement, fromIndex) {
        if (searchElement instanceof Tuple) {
            let index = fromIndex >= 0 ? Math.floor(fromIndex) : this.length - 1;
            for (; index >= 0; index--) {
                if (index in this) {
                    let elemt = this[index];
                    if (implementsInterfaceTupleSupportedArray(elemt) && elemt.equals(searchElement)) {
                        return index;
                    }
                }
            }
            return -1;
        }
        return this.toArray().lastIndexOf(searchElement, fromIndex);
    }
    every(callbackfn, thisArg) {
        return this.toArray().every(callbackfn, thisArg);
    }
    some(callbackfn, thisArg) {
        return this.toArray().some(callbackfn, thisArg);
    }
    forEach(callbackfn, thisArg) {
        this.toArray().forEach(callbackfn, thisArg);
    }
    map(callbackfn, thisArg) {
        return this.toArray().map(callbackfn, thisArg);
    }
    filter(callbackfn, thisArg) {
        return this.toArray().filter(callbackfn, thisArg);
    }
    reduce(callbackfn, initialValue) {
        return this.toArray().reduce(callbackfn, initialValue);
    }
    reduceRight(callbackfn, initialValue) {
        return this.toArray().reduceRight(callbackfn, initialValue);
    }
    flatMap(callback, thisArg) {
        return this.toArray().flatMap(callback, thisArg);
    }
    flat(depth) {
        return this.toArray().flat(depth);
    }
    equals(elementForComparison) {
        if (elementForComparison instanceof Tuple && this.length === elementForComparison.length) {
            for (let index = 0; index < this.length; index++) {
                if (index in this && index in elementForComparison) {
                    let firstTupleElemt = this[index];
                    let secondTupleElemt = elementForComparison[index];
                    if (firstTupleElemt !== secondTupleElemt
                        && !(firstTupleElemt instanceof Tuple
                            && secondTupleElemt instanceof Tuple
                            && firstTupleElemt.equals(secondTupleElemt))) {
                        return false;
                    }
                }
                else if (!(index in this || index in elementForComparison)) {
                    continue;
                }
                else {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    toArray() {
        let array = [];
        for (let key in this) {
            array[key] = this[key];
        }
        return array;
    }
}
/**
 * Chinese Comments
 *
 * 两个TupleArray进行比较的时候，除了实现TupleSupportedArray的类对象元素，其他元
 * 素只会进行浅层比较。对于实现了TupleSupportedArray的类对象元素，如果它们进行深
 * 层比较后相同的话，则说明两个TupleSupportedArray类对象元素相同。如果所有元素相
 * 等，则两个TupleArray相等。
 *
 * 支持提供稀疏数组作为参数来创建TupleArray。数组中为Empty Item的地方，在TupleArray
 * 中也为Empty Item。
 *
 * 提供数组类型参数进行TupleArray构建的时候，构造函数只会将数字索引的值拷贝到新建
 * 的TupleArray对象中。
 */
class TupleArray {
    constructor(...args) {
        this._INTERFACE__DISCRIMINANT_ = "_INTERFACE__TUPLE_SUPPORTED_ARRAY_";
        let array = [];
        if (args.length === 1) {
            let arg = args[0];
            if (arg instanceof Array
                || implementsInterfaceTupleSupportedArray(arg)) {
                for (let key in arg) {
                    if (/^[1-9]\d*$/.test(key) === true) {
                        array[key] = arg[key];
                    }
                }
            }
            else {
                array = args;
            }
        }
        else {
            array = args;
        }
        Object.assign(this, array);
    }
    get length() {
        let lengthString = "0";
        for (let key of Object.keys(this).sort(function (a, b) {
            if (a < b) {
                return 1;
            }
            else if (a = b) {
                return 0;
            }
            return -1;
        })) {
            if (/^[1-9]\d*$/.test(key) === true) {
                lengthString = key;
                break;
            }
        }
        return parseInt(lengthString) + 1;
    }
    find(predicate, thisArg) {
        return this.toArray().find(predicate, thisArg);
    }
    findIndex(predicate, thisArg) {
        return this.toArray().findIndex(predicate, thisArg);
    }
    fill(value, start, end) {
        return Object.assign(this, this.extractArrayElements().fill(value, start, end));
    }
    copyWithin(target, start, end) {
        return Object.assign(this, this.extractArrayElements().copyWithin(target, start, end));
    }
    [Symbol.iterator]() {
        return this.toArray()[Symbol.iterator]();
    }
    entries() {
        return this.toArray().entries();
    }
    keys() {
        return this.toArray().keys();
    }
    values() {
        return this.toArray().values();
    }
    [Symbol.unscopables]() {
        return this.toArray()[Symbol.unscopables]();
    }
    includes(searchElement, fromIndex) {
        if (implementsInterfaceTupleSupportedArray(searchElement)) {
            let index = fromIndex >= 0 ? Math.floor(fromIndex) : 0;
            let length = this.length;
            for (; index < length; index++) {
                if (index in this) {
                    let elemt = this[index];
                    if (implementsInterfaceTupleSupportedArray(elemt) && elemt.equals(searchElement)) {
                        return true;
                    }
                }
            }
            return false;
        }
        return this.toArray().includes(searchElement, fromIndex);
    }
    toString() {
        return this.join();
    }
    toLocaleString() {
        let string = "";
        let isFirstLoop = true;
        for (let index = 0; index < this.length; index++) {
            if (isFirstLoop) {
                isFirstLoop = false;
            }
            else {
                string += ",";
            }
            if (index in this) {
                let elemt = this[index];
                if (elemt === null || elemt === undefined) {
                    string += elemt;
                }
                else if (typeof elemt === "function") {
                    string += `Function(${elemt.name})`;
                }
                else if (typeof elemt === "object") {
                    if (implementsInterfaceTupleSupportedArray(elemt)) {
                        string += elemt.toLocaleString();
                    }
                    else {
                        string += `Class(${elemt.constructor.name})`;
                    }
                }
                else {
                    string += elemt.toLocaleString();
                }
            }
        }
        return string;
    }
    push(...items) {
        let length = this.length;
        for (let item of items) {
            this[length++] = item;
        }
        return length;
    }
    pop() {
        let length = this.length;
        if (length === 0) {
            return undefined;
        }
        let lastElemt = this[--length];
        delete this[length];
        return lastElemt;
    }
    concat(...items) {
        return this.toArray().concat(...items);
    }
    join(separator = ",") {
        let string = "";
        let isFirstLoop = true;
        for (let index = 0; index < this.length; index++) {
            if (isFirstLoop) {
                isFirstLoop = false;
            }
            else {
                string += separator;
            }
            if (index in this) {
                let elemt = this[index];
                if (typeof elemt === "function") {
                    string += `Function(${elemt.name})`;
                }
                else if (typeof elemt === "object") {
                    if (elemt === null || implementsInterfaceTupleSupportedArray(elemt)) {
                        string += elemt;
                    }
                    else {
                        string += `Class(${elemt.constructor.name})`;
                    }
                }
                else if (typeof elemt === "symbol") {
                    string += elemt.toString();
                }
                else {
                    string += elemt;
                }
            }
        }
        return string;
    }
    reverse() {
        return this.toArray().reverse();
    }
    shift() {
        let length = this.length;
        if (length === 0) {
            return undefined;
        }
        let firstElemt = this[0];
        for (let index = 0; index < length - 1; index++) {
            this[index] = this[index + 1];
        }
        delete this[--length];
        return firstElemt;
    }
    slice(start, end) {
        return this.toArray().slice(start, end);
    }
    sort(compareFn) {
        return Object.assign(this, this.extractArrayElements().sort(compareFn));
    }
    splice(start, deleteCount, ...items) {
        let array = this.extractArrayElements();
        let resultArray = array.splice(start, deleteCount, ...items);
        Object.assign(this, array);
        return resultArray;
    }
    unshift(...items) {
        let array = this.extractArrayElements();
        let newLength = array.unshift(...items);
        Object.assign(this, array);
        return newLength;
    }
    indexOf(searchElement, fromIndex) {
        if (implementsInterfaceTupleSupportedArray(searchElement)) {
            let index = fromIndex >= 0 ? Math.floor(fromIndex) : 0;
            for (; index < this.length; index++) {
                if (index in this) {
                    let elemt = this[index];
                    if (implementsInterfaceTupleSupportedArray(elemt) && elemt.equals(searchElement)) {
                        return index;
                    }
                }
            }
            return -1;
        }
        return this.toArray().indexOf(searchElement, fromIndex);
    }
    lastIndexOf(searchElement, fromIndex) {
        if (searchElement instanceof Tuple) {
            let index = fromIndex >= 0 ? Math.floor(fromIndex) : this.length - 1;
            for (; index >= 0; index--) {
                if (index in this) {
                    let elemt = this[index];
                    if (implementsInterfaceTupleSupportedArray(elemt) && elemt.equals(searchElement)) {
                        return index;
                    }
                }
            }
            return -1;
        }
        return this.toArray().lastIndexOf(searchElement, fromIndex);
    }
    every(callbackfn, thisArg) {
        return this.toArray().every(callbackfn, thisArg);
    }
    some(callbackfn, thisArg) {
        return this.toArray().some(callbackfn, thisArg);
    }
    forEach(callbackfn, thisArg) {
        this.toArray().forEach(callbackfn, thisArg);
    }
    map(callbackfn, thisArg) {
        return this.toArray().map(callbackfn, thisArg);
    }
    filter(callbackfn, thisArg) {
        return this.toArray().filter(callbackfn, thisArg);
    }
    reduce(callbackfn, initialValue) {
        return this.toArray().reduce(callbackfn, initialValue);
    }
    reduceRight(callbackfn, initialValue) {
        return this.toArray().reduceRight(callbackfn, initialValue);
    }
    flatMap(callback, thisArg) {
        return this.toArray().flatMap(callback, thisArg);
    }
    flat(depth) {
        return this.toArray().flat(depth);
    }
    equals(elementForComparison) {
        if (elementForComparison instanceof TupleArray && this.length === elementForComparison.length) {
            for (let index = 0; index < this.length; index++) {
                if (index in this && index in elementForComparison) {
                    let firstTupleArrayElemt = this[index];
                    let secondTupleArrayElemt = elementForComparison[index];
                    if (firstTupleArrayElemt !== secondTupleArrayElemt
                        && !(firstTupleArrayElemt instanceof TupleArray
                            && secondTupleArrayElemt instanceof TupleArray
                            && firstTupleArrayElemt.equals(secondTupleArrayElemt))) {
                        return false;
                    }
                }
                else if (!(index in this || index in elementForComparison)) {
                    continue;
                }
                else {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    toArray() {
        let array = [];
        for (let key in this) {
            if (/^[1-9]\d*$/.test(key) === true) {
                array[key] = this[key];
            }
        }
        return array;
    }
    extractArrayElements() {
        let array = [];
        for (let key in this) {
            if (/^[1-9]\d*$/.test(key) === true) {
                array[key] = this[key];
                delete this[key];
            }
        }
        return array;
    }
}
class TupleMap {
    constructor(keyValuePairList = []) {
        this[Symbol.toStringTag] = "Map";
        this.map = new Map();
        for (let keyValuePair of keyValuePairList) {
            this.set(keyValuePair[0], keyValuePair[1]);
        }
    }
    get size() {
        return this.map.size;
    }
    clear() {
        this.map.clear();
    }
    delete(key) {
        if (implementsInterfaceTupleSupportedArray(key)) {
            for (let existingKey of this.map.keys()) {
                if (existingKey !== key
                    && implementsInterfaceTupleSupportedArray(existingKey)
                    && existingKey.equals(key)
                    || existingKey === key) {
                    return this.map.delete(existingKey);
                }
            }
        }
        return this.map.delete(key);
    }
    forEach(callbackfn, thisArg) {
        this.map.forEach(callbackfn, thisArg);
    }
    get(key) {
        if (implementsInterfaceTupleSupportedArray(key)) {
            for (let existingKey of this.map.keys()) {
                if (existingKey !== key
                    && implementsInterfaceTupleSupportedArray(existingKey)
                    && existingKey.equals(key)
                    || existingKey === key) {
                    return this.map.get(existingKey);
                }
            }
        }
        return this.map.get(key);
    }
    has(key) {
        if (implementsInterfaceTupleSupportedArray(key)) {
            for (let existingKey of this.map.keys()) {
                if (existingKey !== key
                    && implementsInterfaceTupleSupportedArray(existingKey)
                    && existingKey.equals(key)
                    || existingKey === key) {
                    return true;
                }
            }
        }
        return this.map.has(key);
    }
    set(key, value) {
        if (implementsInterfaceTupleSupportedArray(key)) {
            for (let existingKey of this.map.keys()) {
                if (existingKey !== key
                    && implementsInterfaceTupleSupportedArray(existingKey)
                    && existingKey.equals(key)
                    || existingKey === key) {
                    this.map.set(existingKey, value);
                    return this;
                }
            }
        }
        this.map.set(key, value);
        return this;
    }
    [Symbol.iterator]() {
        return this.map[Symbol.iterator]();
    }
    entries() {
        return this.map.entries();
    }
    keys() {
        return this.map.keys();
    }
    values() {
        return this.map.values();
    }
}
class TupleSet {
    constructor(elemtList = []) {
        this[Symbol.toStringTag] = "Set";
        this.set = new Set();
        for (let elemt of elemtList) {
            this.add(elemt);
        }
    }
    get size() {
        return this.set.size;
    }
    add(value) {
        if (implementsInterfaceTupleSupportedArray(value)) {
            for (let existingValue of this.set) {
                if (existingValue !== value
                    && implementsInterfaceTupleSupportedArray(existingValue)
                    && existingValue.equals(value)
                    || existingValue === value) {
                    return this;
                }
            }
        }
        this.set.add(value);
        return this;
    }
    clear() {
        this.set.clear();
    }
    delete(value) {
        if (implementsInterfaceTupleSupportedArray(value)) {
            for (let existingValue of this.set) {
                if (existingValue !== value
                    && implementsInterfaceTupleSupportedArray(existingValue)
                    && existingValue.equals(value)
                    || existingValue === value) {
                    return this.set.delete(existingValue);
                }
            }
        }
        this.set.delete(value);
    }
    forEach(callbackfn, thisArg) {
        this.set.forEach(callbackfn, thisArg);
    }
    has(value) {
        if (implementsInterfaceTupleSupportedArray(value)) {
            for (let existingValue of this.set) {
                if (existingValue !== value
                    && implementsInterfaceTupleSupportedArray(existingValue)
                    && existingValue.equals(value)
                    || existingValue === value) {
                    return true;
                }
            }
        }
        this.set.has(value);
    }
    [Symbol.iterator]() {
        return this.set[Symbol.iterator]();
    }
    entries() {
        return this.set.entries();
    }
    keys() {
        return this.set.keys();
    }
    values() {
        return this.set.values();
    }
}
/**
 * Chinese Comments
 *
 * 两个Tuple进行比较的时候，除了实现TupleSupportedArray的类对象元素，其他元素只
 * 会进行浅层比较。对于实现了TupleSupportedArray的类对象元素，如果它们进行深层
 * 比较后相同的话，则说明两个TupleSupportedArray类对象元素相同。如果所有元素相
 * 等，则两个Tuple相等。
 *
 * 支持提供稀疏数组作为参数来创建Tuple。数组中为Empty Item的地方，在Tuple中也为
 * Empty Item。
 *
 * 提供数组类型参数进行Tuple构建的时候，构造函数只会将数字索引的值拷贝到新建的
 * Tuple对象中。
 */
export function tuple(...args) {
    return new Tuple(...args);
}
/**
 * Chinese Comments
 *
 * 两个TupleArray进行比较的时候，除了实现TupleSupportedArray的类对象元素，其他元
 * 素只会进行浅层比较。对于实现了TupleSupportedArray的类对象元素，如果它们进行深
 * 层比较后相同的话，则说明两个TupleSupportedArray类对象元素相同。如果所有元素相
 * 等，则两个TupleArray相等。
 *
 * 支持提供稀疏数组作为参数来创建TupleArray。数组中为Empty Item的地方，在TupleArray
 * 中也为Empty Item。
 *
 * 提供数组类型参数进行TupleArray构建的时候，构造函数只会将数字索引的值拷贝到新建
 * 的TupleArray对象中。
 */
export function tupleArray(...args) {
    return new TupleArray(...args);
}
export function tupleMap(keyValuePairList = []) {
    return new TupleMap(keyValuePairList);
}
export function tupleSet(elemtList = []) {
    return new TupleSet(elemtList);
}
//# sourceMappingURL=tuple_tools.js.map