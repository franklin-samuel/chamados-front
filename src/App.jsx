import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Cabecalho from "./components/Cabecalho.jsx";
import MensagemErro from "./components/MensagemErro.jsx";
import PaginaInicial from "./pages/PaginaInicial.jsx";
import PaginaDetalhe from "./pages/PaginaDetalhe.jsx";
import PaginaFormulario from "./pages/PaginaFormulario.jsx";
import { buscarEu } from "./services/chamadoService";

function App() {
    const [nome, setNome] = useState("");
    const [erroUsuario, setErroUsuario] = useState("");

    useEffect(function () {
        carregarUsuario();
    }, []);

    async function carregarUsuario() {
        try {
            const dados = await buscarEu();
            setNome(dados.nome);
        } catch (e) {
            setErroUsuario("Não foi possível carregar seus dados. Verifique sua chave.");
        }
    }

    return (
        <div className="app">
            <Cabecalho nome={nome} />

            <MensagemErro mensagem={erroUsuario} />

            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/chamado/:id" element={<PaginaDetalhe />} />
                <Route path="/novo" element={<PaginaFormulario />} />
                <Route path="/editar/:id" element={<PaginaFormulario />} />
            </Routes>
        </div>
    );
}

export default App;
