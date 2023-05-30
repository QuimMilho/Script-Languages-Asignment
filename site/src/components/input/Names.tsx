import Button from './Button';
import TextInput from './TextInput';
import { useState } from 'react';

export default function (props: {
    nomes: string[];
    onChange: (v: string[]) => void;
    startGame: () => void;
}) {
    const [error, setError] = useState<string[]>(['', '']);
    return (
        <div className='centered names'>
            <h2 className='white margintop20'>Jogador 1</h2>
            <TextInput
                maxLength={100}
                onChange={(v) => {
                    const temp = [...props.nomes];
                    temp[0] = v;
                    props.onChange(temp);
                }}
                value={props.nomes[0]}
                error={error[0]}
            />
            <h2 className='white margintop20'>Jogador 2</h2>
            <TextInput
                maxLength={100}
                onChange={(v) => {
                    const temp = [...props.nomes];
                    temp[1] = v;
                    props.onChange(temp);
                }}
                value={props.nomes[1]}
                error={error[1]}
            />
            <div className='margintop20'>
                <Button
                    text='Jogar'
                    color='blue'
                    width={200}
                    onClick={() => {
                        if (props.nomes[0].length <= 3) {
                            return setError([
                                'O nome deve ter pelo menos 3 caracteres!',
                                '',
                            ]);
                        }
                        if (props.nomes[1].length <= 3) {
                            return setError([
                                '',
                                'O nome deve ter pelo menos 3 caracteres!',
                            ]);
                        }
                        if (props.nomes[0] === props.nomes[1]) {
                            return setError([
                                'Os nomes não podem ser iguais!',
                                'Os nomes não podem ser iguais!',
                            ]);
                        }
                        props.startGame();
                    }}
                />
            </div>
        </div>
    );
}
