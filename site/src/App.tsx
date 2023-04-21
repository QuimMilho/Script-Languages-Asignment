import React from "react";
import {
    Route,
    BrowserRouter as Router,
    Routes,
    Outlet,
} from "react-router-dom";
import "./styles/global.scss";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function (props: {}) {
    const apiURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;
    console.log("teste");
    return (
        <div className="App">
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<div className="body" />}></Route>
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
