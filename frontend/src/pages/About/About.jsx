import React from "react";
import AboutUs from "./AboutComponent/AboutUs";
import Collection from "./AboutComponent/Collection";
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

const About = () => {
  return (
    <>
      <motion.div
        variants={fadeInVariant}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{once:true}}
      >
        <AboutUs />
      </motion.div>
      <br />
      <br />

      <motion.div
        variants={fadeInVariant}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{once:true}}
      >
      <Collection />
      </motion.div>
      <Footer />
    </>
  );
};

export default About;
