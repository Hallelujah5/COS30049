import React from "react";
import logo from '../../images/navbar/xyora.png';
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3 mb-4">
            <a href="#"><img src={logo} alt="" /></a>
          </div>

          <div className="col-lg-3 mb-4 ">
            <h6 className="footer-heading teal bodytext roboto">Home</h6>
            <ul className="list-unstyled outfit-reg">
              <li><a href="/about">About</a></li>
              <li><a href="/market">Trading</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-3 mb-4">
            <h6 className="footer-heading roboto bodytext teal">Market</h6>
            <ul className="list-unstyled">
              <li><a href="/market">Browse NFTs</a></li>
              <li><a href="/market">Buy NFTs</a></li>
              <li><a href="/market">Sell NFTs</a></li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6 className="footer-heading roboto bodytext teal">Contact</h6>
            <ul className="list-unstyled">
              <li><a href="#">Email</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="newsletter-container mt-4">
          <h6 className="footer-heading roboto teal bodytext">Join our newsletter</h6>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Email Address"
              className="newsletter-input mx-2"
            />
            <button type="submit" className="newsletter-submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
