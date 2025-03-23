import React, { useState } from "react";
import api from "../../../api";

const ListingPopup = ({
  image,
  nftName,
  cid,
  tokenId,
  nft_id,
  onClose,
  onSubmit,
}) => {
  const [listingType, setListingType] = useState("list");
  const [startingPrice, setStartingPrice] = useState(""); // Renamed for clarity

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tokenId) {
      alert("No token ID available. Please mint an NFT first.");
      return;
    }

    const parsedPrice = parseFloat(startingPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert("Please enter a valid price greater than 0.");
      return;
    }

    // Update NFT status and price in the backend
    const formData = new FormData();
    formData.append("nft_status", listingType);
    formData.append("current_price", parsedPrice);
    formData.append("nft_id", nft_id);

    try {
      const response = await api.post("/update-nft", formData);
      if (response.data.success) {
        console.log("Successfully updated NFT row:", response.data.nft_status);
      } else {
        console.log("Error updating row.");
      }
    } catch (error) {
      console.error("Error updating NFT:", error.message);
    }

    // Prepare listing data for parent component
    const listingData = {
      nftName,
      listingType,
      price: startingPrice, // Pass as price for consistency with parent
      startingPrice, // Explicitly for auction
      cid,
      tokenId,
    };
    await onSubmit(listingData); // Call parent handler (triggers startAuction)
  };

  const buttonText = listingType === "list" ? "List NFT" : "Start NFT Auction";

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
            <button type="button" className="close-btn btn" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row align-items-center">
              <div className="col-md-4 text-center">
                {image && (
                  <img
                    src={image}
                    alt="NFT Preview"
                    className="popup-img img-fluid"
                  />
                )}
              </div>
              <div className="col-md-8">
                <h5 className="mt-3">
                  NFT Name: <span className="fw-bold">{nftName}</span>
                </h5>
                <p>
                  <strong>Token ID:</strong> {tokenId}
                </p>
                <br />
                <label className="form-label">Listing Type:</label>
                <div>
                  <input
                    type="radio"
                    id="list"
                    name="listingType"
                    value="list"
                    checked={listingType === "list"}
                    onChange={() => setListingType("list")}
                  />
                  <label htmlFor="list" className="ms-2">
                    List on Market
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
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    {listingType === "list"
                      ? "Price (ETH):"
                      : "Starting Price (ETH):"}
                  </label>
                  <input
                    type="text"
                    id="price"
                    className="form-control"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
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
