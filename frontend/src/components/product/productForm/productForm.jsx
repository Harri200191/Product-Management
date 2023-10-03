import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import { FiX } from 'react-icons/fi';
import Sound from '../../sound/Sound'; // Import the HOC
import useSound from 'use-sound';

import "./productForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  handleClearImage,
}) => {
  const soundFile = 'C:\\Users\\haris\\WEB DEV\\Product-Management\\frontend\\src\\assets\\buttonsound.mp3'; // Replace with your sound file path

  // Create a button component
  const MyButton = () => (
    <button type="submit" className="--mybtnnew" >
      Save Product
    </button>
  );

  const FanfareButton = () => {
    const [play, { stop }] = useSound(soundFile);
  }

  const ButtonWithSound = Sound(MyButton, soundFile);
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              id="image-input"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview ? (
                <div className="image-container">
                    <img src={imagePreview} alt="Product" />
                    <button className="clear-button" onClick={handleClearImage}>
                    <FiX /> Clear
                    </button>
                </div>
                ) : (
                <p>No image selected</p>
                )}


          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Product Category:</label>
          <input
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />

          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label className="custom">Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <ButtonWithSound />
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;