import { gameInfo } from '../../types';
import { computerPlay, move } from '../../utils';
import Timer from '../input/Timer';
import Tab from './Tab';

export default function (props: {
    jogo: gameInfo;
    setJogo: (j: gameInfo) => void;
}) {
    return (
        <div className='tabuleiroComp'>
            <Timer
                time={3000}
                paused={props.jogo.player !== 1}
                ended={props.jogo.ended !== 0}
                onTick={(n) => {
                    if (n === 0) {
                        const game = { ...props.jogo };
                        game.ended = 2;
                        props.setJogo(game);
                    }
                }}
                label={`Jogador ${props.jogo.nome1}:`}
            />
            <Tab
                nextPlayer={props.jogo.player}
                tab={props.jogo.tab}
                ended={props.jogo.ended !== 0}
                selectedTab={props.jogo.nextTab}
                onChange={(tab, pos) => {
                    const j = move(props.jogo, tab, pos, 3);
                    props.setJogo(j);
                    computerPlay(j, props.setJogo);
                }}
            />
        </div>
    );
}
