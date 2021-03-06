"use strict";

import { Stats, accessSync, readFileSync, readSync, statSync, writeFileSync } from "fs";
import { decode } from "iconv-lite";

export class FileReader {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    read(): string {
        let data = readFileSync(this.filePath, "utf-8");

        return data;
    }
}

export class FileWriter {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    writeAppend(data: string): void {
        writeFileSync(this.filePath, data, { flag: "a" });
    }

    write(data: string): void {
        writeFileSync(this.filePath, data);
    }
}

export function fileExists(filePath: string): boolean {
    try {
        accessSync(filePath);
    }
    catch (err) {
        return false;
    }

    return true;
}

export function getFileState(filePath: string): Stats {
    return statSync(filePath);
}

export function input(promptWords?: string, maxBufferSize?: number): string {
    if (promptWords) {
        process.stdout.write(promptWords);
    }

    let actualBufferSize = maxBufferSize > 0 ? maxBufferSize : 1024;
    let buffer = Buffer.alloc(actualBufferSize);

    readSync(process.stdin.fd, buffer, 0, actualBufferSize, 0);

    let inputResult = buffer.toString();

    if (inputResult.includes("�")) {
        inputResult = decode(buffer, "gbk");
    }

    return inputResult.replace(/\0*$/, "").trim();
}

export function print(printValue: string = "", endWith: string = "\n"): void {
    if (printValue === null || printValue === undefined) {
        printValue = "";
    }

    if (endWith === null || endWith === undefined) {
        endWith = "";
    }

    process.stdout.write(printValue + endWith);
}

/**
 * Chinese Comments
 *
 * 调用selectionListInput函数的时候，无论是给startFrom传递undefined，还是不给它传递参数，startFrom最终都会使用默认值0。
 * 但是，如果给starFrom传的是null，startFrom的值会为null。不过请注意，Math.floor(startFrom)，此时也就是Math.floor(null)，
 * 它的返回结果为0，凑巧又将0值赋值给了starFrom。所以无论给startFrom传递null、undefined，还是不传值，startFrom最后都会
 * 使用默认值0。
 *
 * 但是，如果传递NaN给startFrom，TypeScript不会报错。此时startFrom为NaN，且Math.floor(NaN)的返回值也为NaN。所以这里
 * 只需要检查startFrom是否为NaN即可，不需要检查它为null或者undefined的情况。
 */
export function selectionListInput(selectionList: string[], startFrom: number = 0): string {
    if (selectionList === null) {
        throw new Error("The \"selectionList\" can not be null!");
    }
    else if (selectionList === undefined) {
        throw new Error("The \"selectionList\" is undefined!");
    }
    else if (selectionList.length === 0) {
        throw new Error("The \"selectionList\" can not be an empty array!");
    }

    if ((startFrom = Math.floor(startFrom)) < 0 || isNaN(startFrom)) {
        throw new Error("The parameter \"startFrom\" needs to be non-negative integer!");
    }

    let endWith = startFrom;
    let numberItemMap: Map<number, string> = new Map();

    for (let item of selectionList) {
        process.stdout.write("[" + endWith + "]: " + item + "\n");
        numberItemMap.set(endWith, item);
        endWith += 1;
    }

    let selectionNumber = parseInt(input("Please enter your number to choose: "));

    while (selectionNumber < startFrom || selectionNumber >= endWith || isNaN(selectionNumber)) {
        selectionNumber = parseInt(input("Invalid input! Please enter your number again: "));
    }

    return numberItemMap.get(selectionNumber);
}

export let clog = console.log;
