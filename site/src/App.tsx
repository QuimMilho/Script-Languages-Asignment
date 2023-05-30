import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './styles/global.scss';
import Nav from './components/page/Nav';
import Footer from './components/page/Footer';
import SinglePlayer from './pages/SinglePlayer';
import Computador from './pages/Computador';
import Pontuacao from './pages/Pontuacao';
import Relatorio from './pages/Relatorio';

export default function (props: {}) {
    const apiURL = 'https://quimmilho.net:600/api';
    return (
        <div className='App'>
            <Router>
                <Nav />
                <Routes>
                    <Route
                        path='/'
                        element={<SinglePlayer apiURL={apiURL} />}
                    ></Route>
                    <Route
                        path='/pontuacao'
                        element={<Pontuacao apiURL={apiURL} />}
                    ></Route>
                    <Route
                        path='/computador'
                        element={<Computador apiURL={apiURL} />}
                    ></Route>
                    <Route
                        path='/relatorio'
                        element={<Relatorio />}
                    ></Route>
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
