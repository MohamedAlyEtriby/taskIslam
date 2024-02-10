import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout/Index";
import MedicalSupplies from "./Pages/Medical/MedicalSupplies";
import ProductDetailsPage from "./Pages/ProductDetail/ProductDetailsPage";
import Personal from "./Pages/Personal/Personal";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Pages/Register/Register";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { auth } = useSelector((state) => state.auth);
  
  
  return (
    <div className="">
      <ToastContainer theme="dark" />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Medical" element={<MedicalSupplies />} />
          <Route path="/ProductDetails/:id" element={<ProductDetailsPage />} />
          <Route path="/Personal" element={<Personal />} />
          <Route path="/Cart" element={<Cart />} />
          {auth === null && (
            <>
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </>
          )}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
