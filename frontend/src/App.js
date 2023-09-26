import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import { getLoginStatus } from "./services/authservice";
import { SET_LOGIN } from "./redux/features/auth/authslice";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";


// Test Password for zain: zain@12345678
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/resetpassword/:resetToken" element={<Reset/>} />

        <Route path="/dashboard" element={
          <Sidebar>
            <Layout>
              <Dashboard/>
            </Layout>
          </Sidebar>
        }/>

        <Route path="/add-product" element={
          <Sidebar>
            <Layout>
              <AddProduct/>
            </Layout>
          </Sidebar>
        }/>

        <Route path="/product-detail/:id" element={
          <Sidebar>
            <Layout>
              <ProductDetail/>
            </Layout>
          </Sidebar>
        }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
