import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './styles/global.scss';
import Nav from './components/page/Nav';
import Footer from './components/page/Footer';
import Pontuacao from './pages/Pontuacao';
import Relatorio from './pages/Relatorio';
import Game from './pages/Game';

export default function () {
    const apiURL = 'https://quimmilho.net:600/api';
    return (
        <div className='App'>
            <Router>
                <Nav />
                <Routes>
                    <Route
                        path='/'
                        element={<Game bot={false} apiURL={apiURL} />}
                    ></Route>
                    <Route
                        path='/pontuacao'
                        element={<Pontuacao apiURL={apiURL} />}
                    ></Route>
                    <Route
                        path='/computador'
                        element={<Game bot={true} apiURL={apiURL} />}
                    ></Route>
                    <Route path='/relatorio' element={<Relatorio />}></Route>
                    <Route
                        path='*'
                        element={
                            <div className='body'>
                                <h1 className='white centered'>
                                    404: Not Found
                                </h1>
                            </div>
                        }
                    ></Route>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}
