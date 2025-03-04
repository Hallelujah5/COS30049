import React from "react";
import LiveBidding from "./MarketComponent/LiveBidding";
import Newest from "./MarketComponent/Newest";
import CreateNFT from "./MarketComponent/CreateNFT";
import Footer from "../../components/Footer/footer";
import { motion } from "motion/react";

const fadeInVariant = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Market = () => {
  return (
    <div>
      <motion.div
        variants={fadeInVariant}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <LiveBidding />
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
