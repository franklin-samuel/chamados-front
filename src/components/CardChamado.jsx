import { Link } from "react-router-dom";

export default function CardChamado(props) {
    const chamado = props.chamado;

    return (
        <Link to={"/chamado/" + chamado.id} className="card-chamado">
            <h3>{chamado.titulo}</h3>
            <p>
                {chamado.status} · {chamado.prioridade}
            </p>
            <p>
                {chamado.tipo} - {chamado.local}
            </p>
        </Link>
    );
}