import React, { useEffect, useState } from "react";
import api from "./services/api";

interface Item {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
}

const App: React.FC = () => {
  const [carrinho, setCarrinho] = useState<Item[]>([]);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");

  const carregarCarrinho = async (termo?: string) => {
    try {
      const res = await api.get("/carrinho", {
        params: { busca: termo || "" },
      });
      setCarrinho(res.data);
    } catch {
      setErro("Erro ao carregar carrinho");
    }
  };

  const removerItem = async (id: number) => {
    try {
      await api.delete(`/carrinho/${id}`);
      setCarrinho(carrinho.filter((item) => item.id !== id));
    } catch {
      setErro("Erro ao remover item");
    }
  };

  // Carrega inicialmente todos os itens
  useEffect(() => {
    carregarCarrinho();
  }, []);

  // Atualiza a lista ao digitar no campo de busca
  useEffect(() => {
    const delay = setTimeout(() => {
      carregarCarrinho(busca);
    }, 400);

    return () => clearTimeout(delay);
  }, [busca]);

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>🛒 Carrinho</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar por nome ou categoria..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {carrinho.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
          }}
        >
          <div>
            <strong>{item.nome}</strong>
            <p style={{ margin: 0, fontSize: "0.9em", color: "#555" }}>
              Categoria: {item.categoria}
            </p>
            <p style={{ margin: 0 }}>R$ {item.preco}</p>
          </div>

          <button
            onClick={() => removerItem(item.id)}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Remover
          </button>
        </div>
      ))}

      {carrinho.length === 0 && <p>Carrinho vazio 🛍️</p>}
    </div>
  );
};

export default App;
//parte ana luiza - A4
