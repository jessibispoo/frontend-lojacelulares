import React, { useEffect, useState } from "react";
import api from "../api/api";

interface Item { idProduto: string; nome: string; preco: number; quantidade: number; _id?: string; }

const Carrinho: React.FC = () => {
  const [itens, setItens] = useState<Item[]>([]);
  const idUsuario = localStorage.getItem("userId") || "demo"; // ajuste conforme auth

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    try {
      const res = await api.get(`/api/carrinho/${idUsuario}`);
      setItens(res.data.itens || []);
    } catch (err) { console.error(err); }
  };

  const remover = async (idProduto: string) => {
    try {
      await api.delete(`/api/carrinho/${idUsuario}/${idProduto}`);
      setItens(prev => prev.filter(i => i.idProduto !== idProduto));
    } catch (err) { console.error(err); }
  };
  // Calcula o total do carrinho
  const total = itens.reduce((s, it) => s + it.preco * (it.quantidade || 1), 0);

  return (
    <div style={{ padding: 16 }}>
      <h2>Carrinho</h2>
      <ul>
        {itens.map(it => (
          <li key={it.idProduto}>
            {it.nome} - R$ {it.preco.toFixed(2)} x {it.quantidade}
            <button onClick={() => remover(it.idProduto)} style={{ marginLeft: 8 }}>Remover</button>
          </li>
        ))}
      </ul>
      <hr />
      <h3>Total: R$ {total.toFixed(2)}</h3>
    </div>
  );
};

export default Carrinho;
