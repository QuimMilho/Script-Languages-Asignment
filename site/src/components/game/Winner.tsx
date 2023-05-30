import { gameInfo, gamemode } from '../../types';
import { createGame } from '../../utils';
import Button from '../input/Button';
import Tab from './Tab';

export default function (props: {
    nome1: string;
    nome2: string;
    winner: 1 | 2;
    tab: number[][];
    selected: gamemode;
    setJogo: (j: gameInfo) => void;
    nextTab?: number;
    bot?: boolean;
}) {
    return (
        <div className='margintop20'>
            <h2 className='white centered'>
                O jogador {props[`nome${props.winner}`]} ganhou!
            </h2>
            <Button
                color='blue'
                text='Voltar a jogar'
                width={150}
                onClick={() => {
                    const game = createGame(
                        props.selected,
                        props.nome1,
                        props.nome2
                    );
                    if (props.bot && game.player === 2) game.player = 3;
                    props.setJogo(game);
                }}
            />
            <Tab
                nextPlayer={1}
                tab={props.tab}
                selectedTab={props.nextTab}
                ended={true}
            />
        </div>
    );
}
