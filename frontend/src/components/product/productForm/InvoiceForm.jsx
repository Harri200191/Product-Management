import React, { useState } from "react";
import "./productForm.scss";

const InvoiceForm = ({ product, onUpdate, onRemove }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setquantity] = useState(product.name); 

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleQuanityChange= (e) => {
    setquantity(e.target.value);
  };

  const handleUpdate = () => {
    onUpdate({ id: product.id, name, price, quantity });
  };

  return (
    <div> 
          <input
            className="field"
            type="text"
            placeholder="Product name"
            name="name"
            value={name} onChange={handleNameChange}
          />
 
          <input
            className="field"
            type="text"
            placeholder="Product Price"
            name="price"
            value={price} onChange={handlePriceChange}
          />
 
          <input
            className="field"
            type="number"
            placeholder="Product Quantity"
            name="quantity"
            value={quantity} onChange={handleQuanityChange}
          />
 
      <button className = "finalbtn" onClick={handleUpdate}>Update</button>
      <button className = "finalbtn" onClick={() => onRemove(product.id)}>Remove</button>
    </div>
  );
};

export default InvoiceForm;
