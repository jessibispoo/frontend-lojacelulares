import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

interface Usuario { _id: string; nome: string; email: string; tipo: string; }

const AdminUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tipo = localStorage.getItem("tipo");
    if (tipo !== "ADMIN") {
      navigate("/"); // redireciona se não for admin
      return;
    }
    carregar();
  }, [navigate]);

  const carregar = async () => {
    try {
      const res = await api.get("/api/usuarios");
      setUsuarios(res.data);
    } catch (err: any) {
      setErro(err.response?.data?.message || "Erro ao carregar usuários");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Usuários cadastrados</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nome</th><th>E-mail</th><th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u._id}>
              <td>{u.nome}</td><td>{u.email}</td><td>{u.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsuarios;
