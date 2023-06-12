import { gameInfo, gamemode } from '../../types';
import { createGame } from '../../utils';
import Button from '../input/Button';
import Tab from './Tab';

export default function (props: {
    jogo: gameInfo;
    winner: 1 | 2;
    selected: gamemode;
    setJogo: (jogo: gameInfo) => void;
    bot?: boolean;
}) {
    return (
        <div className='margintop20'>
            <h2 className='white centered'>
                O jogador {props.jogo[`nome${props.winner}`]} ganhou!
            </h2>
            <Button
                color='blue'
                text='Voltar a jogar'
                width={150}
                onClick={() =>
                    props.setJogo(
                        createGame(
                            props.selected,
                            props.bot,
                            props.jogo.nome1,
                            props.jogo.nome2
                        )
                    )
                }
            />
            <Tab jogo={props.jogo} />
        </div>
    );
}
