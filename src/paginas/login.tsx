import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, senha });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("tipo", res.data.tipo);
      navigate("/"); // ou rota desejada
    } catch {
      setErro("E-mail ou senha inválidos");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>E-mail</label><br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Senha</label><br />
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <button style={{ marginTop: 12 }} type="submit">Entrar</button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
};

export default Login;
