//Item component for Newest section


import React from "react";
import PropTypes from "prop-types";
import Heart from "../../../components/heart";

const CheckmarkItem = ({ name, image, checkmark, address, onClick }) => {
  return (
    <div
      className="col-12 col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center mb-3"


    >
      <div className="shadow-lg card-layout"
      onClick={onClick}
      style={{ cursor: "pointer" }}>
        <div className="text-center">
          <img
            src={image}
            alt={name}
            className="img-fluid" /* Ensures responsive image scaling */
          />
        </div>
        <div className="item-descript">
          <div className="d-flex">
            <h5 className="outfit">{name}&nbsp;&nbsp;
            <img src={checkmark} alt="checkmark" style={{ maxWidth: '14%' }} />    
            </h5>
            
          </div>
          <div className="d-flex">
            <p className="bodytext gray mb-2"><br />Total volume</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="outfit mb-0">
              {address}
            </p>
            <Heart />
          </div>
        </div>
      </div>
    </div>
  );
};

CheckmarkItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  checkmark: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CheckmarkItem.defaultProps = {
  onClick: () => {},
};

export default CheckmarkItem;
