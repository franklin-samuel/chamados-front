import { useState, useEffect } from "react";
import FiltroChamados from "../components/FiltroChamados";
import ListaChamados from "../components/ListaChamados";
import MensagemErro from "../components/MensagemErro";
import {
    listarChamados,
    listarTipos,
    listarLocais,
    listarPrioridades,
} from "../services/chamadoService";

const statusDisponiveis = ["aberto", "em andamento", "resolvido"];

export default function PaginaInicial() {
    const [chamados, setChamados] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [locais, setLocais] = useState([]);
    const [prioridades, setPrioridades] = useState([]);

    const [busca, setBusca] = useState("");
    const [status, setStatus] = useState("");
    const [tipo, setTipo] = useState("");
    const [local, setLocal] = useState("");
    const [prioridade, setPrioridade] = useState("");

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(function () {
        carregarOpcoes();
    }, []);

    useEffect(
        function () {
            carregarChamados();
        },
        [busca, status, tipo, local, prioridade]
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
            setErro("Não foi possível carregar. Verifique sua chave.");
        }
    }

    async function carregarChamados() {
        setCarregando(true);
        try {
            const dados = await listarChamados({ busca, status, tipo, local, prioridade });
            setChamados(dados);
            setErro("");
        } catch (e) {
            setErro("Não foi possível carregar. Verifique sua chave.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="pagina-inicial">
            <FiltroChamados
                busca={busca}
                aoAlterarBusca={setBusca}
                status={status}
                aoAlterarStatus={setStatus}
                statusDisponiveis={statusDisponiveis}
                tipo={tipo}
                aoAlterarTipo={setTipo}
                tipos={tipos}
                local={local}
                aoAlterarLocal={setLocal}
                locais={locais}
                prioridade={prioridade}
                aoAlterarPrioridade={setPrioridade}
                prioridades={prioridades}
            />

            <MensagemErro mensagem={erro} />

            {carregando && <p>Carregando chamados...</p>}

            {!carregando && !erro && chamados.length === 0 && <p>Nenhum chamado encontrado.</p>}

            {!carregando && chamados.length > 0 && <ListaChamados chamados={chamados} />}
        </div>
    );
}