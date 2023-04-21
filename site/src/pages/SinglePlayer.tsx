import Tab from "../components/game/Tab";
import Select from "../components/input/Select";
import { createTab } from "../utils";
import { useState } from "react";

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
            <Tab
                nextPlayer={jog}
                tab={tab}
                onChange={(tab) => {
                    setTab(tab);
                    setPlayer(jog === 1 ? 2 : 1, setJog);
                }}
            />
        </div>
    );
}

async function setPlayer(player: number, setPlayer: (j: number) => void) {
    setPlayer(player);
}
