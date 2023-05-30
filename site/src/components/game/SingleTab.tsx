import { gameInfo } from '../../types';
import { getSimplifiedTab, move, verifyFull, verifyGame } from '../../utils';
import Timer from '../input/Timer';
import Tab from './Tab';

export default function (props: {
    jogo: gameInfo;
    setJogo: (j: gameInfo) => void;
}) {
    return (
        <div className='tabuleiroSingle'>
            <Timer
                time={3000}
                paused={props.jogo.player === 2}
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
                    props.setJogo(move(props.jogo, tab, pos));
                }}
            />
            <Timer
                time={3000}
                paused={props.jogo.player === 1}
                ended={props.jogo.ended !== 0}
                onTick={(n) => {
                    if (n === 0) {
                        const game = { ...props.jogo };
                        game.ended = 1;
                        props.setJogo(game);
                    }
                }}
                label={`Jogador ${props.jogo.nome2}:`}
            />
        </div>
    );
}
