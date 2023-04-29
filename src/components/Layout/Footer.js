import React from "react";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={classes.footer}>
      <p style={{fontSize:"13px"}}>https://sophy97.github.io/StationeryShop</p>
      <h3>&copy; Stationery Station | 2023</h3>
    </div>
  );
};

export default Footer;
