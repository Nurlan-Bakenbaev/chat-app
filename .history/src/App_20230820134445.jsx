import "./style.scss";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes><Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
