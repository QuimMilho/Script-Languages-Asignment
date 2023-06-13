import { useEffect, useState } from 'react';
import { APIResults, EAPIResults, sortSelect } from '../types';
import { generateRandomId, getGames } from '../utils';
import '../styles/pontos.scss';

export default function (props: { apiURL: string }) {
    const [results, setRES] = useState<EAPIResults[]>([]);
    useEffect(() => {
        getResults((v) => setRES(v), props.apiURL);
    }, []);
    return (
        <div className='body pontos'>
            <Titles
                results={results}
                onClick={(v) => {
                    setRES(sortResults(results, v));
                }}
            />
            {results.length === 0 ? (
                <div></div>
            ) : (
                results.map((v) => (
                    <Value value={v} key={generateRandomId(16)} />
                ))
            )}
        </div>
    );
}

function Titles(props: {
    onClick: (v: sortSelect) => void;
    results: EAPIResults[];
}) {
    return (
        <ul className='title'>
            <li onClick={() => props.onClick('name')}>Nome</li>
            <li onClick={() => props.onClick('wonNormal')}>
                Vencidas
                <br />
                Normais
            </li>
            <li onClick={() => props.onClick('wonUltimate')}>
                Vencidas
                <br />
                Ultimate
            </li>
            <li onClick={() => props.onClick('lostNormal')}>
                Perdidas
                <br />
                Normais
            </li>
            <li onClick={() => props.onClick('lostUltimate')}>
                Perdidas
                <br />
                Ultimate
            </li>
        </ul>
    );
}

function Value(props: { value: EAPIResults }) {
    return (
        <ul className='value'>
            <li>{props.value.name}</li>
            <li>{props.value.wonNormal}</li>
            <li>{props.value.wonUltimate}</li>
            <li>{props.value.lostNormal}</li>
            <li>{props.value.lostUltimate}</li>
        </ul>
    );
}

async function getResults(
    setResults: (v: EAPIResults[]) => void,
    apiURL: string
) {
    setResults(sortResults(await getGames(apiURL), 'name'));
}

function sortResults(res: APIResults[], by: sortSelect): EAPIResults[] {
    let data: APIResults[];
    if (by === 'name') data = res.sort((a, b) => (a[by] > b[by] ? 1 : -1));
    else data = res.sort((a, b) => (a[by] > b[by] ? -1 : 1));
    const t: EAPIResults[] = [];
    for (let i = 0; i < data.length; i++) {
        const d = data[i];
        t.push({ ...d, randomId: generateRandomId(16) });
    }
    return t;
}
