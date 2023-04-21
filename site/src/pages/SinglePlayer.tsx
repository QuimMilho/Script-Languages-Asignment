import { JsxElement } from "typescript";
import Tab from "../components/game/Tab";
import Select from "../components/input/Select";
import { createTab } from "../utils";
import { useState } from "react";
import Button from "../components/input/Button";

export default function (props: {}) {
    const [tab, setTab] = useState(createTab());
    const [jog, setJog] = useState(1);
    return (
        <div className="body">
            <Select
                value="normal"
                options={[
                    { label: "Normal", value: "normal" },
                    { label: "Ultimate", value: "hard" },
                ]}
                clearable={false}
            />
            <Button
                color="red"
                text="Novo Jogo!"
                width={200}
                onClick={() => {
                    setTab(createTab());
                    setPlayer(1, setJog);
                }}
            />
            <Tab
                nextPlayer={jog}
                tab={tab}
                onChange={(t) => {
                    setTab(t);
                    setPlayer(jog === 1 ? 2 : 1, setJog);
                }}
            />
        </div>
    );
}

async function setPlayer(player: number, setPlayer: (j: number) => void) {
    setPlayer(player);
}
