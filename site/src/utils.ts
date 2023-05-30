import {modes, gameInfo} from './types'

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

export function verifyGame(
    tab: number[][],
    setTab: (tab: number[][]) => void
): number {
    const finalTab: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const temp: number[][] = [...tab];
    for (let i = 0; i < 9; i++) {
        const tempTab: number[] = getSimplifiedTab(tab[i]);
        const res = verifyWin(tempTab);
        if (res === 1 || res === 2) {
            for (let h = 0; h < 9; h++) {
                temp[i][h] = i * 9 + h + 1 + res * 100;
            }
            finalTab[i] = res;
        } else if (res === 3) {
            for (let h = 0; h < 9; h++) {
                temp[i][h] = i * 9 + h + 1;
            }
        }
    }
    setTab(temp);
    const t = verifyWin(finalTab);
    if (t === 3) {
        const n = verifyMore(finalTab);
        if (n[0] > n[1]) {
            return 1;
        } else {
            return 2;
        }
    }
    return t;
}

export function verifyWin(smallTab: number[]): number {
    for (let i = 0; i < 3; i++) {
        // Linhas
        if (
            smallTab[i * 3] === smallTab[i * 3 + 1] &&
            smallTab[i * 3 + 1] === smallTab[i * 3 + 2]
        )
            if (smallTab[i * 3] !== 0) return smallTab[i * 3];

        // Colunas
        if (
            smallTab[i] === smallTab[i + 3] &&
            smallTab[i + 3] === smallTab[i + 6]
        )
            if (smallTab[i] !== 0) return smallTab[i];
    }
    // Diagonais
    if (smallTab[0] === smallTab[4] && smallTab[4] === smallTab[8])
        if (smallTab[4] !== 0) return smallTab[4];
    if (smallTab[6] === smallTab[4] && smallTab[4] === smallTab[2])
        if (smallTab[4] !== 0) return smallTab[4];
    // Empate
    if (verifyFull(smallTab)) return 3;
    return 0;
}

export function getFinalTab(tab: number[][]): number[] {
    const res: number[] = [];
    for (let i = 0; i < 9; i++) {
        const st = getSimplifiedTab(tab[i]);
        if (verifyFull(st)) {
            res.push(st[0]);
        } else {
            res.push(0);
        }
    }
    return res;
}

export function verifyMore(smallTab: number[]): number[] {
    const res: number[] = [0, 0];
    for (let i = 0; i < 9; i++) {
        if (smallTab[i] === 1) {
            res[0]++;
        } else if (smallTab[i] === 2) {
            res[1]++;
        }
    }
    return res;
}

export function verifyFull(smallTab: number[]): boolean {
    for (let i = 0; i < 9; i++) {
        if (smallTab[i] === 0) return false;
    }
    return true;
}

export function getSimplifiedTab(smallTab: number[]) {
    const tempTab: number[] = [];
    for (let h = 0; h < 9; h++) {
        tempTab.push(Math.floor(smallTab[h] / 100));
    }
    return tempTab;
}

export function createGame(mode: modes): gameInfo {
    return {
        ended: 0,
        mode,
        nextTab: mode === 'hard' ? 4 : undefined,
        player: 1,
        tab: createTab(),
    };
}