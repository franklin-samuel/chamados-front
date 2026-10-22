import CardChamado from "./CardChamado";

export default function ListaChamados(props) {
    const cards = [];

    for (let i = 0; i < props.chamados.length; i++) {
        cards.push(<CardChamado key={props.chamados[i].id} chamado={props.chamados[i]} />);
    }

    return <div className="lista-chamados">{cards}</div>;
}