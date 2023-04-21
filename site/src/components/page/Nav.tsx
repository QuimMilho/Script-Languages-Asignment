import { useNavigate } from "react-router-dom";
import "../../styles/nav_fot.scss";

export default function (props: {}) {
    const navigate = useNavigate();
    return (
        <div className="nav">
            <a href="https://isec.pt">
                <img src="/isec.png" height={"100px"} />
            </a>

            <ul>
                <li
                    className="white text bold"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Local
                </li>
                <li
                    className="white text bold"
                    onClick={() => {
                        navigate("/online");
                    }}
                >
                    Online
                </li>
                <li
                    className="white text bold"
                    onClick={() => {
                        navigate("/pontuacao");
                    }}
                >
                    Pontuações
                </li>
                <li
                    className="white text bold"
                    onClick={() => {
                        navigate("/relatorio");
                    }}
                >
                    Relatório
                </li>
            </ul>
        </div>
    );
}
