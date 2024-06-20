import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Painel from "./pages/Painel";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/painel" element={<Painel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
