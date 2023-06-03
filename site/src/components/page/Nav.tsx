import { useNavigate } from 'react-router-dom';
import '../../styles/nav_fot.scss';

export default function (props: {}) {
    return (
        <div className='nav'>
            <a href='https://isec.pt'>
                <img src='/isec.png' height={'100px'} />
            </a>
            <Links />
        </div>
    );
}

function Links() {
    return (
        <ul>
            <Link text='Local' url='' />
            <Link text='Computador' url='computador' />
            <Link text='Relatório' url='relatorio' />
            <Link text='Pontuações' url='pontuacao' />
        </ul>
    );
}

function Link(props: { text: string; url: string }) {
    const navigate = useNavigate();
    return (
        <li
            className='white text bold'
            onClick={() => {
                navigate(`/${props.url}`);
            }}
        >
            {props.text}
        </li>
    );
}
