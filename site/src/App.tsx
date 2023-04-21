import React from "react";
import {
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./styles/global.scss";
import Nav from "./components/page/Nav";
import Footer from "./components/page/Footer";
import SinglePlayer from "./pages/SinglePlayer";

export default function (props: {}) {
    const apiURL = 'https://quimmilho.net:600';
    return (
        <div className="App">
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<SinglePlayer />}></Route>
                    <Route
                        path="/online"
                        element={<div className="body"></div>}
                    ></Route>
                    <Route
                        path="/pontuacao"
                        element={<div className="body"></div>}
                    ></Route>
                    <Route
                        path="/relatorio"
                        element={<div className="body"></div>}
                    ></Route>
                    <Route path="*"></Route>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}
