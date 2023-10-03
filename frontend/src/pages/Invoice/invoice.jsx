import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceForm from "../../components/product/productForm/InvoiceForm";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Card from "../../components/card/Card";

import "./Invoice.scss"

const Invoice = () => {
  const [products, setProducts] = useState([]);
  const [pdfData, setPdfData] = useState(null);

  const addProduct = () => {
    const newProduct = { id: Date.now(), name: "", price: 0 };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const removeProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const generatePdf = () => {
    const pdfContent = (
      <Document>
        <Page size="A4">
          <View style={styles.container}>
            <Text style={styles.title}>Product Summary</Text>
            {products.map((product) => (
              <View key={product.id} style={styles.product}>
                <Text>{product.name}</Text>
                <Text>${product.price}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
    setPdfData(pdfContent);
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    product: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
  });

  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <h2>Invoice Form</h2>
        <button className= "btn" onClick={addProduct}>Add Product</button>
        {products.map((product) => (
          <InvoiceForm
            key={product.id}
            product={product}
            onUpdate={updateProduct}
            onRemove={removeProduct}
          />
        ))}
        <br/>
        <button className= "btn2" onClick={generatePdf}>Generate PDF</button>
        {pdfData && (
          <PDFDownloadLink document={pdfData} fileName="product_summary.pdf">
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Download PDF"
            }
          </PDFDownloadLink>
        )}
        </Card>
      </div>
  );
};

export default Invoice;
