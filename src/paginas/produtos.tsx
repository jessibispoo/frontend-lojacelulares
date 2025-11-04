import { useState, useEffect } from "react";
import axios from "axios";

interface Produto {
  _id: string;
  nome: string;
  categoria: string;
  preco: number;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");

  // busca os produtos quando o campo de busca muda
  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await axios.get(`/api/produtos/buscar?q=${busca}`);
        setProdutos(response.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };
    buscarProdutos();
  }, [busca]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Lista de Produtos</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar por nome ou categoria..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
      />

      {/* Exibe os produtos filtrados */}
      <ul className="space-y-2">
        {produtos.map((produto) => (
          <li
            key={produto._id}
            className="border p-3 rounded-md shadow-sm hover:shadow-md transition"
          >
            <strong>{produto.nome}</strong> — {produto.categoria}  
            <span className="block text-sm text-gray-600">R$ {produto.preco}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
//parte ana luiza