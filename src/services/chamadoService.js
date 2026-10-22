import api from "./api";

export async function buscarEu() {
    const resposta = await api.get("/eu");
    return resposta.data;
}

export async function listarChamados(filtros) {
    const parametros = {};

    if (filtros.busca) {
        parametros.busca = filtros.busca;
    }
    if (filtros.status) {
        parametros.status = filtros.status;
    }
    if (filtros.tipo) {
        parametros.tipo = filtros.tipo;
    }
    if (filtros.local) {
        parametros.local = filtros.local;
    }
    if (filtros.prioridade) {
        parametros.prioridade = filtros.prioridade;
    }

    const resposta = await api.get("/chamados", { params: parametros });
    return resposta.data;
}

export async function buscarChamado(id) {
    const resposta = await api.get("/chamados/" + id);
    return resposta.data;
}

export async function abrirChamado(chamado) {
    const resposta = await api.post("/chamados", chamado);
    return resposta.data;
}

export async function editarChamado(id, chamado) {
    const resposta = await api.put("/chamados/" + id, chamado);
    return resposta.data;
}

export async function iniciarAtendimento(id, responsavel) {
    const resposta = await api.patch("/chamados/" + id + "/iniciar", {
        responsavel: responsavel,
    });
    return resposta.data;
}

export async function resolverChamado(id, solucao) {
    const resposta = await api.patch("/chamados/" + id + "/resolver", {
        solucao: solucao,
    });
    return resposta.data;
}

export async function excluirChamado(id) {
    await api.delete("/chamados/" + id);
}

export async function listarTipos() {
    const resposta = await api.get("/tipos");
    return resposta.data;
}

export async function listarLocais() {
    const resposta = await api.get("/locais");
    return resposta.data;
}

export async function listarPrioridades() {
    const resposta = await api.get("/prioridades");
    return resposta.data;
}