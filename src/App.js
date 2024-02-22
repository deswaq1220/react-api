import { Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import { BRAND_PAGE, CART_PAGE, MAIN_PAGE, PRODUCT_PAGE, SIGNUP_PAGE } from "./constants/Components_constants";
import MainPage from "./pages/MainPage";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUpPage";
import Login from "./components/Login/Login";
import ProductPage from "./pages/ProductPage";
import BrandsPage from "./pages/BrandsPage";
import BasketPage from "./pages/BasketPage";


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  const isLoginOpen = useSelector((state) => state.modal.isLoginOpen);
  return (
    <>
      {isLoginOpen && <Login />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={SIGNUP_PAGE} element={<SignUpPage />} />
          <Route path={`${PRODUCT_PAGE}/:productId`} element={<ProductPage />} />``
          <Route path={`${BRAND_PAGE}/:brandId`} element={<BrandsPage />} />
          <Route path={`${CART_PAGE}`} element={<BasketPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
