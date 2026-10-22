

export default function CampoTexto(props) {
    function aoDigitar(evento) {
        props.aoAlterar(evento.target.value);
    }

    return (
        <div className="campo">
            <label>{props.rotulo}</label>
            {props.area ? (
                <textarea value={props.valor} onChange={aoDigitar} />
            ) : (
                <input type={props.tipo || "text"} value={props.valor} onChange={aoDigitar} />
            )}
        </div>
    );
}