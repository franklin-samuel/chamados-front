

export default function CampoSelecao(props) {
    function aoEscolher(evento) {
        props.aoAlterar(evento.target.value);
    }

    const opcoes = [];
    for (let i = 0; i < props.opcoes.length; i++) {
        opcoes.push(
            <option key={props.opcoes[i]} value={props.opcoes[i]}>
                {props.opcoes[i]}
            </option>
        );
    }

    return (
        <div className="campo">
            <label>{props.rotulo}</label>
            <select value={props.valor} onChange={aoEscolher}>
                <option value="">{props.rotuloVazio || "Todos"}</option>
                {opcoes}
            </select>
        </div>
    );
}

