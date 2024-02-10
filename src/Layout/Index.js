import React from "react";
import NavBar from "./Nav/NavBar";
import Footer from "./Footer/Footer";
import NavHeader from "./Nav/NavHeader";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <NavHeader />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
