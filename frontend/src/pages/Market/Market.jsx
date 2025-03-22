import React from "react";
import LiveBidding from "./MarketComponent/LiveBidding";
import Newest from "./MarketComponent/Newest";
import CreateNFT from "./MarketComponent/CreateNFT";
import Footer from "../../components/Footer/footer";
import Auction from "./MarketComponent/Auction"
import { motion } from "motion/react";

import OfferPopup from "./OfferPopup"; 
import { useState } from "react";

const fadeInVariant = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Market = () => {
  const [showPopup, setShowPopup] = useState(false); //consts for the popup
  const nftData = {
    nft: { current_price: 0.5 },
    image: "https://picsum.photos/200",
    name: "Sample NFT",
    owner: "Sample Owner",
  };

  return (
    <div>
      <motion.div
        variants={fadeInVariant}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <LiveBidding />

        <button
          className="btn btn-create"
          onClick={(e) => {
            e.preventDefault();
            setShowPopup(true); //show popup when this button is clicked
          }}
        >
          Make Offer
        </button>

        {showPopup && (
          <OfferPopup nftData={nftData} onClose={() => setShowPopup(false)} />
        )}
      </motion.div>

      <motion.div
        variants={fadeInVariant}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Auction />
      </motion.div>


      <motion.div
        variants={fadeInVariant}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Newest />
      </motion.div>


      <motion.div
        variants={fadeInVariant}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <CreateNFT />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Market;
