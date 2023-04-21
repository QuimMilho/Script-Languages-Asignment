export function createTab(): number[][] {
    let temp: number[][] = [];
    let t: number[] = [];
    for (let i = 1; i < 82; i++) {
        t.push(i);
        if (i % 9 === 0) {
            temp.push(t);
            t = [];
        }
    }
    return temp;
}

export function generateRandomId(size: number) {
    let result = "";
    const charSet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < size; i++) {
        result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return result;
}
