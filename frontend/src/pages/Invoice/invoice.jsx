import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceForm from "../../components/product/productForm/InvoiceForm";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Card from "../../components/card/Card";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authslice";
import { getUser } from "../../services/authservice";

import "./Invoice.scss"

const Invoice = () => {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser(); 

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  const [products, setProducts] = useState([]);
  const [pdfData, setPdfData] = useState(null);

  const addProduct = () => {
    const newProduct = { id: Date.now(), name: "", price: null, quantity: null };
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
    const currentDate = new Date().toLocaleDateString();
    const companyName = profile?.name;
    const companyContact = "+"+ profile?.phone;
  
    const pdfContent = (
      <Document>
        <Page size="A4">
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.companyName}>{companyName}</Text> 
            <Text>{companyContact}</Text>
          </View>
  
          {/* Invoice Title */}
          <Text style={styles.title}>Invoice</Text>
  
          {/* Invoice Items */}
          <View style={styles.itemsContainer}>
            <View style={styles.itemHeader}>
              <Text>Product Name</Text>
              <Text>Quantity</Text>
              <Text>Price</Text>
            </View>
            {products.map((product) => (
              <View key={product.id} style={styles.item}>
                <Text>{product.name}</Text>
                <Text>{product.quantity}</Text>  
                <Text>Rs{product.price}</Text>
              </View>
            ))}
          </View>
  
          {/* Total */}
          <View style={styles.totalContainer}>
            <Text>Total:</Text>
            <Text>Rs{calculateTotal()}</Text>
          </View>
  
          {/* Footer */}
          <View style={styles.footer}>
            <Text>Date: {currentDate}</Text> 
          </View>
        </Page>
      </Document>
    );
  
    setPdfData(pdfContent);
  };
  
  const calculateTotal = () => {
    const total = products.reduce((acc, product) => acc + product.price, 0);
    return total.toFixed(2);
  };
  
  const styles = StyleSheet.create({
    header: {
      padding: 10,
      backgroundColor: "#0074D9",
      color: "#fff",
      marginBottom: 10,
      textAlign: "center",
    },
    companyName: {
      fontSize: 28,
      fontWeight: "bold",
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: "center",
    },
    itemsContainer: {
      padding: 10,
      marginBottom: 10,
    },
    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#f2f2f2",
      padding: 10,
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
    totalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderTop: 1,
      padding: 10,
    },
    footer: {
      padding: 10,
      marginTop: 10,
      textAlign: "right",
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
          <PDFDownloadLink document={pdfData} fileName="Invoice.pdf">
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
