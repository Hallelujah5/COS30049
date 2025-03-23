import React, { useState, useEffect } from "react";
import "./offerPopup.css";
import { useAuction } from "../../context/AuctionContext"; // Import AuctionContext

const OfferPopup = ({ onClose, nftData }) => {
  const [bidAmount, setBidAmount] = useState(""); // Bid amount in ETH
  const [timeLeft, setTimeLeft] = useState(30); // 30-second countdown
  const [isAuctionEnded, setIsAuctionEnded] = useState(false); // Switches button function
  const { bid, endAuction, status: auctionStatus } = useAuction(); // Auction context
  const usdPrice = bidAmount ? (bidAmount * 1944.6).toFixed(2) : "--";

  // Countdown logic
  useEffect(() => {
    if (!nftData.isAuction) return; // Only run for auctions
    let timer;
    if (timeLeft > 0 && !isAuctionEnded) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsAuctionEnded(true); // Switch to "End Auction"
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup
  }, [timeLeft, nftData.isAuction]);

  const handleAuctionAction = async () => {
    if (!nftData.tokenId) {
      alert("No token ID provided.");
      return;
    }

    if (isAuctionEnded) {
      // End the auction
      try {
        await endAuction(nftData.tokenId);
        alert(`Auction for NFT ${nftData.tokenId} ended!`);
        onClose(); // Close popup after ending
      } catch (error) {
        console.error("Error ending auction:", error);
      }
    } else {
      // Place a bid
      if (!bidAmount || parseFloat(bidAmount) <= 0) {
        alert("Please enter a valid bid amount.");
        return;
      }
      try {
        await bid(nftData.tokenId, bidAmount);
        alert(`Bid of ${bidAmount} ETH placed on NFT ${nftData.tokenId}!`);
      } catch (error) {
        console.error("Error placing bid:", error);
      }
    }
  };

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
            <h5 className="modal-title mb-0">
              {nftData.isAuction ? "Bid on Auction" : "Make an Offer"}
            </h5>
            <button type="button" className="close-btn btn" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row align-items-center">
              <div className="col-12 col-md-3 text-center">
                <img
                  src={`https://ipfs.io/ipfs/${nftData.image}`}
                  alt="NFT Preview"
                  className="popup-img rounded"
                  style={{ width: "140px", height: "140px" }}
                />
              </div>
              <div className="col-12 col-md-9 d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mt-3">{nftData.name || "NFT Name"}</h5>
                  <p>Owner: {nftData.owner || "Unknown"}</p>
                </div>
                <div className="text-end">
                  <h5 className="mt-3">{bidAmount || "--"} ETH</h5>
                  <p>${usdPrice}</p>
                </div>
              </div>
            </div>
            {nftData.isAuction && (
              <p className="mt-3 text-center">Time Left: {timeLeft} seconds</p>
            )}
            <div className="mt-4 offer-input">
              <label htmlFor="bid_amount" className="form-label">
                {nftData.isAuction
                  ? "Enter Bid Amount (ETH):"
                  : "Enter Offer Amount (ETH):"}
              </label>
              <div className="input-group">
                <input
                  type="number"
                  id="bid_amount"
                  className="form-control"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Amount"
                  disabled={isAuctionEnded && nftData.isAuction} // Disable input after auction ends
                />
                <span className="input-group-text txt-input">ETH</span>
              </div>
              {bidAmount && (
                <p className="text-end mt-2">
                  Total amount: {bidAmount || "--"} ETH
                </p>
              )}
            </div>
            {auctionStatus && <p className="mt-3">{auctionStatus}</p>}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-offer"
              onClick={handleAuctionAction}
              disabled={!nftData.isAuction && !bidAmount} // Disable if not auction and no amount
            >
              {nftData.isAuction
                ? isAuctionEnded
                  ? "End Auction"
                  : "Make Offer"
                : "Make Offer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;
