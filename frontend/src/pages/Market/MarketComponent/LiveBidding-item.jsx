//========================================================
//=========ITEM COMPONENT FOR LIVEBIDDING SECTION=========
//========================================================

import React from "react";
import PropTypes from "prop-types";
import Heart from "../../../components/heart";
import {motion} from "motion/react"

const BiddingItem = ({ name, image, text, onClick }) => {
  return (
    <motion.div whileHover={{scale:1.03}}
      className="col-sm-12 col-md-4 col-lg-3   d-flex justify-content-center mb-3"

    >
      <div className="text-center shadow-lg card-layout"
      onClick={onClick}
      style={{ cursor: "pointer" }}>
        <img
          src={image}
          alt={name}
          className="img-fluid" /* Ensures responsive image scaling */
        />
        <div className="item-descript">
          <div className="d-flex justify-content-between">
            <h5 className="outfit">{name}</h5>
            
          </div>
          <div className="d-flex">
            <p className="bodytext gray mb-2">{text}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ color: "#00B7FF" }} className="mb-0">
            BongBearDestroyer
            </p>
            <Heart />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

BiddingItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

BiddingItem.defaultProps = {
  onClick: () => {},
};

export default BiddingItem;
