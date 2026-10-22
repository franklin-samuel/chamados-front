import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormularioChamado from "../components/FormularioChamado";
import MensagemErro from "../components/MensagemErro";
import {
    buscarChamado,
    abrirChamado,
    editarChamado,
    listarTipos,
    listarLocais,
    listarPrioridades,
} from "../services/chamadoService";

export default function PaginaFormulario() {
    const { id } = useParams();
    const navegar = useNavigate();
    const editando = !!id;

    const [chamado, setChamado] = useState(null);
    const [tipos, setTipos] = useState([]);
    const [locais, setLocais] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [carregando, setCarregando] = useState(editando);
    const [mensagem, setMensagem] = useState("");

    useEffect(
        function () {
            carregarOpcoes();
            if (editando) {
                carregarChamado();
            }
        },
        [id]
    );

    async function carregarOpcoes() {
        try {
            const dadosTipos = await listarTipos();
            const dadosLocais = await listarLocais();
            const dadosPrioridades = await listarPrioridades();
            setTipos(dadosTipos);
            setLocais(dadosLocais);
            setPrioridades(dadosPrioridades);
        } catch (e) {
            setMensagem("Não foi possível carregar. Verifique sua chave.");
        }
    }

    async function carregarChamado() {
        setCarregando(true);
        try {
            const dados = await buscarChamado(id);
            setChamado(dados);
        } catch (e) {
            setMensagem("Não foi possível carregar o chamado.");
        } finally {
            setCarregando(false);
        }
    }

    async function aoSalvar(dadosChamado) {
        try {
            if (editando) {
                await editarChamado(id, dadosChamado);
            } else {
                await abrirChamado(dadosChamado);
            }
            navegar("/");
        } catch (e) {
            if (e.response && e.response.data && e.response.data.detail) {
                setMensagem(e.response.data.detail);
            } else {
                setMensagem("Não foi possível salvar o chamado.");
            }
        }
    }

    function aoCancelar() {
        navegar(-1);
    }

    if (carregando) {
        return <p>Carregando chamado...</p>;
    }

    if (editando && chamado && chamado.status === "resolvido") {
        return <MensagemErro mensagem="Chamados resolvidos não podem ser editados." />;
    }

    return (
        <div className="pagina-formulario">
            <h2>{editando ? "Editar chamado" : "Abrir chamado"}</h2>
            <FormularioChamado
                chamado={chamado}
                tipos={tipos}
                locais={locais}
                prioridades={prioridades}
                mensagem={mensagem}
                aoSalvar={aoSalvar}
                aoCancelar={aoCancelar}
            />
        </div>
    );
}