import { useNavigate } from "react-router-dom";
import "../../styles/nav_fot.scss";

export default function (props: {}) {
    const navigate = useNavigate();
    return (
        <div className="footer">
            <div className="membros">
                <ul>
                    <li className="white bold centered">Desenvolvido por:</li>
                    <li className="white centered parent">
                        Joaquim Milheiro - 2020131794
                    </li>
                    <li className="white centered parent">
                        Lucas Caetano - 2020132564
                    </li>
                    <li className="white centered parent">
                        João Pinheiro - 2020131761
                    </li>
                </ul>
            </div>
        </div>
    );
}
