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
  }
}

export default AdminUsuarios;
