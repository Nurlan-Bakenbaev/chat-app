import "./style.scss";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";

function App() {

  const {currentUser}= useContext(AuthContext)

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to='/'/>
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
