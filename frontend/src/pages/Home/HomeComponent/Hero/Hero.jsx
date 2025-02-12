import React from "react";
import heroimg from "../../../../assets/images/hero/Hero-img.png";
import "./hero.css";
import {motion} from "motion/react"
const Hero = () => {
  return (
    <motion.div className="container col-xxl-8 px-4 py-5 text-white"  initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 1,
      delay: 0.1,
      ease: [0, 0.1, 0.2, 1.01],
  }}
    >
      <div className="row flex-wrap flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src={heroimg}
            className="d-block mx-lg-auto image-container"
            alt=""
            width="700"
            height="500"
            loading="lazy"
          ></img>
        </div>
        <div className="col-lg-6">
          <h1
            id="hero-trade"
            className="display-5 fw-bold lh-1 mb-3 outfit-bold"
          >
            Trade Smarter, Trade Decentrialized
          </h1>
          <p className="herotext">
            Seamlessly access the future of trading with our blockchain-powered
            platform, designed for ultimate security and efficiency.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              id="buyNFT"
              type="button"
              className="btn btn-purple NFT outfit-bold subheading-text"
            >
              BUY NFTS
            </button>
            <button
              id="sellNFT"
              type="button"
              className="btn btn-outline-secondary NFT outfit subheading-text"
            >
              SELL NFTS
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
