import React, { useEffect } from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import Chat from "../../components/chatbot/Chat";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import { getProducts } from "../../redux/features/products/productSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authslice";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <h2 className="temp">Dashboard</h2>
      <hr/>
      <Chat />
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>

  );
};

export default Dashboard;