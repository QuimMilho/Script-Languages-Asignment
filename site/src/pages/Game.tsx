import { gameInfo, gamemode, modes } from '../types';
import { useEffect, useState } from 'react';
import ModeSelection from '../components/game/ModeSelection';
import Winner from '../components/game/Winner';
import '../styles/game.scss';
import { createGame } from '../utils';
import Names from '../components/input/Names';
import ComputerTab from '../components/game/ComputerTab';
import SingleTab from '../components/game/SingleTab';

export default function (props: { bot: boolean; apiURL: string }) {
    const [selected, setSelected] = useState<gamemode>('normal');
    const [jogo, setJogo] = useState<gameInfo>(createGame('new', false));

    useEffect(() => {
        setJogo(createGame('new', props.bot));
    }, [props.bot]);

    return (
        <div className='body'>
            <ModeSelection
                selected={selected}
                setSelected={(v) => setSelected(v as gamemode)}
                setJogo={(v) => setJogo(v)}
            />
            <NextPlayer
                ended={jogo.ended !== 0}
                gamemode={jogo.mode}
                nome1={jogo.nome1}
                nome2={jogo.nome2}
                player={jogo.player}
            />
            <GameComponents
                bot={props.bot}
                jogo={jogo}
                selected={selected}
                setJogo={(jogo) => setJogo(jogo)}
            />
        </div>
    );
}

function GameComponents(props: {
    selected: gamemode;
    jogo: gameInfo;
    setJogo: (jogo: gameInfo) => void;
    bot: boolean;
}) {
    if (props.jogo.ended)
        return (
            <Winner
                jogo={props.jogo}
                selected={props.selected}
                setJogo={(j) => props.setJogo(j)}
                winner={props.jogo.ended as 1 | 2}
                bot={props.bot}
            />
        );
    if (props.jogo.mode === 'new')
        return (
            <Names
                nomes={[props.jogo.nome1, props.bot ? 'BOT' : props.jogo.nome2]}
                onChange={(v) => {
                    const temp = { ...props.jogo };
                    temp.nome1 = v[0];
                    temp.nome2 = v[1];
                    props.setJogo(temp);
                }}
                startGame={() =>
                    props.setJogo(
                        createGame(
                            props.selected,
                            props.bot,
                            props.jogo.nome1,
                            props.jogo.nome2
                        )
                    )
                }
                bot={props.bot}
            />
        );
    if (props.bot)
        return (
            <ComputerTab jogo={props.jogo} setJogo={(j) => props.setJogo(j)} />
        );
    return <SingleTab jogo={props.jogo} setJogo={(j) => props.setJogo(j)} />;
}

function NextPlayer(props: {
    player: number;
    nome1: string;
    nome2: string;
    ended: boolean;
    gamemode: modes;
}) {
    if (props.gamemode === 'new' || props.ended) return <div />;
    return (
        <h2 className='white centered margintop20'>
            É a vez de{' '}
            <span className={props.player === 1 ? 'blueColor' : 'redColor'}>
                {props.player === 1 ? props.nome1 : props.nome2}
            </span>
        </h2>
    );
}
