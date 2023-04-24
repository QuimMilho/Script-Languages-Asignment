import Select from "../components/input/Select";
import { createTab, getSimplifiedTab, verifyFull, verifyGame } from "../utils";
import { useState } from "react";
import Button from "../components/input/Button";
import "../styles/game.scss";
import Tab from "../components/game/Tab";
import TextInput from "../components/input/TextInput";

export default function (props: {}) {
    const [mode, setMode] = useState<"normal" | "hard">("normal");
    const [activeMode, setActiveMode] = useState<
        "newnormal" | "newhard" | "normal" | "hard"
    >("newnormal");
    const [tab, setTab] = useState<number[][]>(createTab());
    const [jog, setJog] = useState<number>(1);
    const [nextTab, setNextTab] = useState<number | undefined>(4);
    const [ended, setEnded] = useState<number>(0);
    const [nomes, setNomes] = useState<string[]>(["", ""]);
    const [error, setError] = useState<(string | undefined)[]>([
        undefined,
        undefined,
    ]);
    return (
        <div className="body singlePlayer">
            <div className="modeSelector">
                <Select
                    options={[
                        { label: "Normal", value: "normal" },
                        { label: "Ultimate", value: "hard" },
                    ]}
                    value={mode}
                    onChange={(v) => setMode(v as "normal" | "hard")}
                    clearable={false}
                />
                <Button
                    color="green"
                    text="Novo jogo!"
                    width={200}
                    onClick={() => {
                        setActiveMode(`new${mode}`);
                        setPlayer(Math.floor(Math.random() * 2) + 1, setJog);
                        newTab(setTab);
                        resetSelectedTab(mode, setNextTab);
                        setEnd(0, setEnded);
                    }}
                />
            </div>
            {activeMode === "hard" || activeMode === "normal" ? (
                ended ? (
                    <div className="info">
                        <h1 className="white">O jogo acabou!</h1>
                        <br />
                        {ended === 1 ? (
                            <span className="white">
                                Parabéns,{" "}
                                <span className="blue">{nomes[ended - 1]}</span>
                                !
                                <span className="white"> Ganhaste o jogo!</span>
                            </span>
                        ) : ended === 2 ? (
                            <span className="white">
                                Parabéns,{" "}
                                <span className="red">{nomes[ended - 1]}</span>!
                                <span className="white"> Ganhaste o jogo!</span>
                            </span>
                        ) : (
                            <span className="white">Foi empate!</span>
                        )}
                        <br /><br />
                        <Button text="Jogar Novamente" color="green" width={150} onClick={() => {
                            setActiveMode(mode);
                            setPlayer(Math.floor(Math.random() * 2) + 1, setJog);
                            newTab(setTab);
                            resetSelectedTab(mode, setNextTab);
                            setEnd(0, setEnded);
                        }} />
                    </div>
                ) : (
                    <div className="info">
                        <h1 className="white">
                            Jogador{" "}
                            <span className={jog === 1 ? "blue" : "red"}>
                                {nomes[jog - 1]}
                            </span>
                        </h1>
                    </div>
                )
            ) : undefined}
            {activeMode === "normal" ? (
                <Tab
                    tab={tab}
                    nextPlayer={jog}
                    onChange={(tab) => {
                        setTab(tab);
                        setPlayer(jog === 1 ? 2 : 1, setJog);
                        setEnded(verifyGame(tab, setTab));
                    }}
                    ended={ended ? true : false}
                />
            ) : activeMode === "hard" ? (
                <Tab
                    tab={tab}
                    nextPlayer={jog}
                    onChange={(tab, pos) => {
                        let newTab = (pos - 1) % 9;
                        setPlayer(jog === 1 ? 2 : 1, setJog);
                        setEnded(verifyGame(tab, setTab));
                        const tfull = verifyFull(getSimplifiedTab(tab[newTab]));
                        if (tfull) {
                            let full;
                            do {
                                newTab = Math.floor(Math.random() * 9);
                                full = verifyFull(
                                    getSimplifiedTab(tab[newTab])
                                );
                            } while (full);
                        }
                        if (ended === 0) newNextTab(newTab, setNextTab);
                    }}
                    selectedTab={nextTab}
                    ended={ended ? true : false}
                />
            ) : (
                <div className="info playerNames">
                    <h1 className="white">Insere o nome dos jogadores:</h1>
                    <h2 className="blue">Jogador 1</h2>
                    <TextInput
                        value={nomes[0]}
                        onChange={(str) => {
                            const temp = [...nomes];
                            temp[0] = str;
                            setNomes(temp);
                            removeError(0, error, setError);
                        }}
                        maxLength={100}
                        error={error[0]}
                    />
                    <h2 className="red">Jogador 2</h2>
                    <TextInput
                        value={nomes[1]}
                        onChange={(str) => {
                            const temp = [...nomes];
                            temp[1] = str;
                            setNomes(temp);
                            removeError(1, error, setError);
                        }}
                        maxLength={100}
                        error={error[1]}
                    />
                    <Button
                        color="green"
                        text="Começar!"
                        onClick={() => {
                            let err: (string | undefined)[] = [
                                undefined,
                                undefined,
                            ];
                            if (nomes[0].length < 3 || nomes[0].length > 100) {
                                err[0] =
                                    "O nome precisa de ter no mínimo 3 caracteres!";
                            }
                            if (nomes[1].length < 3 || nomes[1].length > 100) {
                                err[1] =
                                    "O nome precisa de ter no mínimo 3 caracteres!";
                            }
                            if (err[0] || err[1]) return setError(err);
                            if (nomes[0] === nomes[1]) {
                                err[0] = "Os nomes não podem ser iguais!";
                                err[1] = "Os nomes não podem ser iguais!";
                                return setError(err);
                            }
                            setActiveMode(mode);
                        }}
                        width={150}
                    />
                </div>
            )}
        </div>
    );
}

async function setPlayer(player: number, setPlayer: (j: number) => void) {
    setPlayer(player);
}

async function newTab(setTab: (tab: number[][]) => void) {
    setTab(createTab());
}

async function resetSelectedTab(
    gamemode: "normal" | "hard",
    setNextTab: (v: number | undefined) => void
) {
    setNextTab(gamemode === "normal" ? undefined : 4);
}

async function newNextTab(v: number, setNextTab: (v: number) => void) {
    setNextTab(v);
}

async function setEnd(ended: number, setEnded: (v: number) => void) {
    setEnded(ended);
}

async function removeError(
    index: number,
    error: (string | undefined)[],
    setError: (v: (string | undefined)[]) => void
) {
    const temp = [...error];
    temp[index] = undefined;
    setError(temp);
}
