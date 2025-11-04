import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login", { email, senha });

            const { token, tipo } = response.data;

            // Armazena no localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("tipo", tipo);

            onLogin(tipo);
        } catch (err) {
            setErro("Credenciais inválidas");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
        </div>
    );
}

export default Login;
//parte ana luiza