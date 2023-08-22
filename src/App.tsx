import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
