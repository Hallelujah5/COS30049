import React from "react";
import Hero from "./HomeComponent/Hero/Hero";
import Featured from "./HomeComponent/Featured/featured";
import Transparency from "./HomeComponent/Transparency/transparency";
import NFT from "./HomeComponent/NFT/nft";
import Testimony from "./HomeComponent/Testimonial/testimony";
import Footer from "../../components/Footer/footer";
import { motion } from "motion/react";

// Define animation variants for the fade-in effect
const fadeInVariant = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Homepage component
const Homepage = () => {
  return (
    <div>
      <Hero />
      <Featured />
      <motion.div
        variants={fadeInVariant}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Transparency />
      </motion.div>

      <motion.div
        variants={fadeInVariant}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <NFT />
      </motion.div>
      <motion.div
        variants={fadeInVariant}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Testimony />
      </motion.div>

      <Footer />
    </div>
  );
};

export default Homepage;
