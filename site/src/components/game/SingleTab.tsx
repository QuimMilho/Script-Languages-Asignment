import { gameInfo } from '../../types';
import { playMove, sendJogo } from '../../utils';
import Timer from '../input/Timer';
import Tab from './Tab';

export default function (props: {
    jogo: gameInfo;
    setJogo: (j: gameInfo) => void;
    apiURL: string;
}) {
    return (
        <div className='tabuleiroSingle'>
            <Timer
                time={3000}
                paused={props.jogo.player === 2}
                ended={props.jogo.ended !== 0}
                onTick={(timeRemaining) => {
                    if (timeRemaining === 0) {
                        const game = { ...props.jogo };
                        game.ended = 2;
                        props.setJogo(game);
                    }
                }}
                label={`Jogador ${props.jogo.nome1}:`}
            />
            <Tab
                jogo={props.jogo}
                onChange={(tab, pos) => {
                    const jogo = playMove(props.jogo, tab, pos);
                    props.setJogo(jogo);
                    if (jogo.ended) sendJogo(jogo, props.apiURL);
                }}
            />
            <Timer
                time={3000}
                paused={props.jogo.player === 1}
                ended={props.jogo.ended !== 0}
                onTick={(timeRemaining) => {
                    if (timeRemaining === 0) {
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
