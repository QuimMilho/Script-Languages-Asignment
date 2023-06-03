import { gameInfo, gamemode } from '../../types';
import { createGame } from '../../utils';
import Button from '../input/Button';
import Select from '../input/Select';

export default function (props: {
    selected: gamemode;
    setSelected: (value: string) => void;
    setJogo: (jogo: gameInfo) => void;
}) {
    return (
        <div className='modeSelector margintop20'>
            <Select
                options={[
                    { label: 'Normal', value: 'normal' },
                    { label: 'Ultimate', value: 'hard' },
                ]}
                value={props.selected}
                onChange={(value) => props.setSelected(value as gamemode)}
            />
            <Button
                color='green'
                text='Novo jogo!'
                width={200}
                onClick={() => props.setJogo(createGame('new', false))}
            />
        </div>
    );
}
