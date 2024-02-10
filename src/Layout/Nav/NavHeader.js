import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavHeader.css";

const NavHeader = () => {
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const navLinks = [
    { text: "Home", to: "/" },
    { text: "Medical Supplies", to: "/Medical" },
    { text: "Personal Care", to: "/Personal" },
    { text: "Offers", to: "/offers" },
    { text: "Treatment", to: "/treatment" },
  ];


  return (
    <div
      style={{ minHeight: "4.9rem", width: "100%" }}
      className="flex-cen navHead"
    >
      {navLinks.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className={activeLink === link.to ? "active1" : ""}
          onClick={() => {
            setActiveLink(link.to);
          }}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
};

export default NavHeader;
