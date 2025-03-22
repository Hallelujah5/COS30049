import React, { useState } from "react";
import "./offerPopup.css";

const OfferPopup = ({ onClose, nftData }) => {
  const [current_price, setPrice] = useState("");
  const usdPrice = current_price ? (current_price * 1944.6).toFixed(2) : "--";

  return (
    <div
      className="modal custom fade show outfit"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
      aria-hidden="false"
    >
      <div className="modal-dialog custom-size" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title mb-0">Make an Offer</h5>
            <button
              type="button"
              className="close-btn btn"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="row align-items-center">
              {/* NFT Image */}
              <div className="col-12 col-md-3 text-center">
                <img
                  src={nftData.image}
                  alt="NFT Preview"
                  className="popup-img rounded"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>

              {/* NFT Details and Owner */}
              <div className="col-12 col-md-9 d-flex justify-content-between align-items-center">
                <div>
                  {/* NFT Details */}
                  <h5 className="mt-3">{nftData.name || "NFT Name"}</h5>
                  <p>Owner: {nftData.owner || "Unknown"}</p>
                </div>

                {/* Price and USD */}
                <div className="text-end">
                  <h5 className="mt-3">{current_price || "--"} ETH</h5>
                  <p>${usdPrice}</p>
                </div>
              </div>
            </div>

            {/* Input for Offer */}
            <div className="mt-4 offer-input">
              <label htmlFor="current_price" className="form-label">
                Enter Offer Amount (ETH):
              </label>

              <div className="input-group">
                <input
                  type="number"
                  id="current_price"
                  className="form-control"
                  value={current_price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                />
                <span className="input-group-text txt-input">ETH</span>
              </div>

              {current_price && (
                <p className="text-end mt-2">
                  Total offer amount: {current_price || "--"} ETH
                </p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <div className="modal-footer">
            <button type="button" className="btn btn-offer">
              Make Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;
