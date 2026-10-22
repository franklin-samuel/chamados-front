import { Link } from "react-router-dom";

export default function Cabecalho(props) {
    return (
        <header className="cabecalho">
            <div className="cabecalho-topo">
                <span className="nome-sistema">Chamados IFRN</span>
                <span className="nome-usuario">Olá, {props.nome}</span>
            </div>
            <nav className="cabecalho-nav">
                <Link to="/">Chamados</Link>
                <Link to="/novo">+ Abrir chamado</Link>
            </nav>
        </header>
    );
}