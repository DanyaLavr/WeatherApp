import React from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import "../style/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="/public/favicon.ico" alt="" />
      </div>
      <div className="footer-address">
        <h4 className="footer-address-text">Address</h4>
        <p className="footer-address-text">Svobody str. 35</p>
        <p className="footer-address-text">Kyiv</p>
        <p className="footer-address-text">Ukraine</p>
      </div>
      <div className="footer-contact">
        <h4>Contact us</h4>
        <div className="footer-icons">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram size={35} color="#e1306c" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook size={35} color="#1877f2" />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
            <FaWhatsapp size={35} color="#25d366" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
