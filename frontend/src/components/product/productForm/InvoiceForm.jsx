import React, { useState } from "react";

const InvoiceForm = ({ product, onUpdate, onRemove }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleUpdate = () => {
    onUpdate({ id: product.id, name, price });
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleNameChange} />
      <input type="number" value={price} onChange={handlePriceChange} />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={() => onRemove(product.id)}>Remove</button>
    </div>
  );
};

export default InvoiceForm;
