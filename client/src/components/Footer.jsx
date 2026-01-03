import React from "react";
import {
  FaStethoscope,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaFacebookMessenger,
  FaHeadphones,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer
        style={{
          backgroundColor: "#0B3558",
          color: "white",
          padding: "1rem 0",
          marginTop: "0",
          fontSize: "0.98rem",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <li>
              <a href="#" style={{ textDecoration: "none", color: "white" }}>
                About
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: "none", color: "white" }}>
                Products
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: "none", color: "white" }}>
                Contact
              </a>
            </li>
          </ul>
          <div style={{ marginTop: "0.7rem", fontSize: "0.92rem" }}>
            &copy; {new Date().getFullYear()} SeaSure. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;