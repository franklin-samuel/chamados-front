import { useState, useEffect } from "react";
import CampoTexto from "./CampoTexto";
import CampoSelecao from "./CampoSelecao";

export default function FormularioChamado(props) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [local, setLocal] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [dataAbertura, setDataAbertura] = useState("");

    useEffect(
        function () {
            if (props.chamado) {
                setTitulo(props.chamado.titulo);
                setDescricao(props.chamado.descricao);
                setTipo(props.chamado.tipo);
                setLocal(props.chamado.local);
                setPrioridade(props.chamado.prioridade);
                setDataAbertura(props.chamado.data_abertura);
            }
        },
        [props.chamado]
    );

    function aoEnviar(evento) {
        evento.preventDefault();

        const chamado = {
            titulo: titulo,
            descricao: descricao,
            tipo: tipo,
            local: local,
            prioridade: prioridade,
            data_abertura: dataAbertura,
        };

        props.aoSalvar(chamado);
    }

    return (
        <form className="formulario-chamado" onSubmit={aoEnviar}>
            <CampoTexto rotulo="Título" valor={titulo} aoAlterar={setTitulo} />
            <CampoTexto rotulo="Descrição" valor={descricao} aoAlterar={setDescricao} area={true} />
            <CampoSelecao
                rotulo="Tipo"
                valor={tipo}
                opcoes={props.tipos}
                rotuloVazio="Selecione"
                aoAlterar={setTipo}
            />
            <CampoSelecao
                rotulo="Local"
                valor={local}
                opcoes={props.locais}
                rotuloVazio="Selecione"
                aoAlterar={setLocal}
            />
            <CampoSelecao
                rotulo="Prioridade"
                valor={prioridade}
                opcoes={props.prioridades}
                rotuloVazio="Selecione"
                aoAlterar={setPrioridade}
            />
            <CampoTexto rotulo="Data de abertura" tipo="date" valor={dataAbertura} aoAlterar={setDataAbertura} />

            {props.mensagem && <p className="mensagem-formulario">{props.mensagem}</p>}

            <div className="acoes-formulario">
                <button type="submit">Salvar</button>
                <button type="button" onClick={props.aoCancelar}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}