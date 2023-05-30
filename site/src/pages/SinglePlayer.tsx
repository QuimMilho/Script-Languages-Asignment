import { createGame } from '../utils';
import { gamemode, gameInfo } from '../types';
import { useState } from 'react';
import '../styles/game.scss';
import Names from '../components/input/Names';
import ModeSelection from '../components/game/ModeSelection';
import Winner from '../components/game/Winner';
import SingleTab from '../components/game/SingleTab';

export default function (props: { apiURL: string }) {
    const [selected, setSelected] = useState<gamemode>('normal');
    const [jogo, setJogo] = useState<gameInfo>(createGame('new'));
    return (
        <div className='body singlePlayer'>
            <ModeSelection
                selected={selected}
                setSelected={(v) => setSelected(v as gamemode)}
                setJogo={(v) => setJogo(v)}
            />
            {jogo.ended ? (
                <Winner
                    nome1={jogo.nome1}
                    nome2={jogo.nome2}
                    selected={selected}
                    setJogo={(j) => setJogo(j)}
                    tab={jogo.tab}
                    winner={jogo.ended as 1 | 2}
                    nextTab={jogo.nextTab}
                />
            ) : null}
            {jogo.mode === 'new' ? (
                <Names
                    nomes={[jogo.nome1, jogo.nome2]}
                    onChange={(v) => {
                        const temp = { ...jogo };
                        temp.nome1 = v[0];
                        temp.nome2 = v[1];
                        setJogo(temp);
                    }}
                    startGame={() => {
                        setJogo(createGame(selected, jogo.nome1, jogo.nome2));
                    }}
                />
            ) : jogo.ended === 0 ? (
                <div>
                    <h2 className='white centered margintop20'>É a vez de {jogo[`nome${jogo.player as 1 | 2}`]}</h2>
                    <SingleTab jogo={jogo} setJogo={(j) => setJogo(j)} />
                </div>
            ) : null}
        </div>
    );
}
