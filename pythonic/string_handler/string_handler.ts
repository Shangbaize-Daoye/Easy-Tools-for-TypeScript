"use strict";

export function capitalize(string: string): string {
    let charArr: string[] = [];
    let length = string.length;

    if (length === 0) {
        return "";
    }

    charArr.push(string[0].toUpperCase());

    for (let index = 1; index < length; index++) {
        charArr.push(string[index].toLowerCase());
    }

    return charArr.join("");
}
