export interface Game {
    jog1: string;
    jog2: string;
    result: number;
    gameId: number;
    type: "computer" | "local";
}

export type modes = 'new' | 'normal' | 'hard';
export type gamemode = 'normal' | 'hard';

export type gameInfo = {
    mode: modes;
    tab: number[][];
    player: number;
    nextTab: number | undefined;
    ended: number;
};