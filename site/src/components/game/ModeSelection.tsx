import { gameInfo, gamemode } from "../../types";
import { createGame } from "../../utils";
import Button from "../input/Button";
import Select from "../input/Select";

export default function (props: {
    selected: string;
    setSelected: (v: string) => void;
    setJogo: (j: gameInfo) => void;
}) {
    return (
        <div className='modeSelector margintop20'>
            <Select
                options={[
                    { label: 'Normal', value: 'normal' },
                    { label: 'Ultimate', value: 'hard' },
                ]}
                value={props.selected}
                onChange={(v) => {
                    props.setSelected(v as gamemode);
                }}
                clearable={false}
            />
            <Button
                color='green'
                text='Novo jogo!'
                width={200}
                onClick={() => {
                    props.setJogo(createGame('new'));
                }}
            />
        </div>
    );
}
