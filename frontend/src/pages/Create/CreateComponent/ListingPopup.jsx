import React, { useState } from "react";
import api from "../../../api"
import { useMarketplace } from "../../../context/MarketplaceContext"; // For listing
import { useAuction } from "../../../context/AuctionContext"; // For auction


const ListingPopup = ({ image, nftName, cid, tokenId, nft_id, onClose, onSubmit }) => {  
  const [listingType, setListingType] = useState("list");
  const [price, setPrice] = useState(""); // Sell price
  // const { listNFT } = useMarketplace();
  // const { startAuction } = useAuction();

  
  // Handle submit for Sell or Auction
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tokenId) {
      alert("No token ID available. Please mint an NFT first.");
      return;
    }
    
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert("Please enter a valid price greater than 0.");
      return;
    }


    //FORM DATA TO UPDATE NFT PRICE AND STATUS
    const formData = new FormData();
    formData.append("nft_status", listingType);
    formData.append("current_price", parsedPrice);
    formData.append("nft_id", nft_id);
    try {
      const response = await api.post("/update-nft", formData); //CALLING /UPDATE-NFT FROM MAIN.PY
      if (response.data.success) {
        console.log("Successully updated NFT row.", response.data.nft_status);
        alert(
          `NFT "${nftName}" price updated and listed successfully with CID: ${cid}!`
        );
      } else {
        console.log("Error updating row.");
      }
    } catch (error) {
      console.error("Error updating NFT:", error.message, error.response?.status, error.response?.data);
    }
    //================================================================================================
      const listingData = {
        nftName,
        listingType: listingType,
        price: price,
        cid: cid,
        tokenId: tokenId,
      };
      await onSubmit(listingData); // Call the parent handler
    } 
    
  

  //===================================================================

  // Update button text based on listing type
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
                {/* Display tokenId */}
                <p>
                  <strong>Token ID:</strong> {tokenId}
                </p>{" "}
                <br />
                {/* Select listing type */}
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
                {/* Input for Sell */}
                {listingType === "list" && (
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
