import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Chat from "../chatbot/Chat";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh" }} className="--pad">
        {children}
      </div>
      <Chat />
      <Footer />
    </>
  );
};

export default Layout;