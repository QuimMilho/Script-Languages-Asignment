export interface APIGame {
    jog1: string;
    jog2: string;
    result: number;
    gameId: number;
    type: gamemode;
}

export interface APIResults {
    name: string;
    wonNormal: number;
    lostNormal: number;
    wonUltimate: number;
    lostUltimate: number;
}

export interface EAPIResults extends APIResults {
    randomId: string;
}

export type sortSelect =
    | 'name'
    | 'wonNormal'
    | 'wonUltimate'
    | 'lostNormal'
    | 'lostUltimate'; 
export type modes = 'new' | 'normal' | 'hard';
export type gamemode = 'normal' | 'hard';

export interface gameInfo {
    mode: modes;
    tab: number[][];
    player: number;
    nextTab: number | undefined;
    ended: number;
    nome1: string;
    nome2: string;
}

export interface option {
    value: string;
    label: string;
}

export interface TimerProps {
    time: number;
    paused: boolean;
    onTick: (n: number) => void;
    ended: boolean;
    label?: string;
}

export interface TimerState {
    time: number;
}
