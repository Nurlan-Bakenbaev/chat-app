import "./style.scss";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return( 
<BrowserRouter>
<Routes>
 <Route path="/">
  <Route element={/>
 </Route>
</Routes>
</BrowserRouter>)
}

export default App;
