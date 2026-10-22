import CampoTexto from "./CampoTexto";
import CampoSelecao from "./CampoSelecao";

export default function FiltroChamados(props) {
    return (
        <div className="filtros">
            <CampoTexto
                rotulo="Buscar por título ou descrição"
                valor={props.busca}
                aoAlterar={props.aoAlterarBusca}
            />
            <CampoSelecao
                rotulo="Status"
                valor={props.status}
                opcoes={props.statusDisponiveis}
                aoAlterar={props.aoAlterarStatus}
            />
            <CampoSelecao
                rotulo="Tipo"
                valor={props.tipo}
                opcoes={props.tipos}
                aoAlterar={props.aoAlterarTipo}
            />
            <CampoSelecao
                rotulo="Local"
                valor={props.local}
                opcoes={props.locais}
                aoAlterar={props.aoAlterarLocal}
            />
            <CampoSelecao
                rotulo="Prioridade"
                valor={props.prioridade}
                opcoes={props.prioridades}
                aoAlterar={props.aoAlterarPrioridade}
            />
        </div>
    );
}