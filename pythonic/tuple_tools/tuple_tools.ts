"use strict";

interface TupleSupportedArray {
    _INTERFACE__DISCRIMINANT_: "_INTERFACE__TUPLE_SUPPORTED_ARRAY_";

    length: number;

    [Symbol.iterator](): IterableIterator<any>;

    toString(): string;

    toLocaleString(): string;

    equals(elementForComparison: any): boolean;

    toArray(): any[];
}

function implementsInterfaceTupleSupportedArray(argument: any): argument is TupleSupportedArray {
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
class Tuple implements ReadonlyArray<any>, TupleSupportedArray {
    _INTERFACE__DISCRIMINANT_: "_INTERFACE__TUPLE_SUPPORTED_ARRAY_" =
        "_INTERFACE__TUPLE_SUPPORTED_ARRAY_";

    readonly [index: number]: any;
    readonly [index: string]: any;

    readonly length: number;

    constructor(...args: any[]) {
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

    find<S extends any>(
        predicate: (this: void, value: any, index: number, obj: ReadonlyArray<any>) => value is S,
        thisArg?: any): S | undefined;
    find(
        predicate: (value: any, index: number, obj: ReadonlyArray<any>) => boolean,
        thisArg?: any): any | undefined;
    find<S extends any>(
        predicate: ((this: void, value: any, index: number, obj: ReadonlyArray<any>) => value is S)
            | ((value: any, index: number, obj: ReadonlyArray<any>) => boolean),
        thisArg?: any): any | undefined {
        return this.toArray().find(predicate, thisArg);
    }

    findIndex(
        predicate: (value: any, index: number, obj: ReadonlyArray<any>) => boolean,
        thisArg?: any): number {
        return this.toArray().findIndex(predicate, thisArg);
    }

    [Symbol.iterator](): IterableIterator<any> {
        return this.toArray()[Symbol.iterator]();
    }

    entries(): IterableIterator<[number, any]> {
        return this.toArray().entries();
    }

    keys(): IterableIterator<number> {
        return this.toArray().keys();
    }

    values(): IterableIterator<any> {
        return this.toArray().values();
    }

    includes(searchElement: any, fromIndex?: number): boolean {
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

    toString(): string {
        return `(${this.join()})`;
    }

    toLocaleString(): string {
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
                    string += `Function(${(elemt as Function).name})`;
                }
                else if (typeof elemt === "object") {
                    if (implementsInterfaceTupleSupportedArray(elemt)) {
                        string += elemt.toLocaleString();
                    }
                    else {
                        string += `Class(${(elemt as Object).constructor.name})`;
                    }
                }
                else {
                    string += elemt.toLocaleString();
                }
            }
        }

        return string + ")";
    }

    concat(...items: (any[] | ReadonlyArray<any>)[]): any[];
    concat(...items: (any | any[] | ReadonlyArray<any>)[]): any[];
    concat(...items: (any | any[] | ReadonlyArray<any>)[]): any[] {
        return this.toArray().concat(...items);
    }

    join(separator: string = ","): string {
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
                    string += `Function(${(elemt as Function).name})`;
                }
                else if (typeof elemt === "object") {
                    if (elemt === null || implementsInterfaceTupleSupportedArray(elemt)) {
                        string += elemt;
                    }
                    else {
                        string += `Class(${(elemt as Object).constructor.name})`;
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

    slice(start?: number, end?: number): any[] {
        return this.toArray().slice(start, end);
    }

    indexOf(searchElement: any, fromIndex?: number): number {
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

    lastIndexOf(searchElement: any, fromIndex?: number): number {
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

    every(callbackfn: (value: any, index: number, array: ReadonlyArray<any>) => boolean, thisArg?: any): boolean {
        return this.toArray().every(callbackfn, thisArg);
    }

    some(callbackfn: (value: any, index: number, array: ReadonlyArray<any>) => boolean, thisArg?: any): boolean {
        return this.toArray().some(callbackfn, thisArg);
    }

    forEach(callbackfn: (value: any, index: number, array: ReadonlyArray<any>) => void, thisArg?: any): void {
        this.toArray().forEach(callbackfn, thisArg);
    }

    map<U>(callbackfn: (value: any, index: number, array: ReadonlyArray<any>) => U, thisArg?: any): U[] {
        return this.toArray().map<U>(callbackfn, thisArg);
    }

    filter<S extends any>(
        callbackfn: (value: any, index: number, array: ReadonlyArray<any>) => value is S,
        thisArg?: any): S[];
    filter(
        callbackfn: (value: any, index: number, array: ReadonlyArray<any>) => any,
        thisArg?: any): any[];
    filter<S extends any>(
        callbackfn: (value: any, index: number, array: ReadonlyArray<any>) => any,
        thisArg?: any): any[] {
        return this.toArray().filter(callbackfn, thisArg);
    }

    reduce(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: ReadonlyArray<any>) => any): any;
    reduce(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: ReadonlyArray<any>) => any,
        initialValue: any): any;
    reduce<U>(
        callbackfn: (previousValue: U, currentValue: any, currentIndex: number,
            array: ReadonlyArray<any>) => U,
        initialValue: U): U;
    reduce<U>(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: ReadonlyArray<any>) => any,
        initialValue?: any): any {
        return this.toArray().reduce(callbackfn, initialValue);
    }

    reduceRight(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: ReadonlyArray<any>) => any): any;
    reduceRight(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: ReadonlyArray<any>) => any,
        initialValue: any): any;
    reduceRight<U>(
        callbackfn: (previousValue: U, currentValue: any, currentIndex: number,
            array: ReadonlyArray<any>) => U,
        initialValue: U): U;
    reduceRight<U>(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: ReadonlyArray<any>) => any,
        initialValue?: any): any {
        return this.toArray().reduceRight(callbackfn, initialValue);
    }

    flatMap<U, This = undefined>(
        callback: (this: This, value: any, index: number, array: any[]) => U | U[],
        thisArg?: This
    ): U[] {
        return this.toArray().flatMap<U, This>(callback, thisArg);
    }

    flat<U>(this:
        ReadonlyArray<U[][][][]> |
        ReadonlyArray<ReadonlyArray<U[][][]>> |
        ReadonlyArray<ReadonlyArray<U[][]>[]> |
        ReadonlyArray<ReadonlyArray<U[]>[][]> |
        ReadonlyArray<ReadonlyArray<U>[][][]> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U[][]>>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>[][]>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>[][]> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>[]>[]> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U[]>>[]> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U[]>[]>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U[]>>>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U>[]>>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>[]>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>>[]> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>>>>,
        depth: 4): U[];
    flat<U>(this:
        ReadonlyArray<U[][][]> |
        ReadonlyArray<ReadonlyArray<U>[][]> |
        ReadonlyArray<ReadonlyArray<U[]>[]> |
        ReadonlyArray<ReadonlyArray<U[][]>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U[]>>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>[]>> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>[]> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>>>,
        depth: 3): U[];
    flat<U>(this:
        ReadonlyArray<U[][]> |
        ReadonlyArray<ReadonlyArray<U[]>> |
        ReadonlyArray<ReadonlyArray<U>[]> |
        ReadonlyArray<ReadonlyArray<ReadonlyArray<U>>>,
        depth: 2): U[];
    flat<U>(this:
        ReadonlyArray<U[]> |
        ReadonlyArray<ReadonlyArray<U>>,
        depth?: 1
    ): U[];
    flat<U>(this:
        ReadonlyArray<U>,
        depth: 0
    ): U[];
    flat<U>(depth?: number): any[];
    flat<U>(this: ReadonlyArray<any>, depth?: number): any[] {
        return (this as Tuple).toArray().flat<U>(depth);
    }

    equals(elementForComparison: any): boolean {
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

    toArray(): any[] {
        let array = [];

        for (let key in this) {
            array[key as string] = this[key];
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
class TupleArray implements Array<any>, TupleSupportedArray {
    _INTERFACE__DISCRIMINANT_: "_INTERFACE__TUPLE_SUPPORTED_ARRAY_" =
        "_INTERFACE__TUPLE_SUPPORTED_ARRAY_";

    [n: number]: any;
    [n: string]: any;

    constructor(...args: any[]) {
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

    get length(): number {
        let lengthString = "0";

        for (let key of Object.keys(this).sort(
            function (a: string, b: string): number {
                if (a < b) {
                    return 1;
                }
                else if (a = b) {
                    return 0;
                }

                return -1;
            }
        )) {
            if (/^[1-9]\d*$/.test(key) === true) {
                lengthString = key;
                break;
            }
        }

        return parseInt(lengthString) + 1;
    }

    find<S extends any>(
        predicate: (this: void, value: any, index: number, obj: any[]) => value is S,
        thisArg?: any): S | undefined;
    find(
        predicate: (value: any, index: number, obj: any[]) => boolean,
        thisArg?: any): any | undefined;
    find<S extends any>(
        predicate: ((this: void, value: any, index: number, obj: any[]) => value is S)
            | ((value: any, index: number, obj: any[]) => boolean),
        thisArg?: any): any | undefined {
        return this.toArray().find(predicate, thisArg);
    }

    findIndex(
        predicate: (value: any, index: number, obj: any[]) => boolean,
        thisArg?: any): number {
        return this.toArray().findIndex(predicate, thisArg);
    }

    fill(value: any, start?: number, end?: number): this {
        return Object.assign(this, this.extractArrayElements().fill(value, start, end));
    }

    copyWithin(target: number, start: number, end?: number): this {
        return Object.assign(this, this.extractArrayElements().copyWithin(target, start, end));
    }

    [Symbol.iterator](): IterableIterator<any> {
        return this.toArray()[Symbol.iterator]();
    }

    entries(): IterableIterator<[number, any]> {
        return this.toArray().entries();
    }

    keys(): IterableIterator<number> {
        return this.toArray().keys();
    }

    values(): IterableIterator<any> {
        return this.toArray().values();
    }

    [Symbol.unscopables](): {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    } {
        return this.toArray()[Symbol.unscopables]();
    }

    includes(searchElement: any, fromIndex?: number): boolean {
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

    toString(): string {
        return this.join();
    }

    toLocaleString(): string {
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
                    string += `Function(${(elemt as Function).name})`;
                }
                else if (typeof elemt === "object") {
                    if (implementsInterfaceTupleSupportedArray(elemt)) {
                        string += elemt.toLocaleString();
                    }
                    else {
                        string += `Class(${(elemt as Object).constructor.name})`;
                    }
                }
                else {
                    string += elemt.toLocaleString();
                }
            }
        }

        return string;
    }

    push(...items: any[]): number {
        let length = this.length;

        for (let item of items) {
            this[length++] = item;
        }

        return length;
    }

    pop(): any | undefined {
        let length = this.length;

        if (length === 0) {
            return undefined;
        }

        let lastElemt = this[--length];
        delete this[length];

        return lastElemt;
    }

    concat(...items: (any[] | ReadonlyArray<any>)[]): any[];
    concat(...items: (any | any[] | ReadonlyArray<any>)[]): any[];
    concat(...items: (any | any[] | ReadonlyArray<any>)[]): any[] {
        return this.toArray().concat(...items);
    }

    join(separator: string = ","): string {
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
                    string += `Function(${(elemt as Function).name})`;
                }
                else if (typeof elemt === "object") {
                    if (elemt === null || implementsInterfaceTupleSupportedArray(elemt)) {
                        string += elemt;
                    }
                    else {
                        string += `Class(${(elemt as Object).constructor.name})`;
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

    reverse(): any[] {
        return this.toArray().reverse();
    }

    shift(): any | undefined {
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

    slice(start?: number, end?: number): any[] {
        return this.toArray().slice(start, end);
    }

    sort(compareFn?: (a: any, b: any) => number): this {
        return Object.assign(this, this.extractArrayElements().sort(compareFn));
    }

    splice(start: number, deleteCount?: number): any[];
    splice(start: number, deleteCount: number, ...items: any[]): any[];
    splice(start: number, deleteCount?: number, ...items: any[]): any[] {
        let array = this.extractArrayElements();
        let resultArray = array.splice(start, deleteCount, ...items);

        Object.assign(this, array);

        return resultArray;
    }

    unshift(...items: any[]): number {
        let array = this.extractArrayElements();
        let newLength = array.unshift(...items);

        Object.assign(this, array);

        return newLength;
    }

    indexOf(searchElement: any, fromIndex?: number): number {
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

    lastIndexOf(searchElement: any, fromIndex?: number): number {
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

    every(callbackfn: (value: any, index: number, array: any[]) => boolean, thisArg?: any): boolean {
        return this.toArray().every(callbackfn, thisArg);
    }

    some(callbackfn: (value: any, index: number, array: any[]) => boolean, thisArg?: any): boolean {
        return this.toArray().some(callbackfn, thisArg);
    }

    forEach(callbackfn: (value: any, index: number, array: any[]) => void, thisArg?: any): void {
        this.toArray().forEach(callbackfn, thisArg);
    }

    map<U>(callbackfn: (value: any, index: number, array: any[]) => U, thisArg?: any): U[] {
        return this.toArray().map<U>(callbackfn, thisArg);
    }

    filter<S extends any>(
        callbackfn: (value: any, index: number, array: any[]) => value is S,
        thisArg?: any): S[];
    filter(
        callbackfn: (value: any, index: number, array: any[]) => any,
        thisArg?: any): any[];
    filter<S extends any>(
        callbackfn: (value: any, index: number, array: any[]) => any,
        thisArg?: any): any[] {
        return this.toArray().filter(callbackfn, thisArg);
    }

    reduce(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: any[]) => any): any;
    reduce(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: any[]) => any,
        initialValue: any): any;
    reduce<U>(
        callbackfn: (previousValue: U, currentValue: any, currentIndex: number,
            array: any[]) => U,
        initialValue: U): U;
    reduce<U>(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: any[]) => any,
        initialValue?: any): any {
        return this.toArray().reduce(callbackfn, initialValue);
    }

    reduceRight(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: any[]) => any): any;
    reduceRight(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: any[]) => any,
        initialValue: any): any;
    reduceRight<U>(
        callbackfn: (previousValue: U, currentValue: any, currentIndex: number,
            array: any[]) => U,
        initialValue: U): U;
    reduceRight<U>(
        callbackfn: (previousValue: any, currentValue: any, currentIndex: number,
            array: any[]) => any,
        initialValue?: any): any {
        return this.toArray().reduceRight(callbackfn, initialValue);
    }

    flatMap<U, This = undefined>(
        callback: (this: This, value: any, index: number, array: any[]) => U | U[],
        thisArg?: This
    ): U[] {
        return this.toArray().flatMap<U, This>(callback, thisArg);
    }

    flat<U>(this: U[][][][][][][][], depth: 7): U[];
    flat<U>(this: U[][][][][][][], depth: 6): U[];
    flat<U>(this: U[][][][][][], depth: 5): U[];
    flat<U>(this: U[][][][][], depth: 4): U[];
    flat<U>(this: U[][][][], depth: 3): U[];
    flat<U>(this: U[][][], depth: 2): U[];
    flat<U>(this: U[][], depth?: 1): U[];
    flat<U>(this: U[], depth: 0): U[];
    flat<U>(depth?: number): any[];
    flat<U>(this: any[], depth?: number): any[] {
        return (this as TupleArray).toArray().flat<U>(depth);
    }

    equals(elementForComparison: any): boolean {
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

    toArray(): any[] {
        let array = [];

        for (let key in this) {
            if (/^[1-9]\d*$/.test(key) === true) {
                array[key as string] = this[key];
            }
        }

        return array;
    }

    private extractArrayElements(): any[] {
        let array = [];

        for (let key in this) {
            if (/^[1-9]\d*$/.test(key) === true) {
                array[key as string] = this[key];
                delete this[key];
            }
        }

        return array;
    }
}

class TupleMap implements Map<any, any> {
    readonly [index: number]: any;
    readonly [index: string]: any;

    readonly [Symbol.toStringTag]: "Map" = "Map";

    private map = new Map();

    constructor(keyValuePairList: [any, any][] = []) {
        for (let keyValuePair of keyValuePairList) {
            this.set(keyValuePair[0], keyValuePair[1]);
        }
    }

    get size(): number {
        return this.map.size;
    }

    clear(): void {
        this.map.clear();
    }

    delete(key: any): boolean {
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

    forEach(callbackfn: (value: any, key: any, map: Map<any, any>) => void, thisArg?: any): void {
        this.map.forEach(callbackfn, thisArg);
    }

    get(key: any): any | undefined {
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

    has(key: any): boolean {
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

    set(key: any, value: any): this {
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

    [Symbol.iterator](): IterableIterator<[any, any]> {
        return this.map[Symbol.iterator]();
    }

    entries(): IterableIterator<[any, any]> {
        return this.map.entries();
    }

    keys(): IterableIterator<any> {
        return this.map.keys();
    }

    values(): IterableIterator<any> {
        return this.map.values();
    }
}

class TupleSet implements Set<any> {
    readonly [index: number]: any;
    readonly [index: string]: any;

    readonly [Symbol.toStringTag]: "Set" = "Set";

    private set = new Set();

    constructor(elemtList: any[] = []) {
        for (let elemt of elemtList) {
            this.add(elemt);
        }
    }

    get size(): number {
        return this.set.size;
    }

    add(value: any): this {
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

    clear(): void {
        this.set.clear();
    }

    delete(value: any): boolean {
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

    forEach(callbackfn: (value: any, value2: any, set: Set<any>) => void, thisArg?: any): void {
        this.set.forEach(callbackfn, thisArg);
    }

    has(value: any): boolean {
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

    [Symbol.iterator](): IterableIterator<any> {
        return this.set[Symbol.iterator]();
    }

    entries(): IterableIterator<[any, any]> {
        return this.set.entries();
    }

    keys(): IterableIterator<any> {
        return this.set.keys();
    }

    values(): IterableIterator<any> {
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
export function tuple(...args: any[]): Tuple {
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
export function tupleArray(...args: any[]): TupleArray {
    return new TupleArray(...args);
}

export function tupleMap(keyValuePairList: [any, any][] = []): TupleMap {
    return new TupleMap(keyValuePairList);
}

export function tupleSet(elemtList: any[] = []): TupleSet {
    return new TupleSet(elemtList);
}
