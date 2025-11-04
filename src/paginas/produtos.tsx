import React, { useEffect, useState } from "react";
import api from "../api/api";

interface Produto { _id: string; nome: string; categoria: string; preco: number; }

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      buscar(busca);
    }, 300); // debounce simples
    return () => clearTimeout(delayFetch);
  }, [busca]);

  const buscar = async (q = "") => {
    try {
      const res = await api.get(`/api/produtos/buscar?q=${encodeURIComponent(q)}`);
      setProdutos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { buscar(); }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Produtos</h2>
      <input placeholder="Buscar por nome ou categoria" value={busca} onChange={(e) => setBusca(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 12 }} />
      <ul>
        {produtos.map(p => (
          <li key={p._id}>
            <strong>{p.nome}</strong> — {p.categoria} — R$ {p.preco}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produtos;
