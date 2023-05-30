import Select from '../components/input/Select';
import { createGame, getSimplifiedTab, verifyFull, verifyGame } from '../utils';
import { gamemode, gameInfo } from '../types';
import { useState } from 'react';
import Button from '../components/input/Button';
import '../styles/game.scss';
import Tab from '../components/game/Tab';
import Timer from '../components/input/Timer';
import Names from '../components/input/Names';

export default function (props: { apiURL: string }) {
    const [selected, setSelected] = useState<gamemode>('normal');
    const [jogo, setJogo] = useState<gameInfo>(createGame('new'));
    const [nomes, setNomes] = useState<string[]>(['', '']);
    return (
        <div className='body singlePlayer'>
            <div className='modeSelector margintop20'>
                <Select
                    options={[
                        { label: 'Normal', value: 'normal' },
                        { label: 'Ultimate', value: 'hard' },
                    ]}
                    value={selected}
                    onChange={(v) => {
                        setSelected(v as gamemode);
                    }}
                    clearable={false}
                />
                <Button
                    color='green'
                    text='Novo jogo!'
                    width={200}
                    onClick={() => {
                        setJogo(createGame('new'));
                    }}
                />
            </div>
            {jogo.ended ? (
                <div className='margintop20'>
                    <h2 className='white centered'>
                        O jogador {nomes[jogo.ended - 1]} ganhou!
                    </h2>
                    <Button
                        color='blue'
                        text='Voltar a jogar'
                        width={150}
                        onClick={() => setJogo(createGame(selected))}
                    />
                    <Tab
                        nextPlayer={1}
                        tab={jogo.tab}
                        selectedTab={jogo.nextTab}
                    />
                </div>
            ) : null}
            {jogo.mode === 'new' ? (
                <Names
                    nomes={nomes}
                    onChange={(v) => {
                        setNomes(v);
                    }}
                    startGame={() => {
                        setJogo(createGame(selected));
                    }}
                />
            ) : jogo.ended === 0 ? (
                <div className='tabuleiroSingle'>
                    <Timer
                        time={3000}
                        paused={jogo.player === 2}
                        ended={jogo.ended !== 0}
                        onTick={(n) => {
                            if (n === 0) {
                                const game = { ...jogo };
                                game.ended = 2;
                                setJogo(game);
                            }
                        }}
                        label={`Jogador ${nomes[0]}:`}
                    />
                    <Tab
                        nextPlayer={jogo.player}
                        tab={jogo.tab}
                        ended={jogo.ended !== 0 ? true : false}
                        selectedTab={jogo.nextTab}
                        onChange={(tab, pos) => {
                            const game = { ...jogo };
                            game.player = game.player === 1 ? 2 : 1;
                            game.ended = verifyGame(tab, (v) => {
                                game.tab = v;
                            });
                            if (game.mode === 'hard') {
                                game.nextTab = (pos - 1) % 9;
                                if (
                                    verifyFull(
                                        getSimplifiedTab(game.tab[game.nextTab])
                                    )
                                ) {
                                    do {
                                        game.nextTab = Math.floor(
                                            Math.random() * 9
                                        );
                                    } while (
                                        verifyFull(
                                            getSimplifiedTab(
                                                game.tab[game.nextTab]
                                            )
                                        )
                                    );
                                }
                            }
                            setJogo(game);
                        }}
                    />
                    <Timer
                        time={3000}
                        paused={jogo.player === 1}
                        ended={jogo.ended !== 0}
                        onTick={(n) => {
                            if (n === 0) {
                                const game = { ...jogo };
                                game.ended = 1;
                                setJogo(game);
                            }
                        }}
                        label={`Jogador ${nomes[1]}:`}
                    />
                </div>
            ) : null}
        </div>
    );
}
