export interface Game {
    jog1: string;
    jog2: string;
    result: number;
    gameId: number;
    type: "computer" | "local" | "online";
}
