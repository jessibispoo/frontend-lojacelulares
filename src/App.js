import { useEffect } from "react";
import api from "./api";

function App() {
  useEffect(() => {
    api.get("/produtos")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return <h1>Frontend conectado!</h1>;
}

export default App;
