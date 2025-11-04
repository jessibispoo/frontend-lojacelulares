const API_URL = "https://backend-lojacelulares.onrender.com";

useEffect(() => {
    fetch(`${API_URL}/api/produtos`)
        .then(res => res.json())
        .then(data => setProdutos(data));
}, []);
