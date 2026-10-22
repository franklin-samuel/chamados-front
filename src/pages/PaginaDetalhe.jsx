import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MensagemErro from "../components/MensagemErro";
import CampoTexto from "../components/CampoTexto";
import {
    buscarChamado,
    excluirChamado,
    iniciarAtendimento,
    resolverChamado,
} from "../services/chamadoService";

export default function PaginaDetalhe() {
    const { id } = useParams();
    const navegar = useNavigate();

    const [chamado, setChamado] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const [responsavel, setResponsavel] = useState("");
    const [solucao, setSolucao] = useState("");

    useEffect(
        function () {
            carregarChamado();
        },
        [id]
    );

    async function carregarChamado() {
        setCarregando(true);
        try {
            const dados = await buscarChamado(id);
            setChamado(dados);
            setErro("");
        } catch (e) {
            setErro("Não foi possível carregar. Verifique sua chave.");
        } finally {
            setCarregando(false);
        }
    }

    async function aoExcluir() {
        const confirmar = window.confirm("Tem certeza que deseja excluir este chamado?");
        if (!confirmar) {
            return;
        }

        try {
            await excluirChamado(id);
            navegar("/");
        } catch (e) {
            setErro("Não foi possível excluir o chamado.");
        }
    }

    async function aoIniciar(evento) {
        evento.preventDefault();
        try {
            await iniciarAtendimento(id, responsavel);
            setResponsavel("");
            carregarChamado();
        } catch (e) {
            setErro("Não foi possível iniciar o atendimento.");
        }
    }

    async function aoResolver(evento) {
        evento.preventDefault();
        try {
            await resolverChamado(id, solucao);
            setSolucao("");
            carregarChamado();
        } catch (e) {
            setErro("Não foi possível resolver o chamado.");
        }
    }

    if (carregando) {
        return <p>Carregando chamado...</p>;
    }

    if (!chamado) {
        return <MensagemErro mensagem={erro || "Chamado não encontrado."} />;
    }

    return (
        <div className="pagina-detalhe">
            <Link to="/">← Voltar</Link>

            <h2>{chamado.titulo}</h2>
            <p>
                {chamado.status} · {chamado.prioridade}
            </p>

            <MensagemErro mensagem={erro} />

            <p>
                <strong>Descrição:</strong> {chamado.descricao}
            </p>
            <p>
                <strong>Tipo:</strong> {chamado.tipo}
            </p>
            <p>
                <strong>Local:</strong> {chamado.local}
            </p>
            <p>
                <strong>Aberto em:</strong> {chamado.data_abertura}
            </p>
            <p>
                <strong>Responsável:</strong> {chamado.responsavel || "-"}
            </p>
            <p>
                <strong>Solução:</strong> {chamado.solucao || "-"}
            </p>
            {chamado.data_resolucao && (
                <p>
                    <strong>Resolvido em:</strong> {chamado.data_resolucao}
                </p>
            )}

            <div className="acoes-chamado">
                {chamado.status !== "resolvido" && <Link to={"/editar/" + chamado.id}>Editar</Link>}
                <button onClick={aoExcluir}>Excluir</button>
            </div>

            {chamado.status === "aberto" && (
                <form className="formulario-etapa" onSubmit={aoIniciar}>
                    <h3>Iniciar atendimento</h3>
                    <CampoTexto rotulo="Responsável" valor={responsavel} aoAlterar={setResponsavel} />
                    <button type="submit">Iniciar</button>
                </form>
            )}

            {chamado.status === "em andamento" && (
                <form className="formulario-etapa" onSubmit={aoResolver}>
                    <h3>Resolver chamado</h3>
                    <CampoTexto rotulo="Solução" valor={solucao} aoAlterar={setSolucao} area={true} />
                    <button type="submit">Resolver</button>
                </form>
            )}
        </div>
    );
}