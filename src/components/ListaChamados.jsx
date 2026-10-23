import CardChamado from "./CardChamado";

export default function ListaChamados(props) {
    const cards = [];

    {props.chamados.map((chamado) => (
        cards.push(<CardChamado key={chamado.id} chamado={chamado} />)
    ))}

    return <div className="lista-chamados">{cards}</div>;
}