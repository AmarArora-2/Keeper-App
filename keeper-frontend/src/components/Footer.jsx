import React from "react";
import "../CSS/Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p>
        Copyright © {year} Keeper App. Built with{" "}
        <span className="heart">❤️</span> using PERN Stack
      </p>
    </footer>
  );
}

export default Footer;
