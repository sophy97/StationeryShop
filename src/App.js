import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import Intro from "./page/Intro";
import Home from "./page/Home";
import Shop from "./page/Shop";
import ShopDetail from "./page/ShopDetail";
import LoginForm from "./components/Login/LoginForm";
import Mypage from "./page/Mypage";
import Container from "./components/UI/Container";
import Footer from "./components/Layout/Footer";
import { CartProvider } from "./components/Cart/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Intro />
        <Container>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
          </Routes>
        </Container>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
