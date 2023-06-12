import { useEffect, useState } from 'react';
import { APIResults } from '../types';

export default function (props: { apiURL: string }) {
    const [results, setResults] = useState<APIResults[]>([]);
    useEffect(() => {
        
    }, []);
    return <div className='body'></div>;
}
