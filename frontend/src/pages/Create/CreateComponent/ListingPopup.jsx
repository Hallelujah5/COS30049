import React, { useState } from "react";
import { useMarketplace } from "../../../context/MarketplaceContext"; // For listing
import { useAuction } from "../../../context/AuctionContext"; // For auction

const ListingPopup = ({ image, nftName, cid, tokenId, onClose, onSubmit }) => {
  const [listingType, setListingType] = useState("sell");
  const [price, setPrice] = useState(""); // Sell price
  const [startingPrice, setStartingPrice] = useState(""); // Auction starting price

  const { listNFT } = useMarketplace();
  const { startAuction } = useAuction();

  // Handle submit for Sell or Auction
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tokenId) {
      alert("No token ID available. Please mint an NFT first.");
      return;
    }

    if (listingType === "sell") {
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        alert("Please enter a valid price greater than 0.");
        return;
      }

      const listingData = {
        nftName,
        listingType: "sell",
        price: price,
        cid: cid,
        tokenId: tokenId,
      };

      await onSubmit(listingData); // Call the parent handler
    } else if (listingType === "auction") {
      const parsedStartingPrice = parseFloat(startingPrice);
      if (isNaN(parsedStartingPrice) || parsedStartingPrice <= 0) {
        alert("Please enter a valid starting price greater than 0.");
        return;
      }

      const listingData = {
        nftName,
        listingType: "auction",
        startingPrice: startingPrice,
        cid: cid,
        tokenId: tokenId,
      };

      await onSubmit(listingData); // Call the parent handler
    }
  };

  // Update button text based on listing type
  const buttonText = listingType === "sell" ? "List NFT" : "Start NFT Auction";

  return (
    <div
      className="modal custom fade show outfit"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
      aria-hidden="false"
    >
      <div className="modal-dialog modal-lg" role="document">
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
              <div className="col-md-4 text-center">
                {image && (
                  <img
                    src={image}
                    alt="NFT Preview"
                    className="popup-img img-fluid"
                  />
                )}
              </div>

              {/* NFT Details */}
              <div className="col-md-8">
                <h5 className="mt-3">
                  NFT Name: <span className="fw-bold"> {nftName}</span>
                </h5>
                <p>
                  <strong>Token ID:</strong> {tokenId}
                </p>{" "}
                {/* Display tokenId */}
                <br />
                {/* Select listing type */}
                <label className="form-label">Listing Type:</label>
                <div>
                  <input
                    type="radio"
                    id="sell"
                    name="listingType"
                    value="sell"
                    checked={listingType === "sell"}
                    onChange={() => setListingType("sell")}
                  />
                  <label htmlFor="sell" className="ms-2">
                    Sell
                  </label>

                  <input
                    type="radio"
                    id="auction"
                    name="listingType"
                    value="auction"
                    checked={listingType === "auction"}
                    onChange={() => setListingType("auction")}
                    className="ms-4"
                  />
                  <label htmlFor="auction" className="ms-2">
                    Auction
                  </label>
                </div>
                <br />
                {/* Input for Sell */}
                {listingType === "sell" && (
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price (ETH):
                    </label>
                    <input
                      type="text"
                      id="price"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                )}
                {/* Input for Auction */}
                {listingType === "auction" && (
                  <div className="mb-3">
                    <label htmlFor="starting_price" className="form-label">
                      Starting Price (ETH):
                    </label>
                    <input
                      type="text"
                      id="starting_price"
                      className="form-control"
                      value={startingPrice}
                      onChange={(e) => setStartingPrice(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-create"
              onClick={handleSubmit}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPopup;
