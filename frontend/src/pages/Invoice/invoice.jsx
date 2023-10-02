import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/productForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/products/productSlice";
import InvoiceForm from "../../components/product/productForm/InvoiceForm";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

const Invoice = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");
  
    const isLoading = useSelector(selectIsLoading);
  
    const { name, category, price, quantity } = product;
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    };
  
  
    const saveProduct = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("quantity", Number(quantity));
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", productImage);
    };
  
    return (
      <div className="custom-lay">
        {isLoading && <Loader />}
        <h3 className="--mt">Generate New Invoice</h3>
        <InvoiceForm
          product={product} 
          handleInputChange={handleInputChange} 
          saveProduct={saveProduct} 
        />
      </div>
    );
}

export default Invoice