export const API_URL = "https://backend-lojacelulares.onrender.com";

// exemplo de fetch
export async function getProdutos() {
    const res = await fetch(`${API_URL}/api/produtos`);
    return res.json();
}


import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-lojacelulares.onrender.com", // 🔗 o link do seu backend no Render
});

export default api;

