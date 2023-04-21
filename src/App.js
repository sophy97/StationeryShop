import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./page/Home";
import Shop from "./page/Shop";
import ShopDetail from "./page/ShopDetail";
import LoginForm from "./components/Login/LoginForm";
import Error from "./page/Error";
import Container from "./components/UI/Container";
import Footer from "./components/Layout/Footer";
import { CartProvider } from "./components/Cart/CartContext";

function App() {
  return (
    <div>
      <CartProvider>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </Container>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
