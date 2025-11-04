export const API_URL = "https://backend-lojacelulares.onrender.com";

// exemplo de fetch
export async function getProdutos() {
    const res = await fetch(`${API_URL}/api/produtos`);
    return res.json();
}
