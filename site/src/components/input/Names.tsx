import Button from './Button';
import TextInput from './TextInput';
import { useState } from 'react';

export default function (props: {
    nomes: string[];
    onChange: (nomes: string[]) => void;
    startGame: () => void;
    bot?: boolean;
}) {
    const [error, setError] = useState<string[]>(['', '']);
    return (
        <div className='centered names'>
            <h2 className='white margintop20'>Jogador 1</h2>
            <TextInput
                maxLength={100}
                onChange={(value) =>
                    props.onChange(getNomesArray(props.nomes, value, 0))
                }
                value={props.nomes[0]}
                error={error[0]}
            />
            <h2 className='white margintop20'>Jogador 2</h2>
            <TextInput
                maxLength={100}
                onChange={(value) =>
                    props.onChange(getNomesArray(props.nomes, value, 1))
                }
                value={props.nomes[1]}
                error={error[1]}
                disabled={props.bot}
            />
            <div className='margintop20'>
                <Button
                    text='Jogar'
                    color='blue'
                    width={200}
                    onClick={() => {
                        const error = findErrors(props.nomes, props.bot);
                        if (error) return setError(error);
                        props.startGame();
                    }}
                />
            </div>
        </div>
    );
}

function getNomesArray(nomes: string[], value: string, index: number) {
    const temp = [...nomes];
    temp[index] = value;
    return temp;
}

function findErrors(nomes: string[], bot?: boolean): string[] | undefined {
    if (nomes[0].length <= 2)
        return ['O nome deve ter pelo menos 3 caracteres!', ''];
    if (nomes[0].toUpperCase() === 'BOT') {
        return ['O nome não pode ser BOT!', ''];
    }
    if (nomes[1].length <= 2)
        return ['', 'O nome deve ter pelo menos 3 caracteres!'];
    if (!bot && nomes[1].toUpperCase() === 'BOT') {
        return ['', 'O nome não pode ser BOT!'];
    }
    if (nomes[0].toLowerCase() === nomes[1].toLowerCase())
        return [
            'Os nomes não podem ser iguais!',
            'Os nomes não podem ser iguais!',
        ];
    return undefined;
}
