// frontend/src/components/TestMintNFTContext.jsx
import React, { useState, useEffect } from "react"; // MODIFIED: Added useEffect
import { useMintNFT } from "../../context/MintNFTContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import { useAuction } from "../../context/AuctionContext";

const TestMintNFTContext = () => {
  const [tokenURI, setTokenURI] = useState("");
  const [tokenIdToList, setTokenIdToList] = useState("");
  const [price, setPrice] = useState("");
  const [tokenIdToBuy, setTokenIdToBuy] = useState("");
  const [tokenIdToAuction, setTokenIdToAuction] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [bidTokenId, setBidTokenId] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [endAuctionTokenId, setEndAuctionTokenId] = useState("");
  // NEW: Timer-related state
  const [auctionActiveTokenId, setAuctionActiveTokenId] = useState(null); // Tracks active auction
  const [timeLeft, setTimeLeft] = useState(30); // 30-second countdown
  const [isAuctionEnded, setIsAuctionEnded] = useState(false); // Switches button function

  const { mintNFT, status: mintStatus, lastMintedNFT } = useMintNFT();
  const { listNFT, buyNFT, status: marketStatus } = useMarketplace();
  const { startAuction, bid, endAuction, status: auctionStatus } = useAuction();

  // NEW: Timer logic
  useEffect(() => {
    let timer;
    if (auctionActiveTokenId && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsAuctionEnded(true); // Switch to "End Auction"
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Decrease every second
    }
    return () => clearInterval(timer); // Cleanup on unmount or auction change
  }, [auctionActiveTokenId, timeLeft]);

  const handleMint = () => {
    if (tokenURI) {
      mintNFT(tokenURI);
    } else {
      alert("Please enter a Token URI");
    }
  };

  const handleList = () => {
    if (tokenIdToList && price) {
      listNFT(tokenIdToList, price);
    } else {
      alert("Please enter Token ID and Price");
    }
  };

  const handleBuy = () => {
    if (tokenIdToBuy && price) {
      buyNFT(tokenIdToBuy, price);
    } else {
      alert("Please enter Token ID and Price");
    }
  };

  const handleStartAuction = () => {
    if (tokenIdToAuction && startingPrice) {
      startAuction(tokenIdToAuction, startingPrice);
      setAuctionActiveTokenId(tokenIdToAuction); // Start timer for this token
      setTimeLeft(30); // Reset timer
      setIsAuctionEnded(false); // Ensure button starts as "Bid Now"
      setBidTokenId(tokenIdToAuction); // Pre-fill bid input
      setEndAuctionTokenId(tokenIdToAuction); // Pre-fill end input
    } else {
      alert("Please enter Token ID and Starting Price");
    }
  };

  // MODIFIED: Combined bid/end logic into one handler
  const handleAuctionAction = () => {
    if (isAuctionEnded) {
      if (endAuctionTokenId) {
        endAuction(endAuctionTokenId);
        setAuctionActiveTokenId(null); // Reset auction state
      } else {
        alert("Please enter Token ID");
      }
    } else {
      if (bidTokenId && bidAmount) {
        bid(bidTokenId, bidAmount);
      } else {
        alert("Please enter Token ID and Bid Amount");
      }
    }
  };

  const handleEndAuction = () => {
    if (endAuctionTokenId) {
      endAuction(endAuctionTokenId);
      setAuctionActiveTokenId(null); // Reset auction state
    } else {
      alert("Please enter Token ID");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>NFT Marketplace</h1>

      {/* Mint Section */}
      <h2>Mint Your NFT</h2>
      <input
        type="text"
        placeholder="Enter Token URI (e.g., ipfs://...)"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        style={{ padding: "10px", width: "300px", margin: "10px" }}
      />
      <br />
      <button
        onClick={handleMint}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Mint NFT
      </button>
      <p>{mintStatus}</p>
      {lastMintedNFT && (
        <div style={{ marginTop: "20px" }}>
          <h3>Last Minted NFT</h3>
          <p>
            <strong>Token ID:</strong> {lastMintedNFT.tokenId}
          </p>
          <p>
            <strong>Token URI:</strong> {lastMintedNFT.tokenURI}
          </p>
        </div>
      )}

      {/* List Section */}
      <h2>List an NFT</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenIdToList}
        onChange={(e) => setTokenIdToList(e.target.value)}
        style={{ padding: "10px", width: "300px", margin: "10px" }}
      />
      <br />
      <input
        type="text"
        placeholder="Price in ETH"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ padding: "10px", width: "300px", margin: "10px" }}
      />
      <br />
      <button
        onClick={handleList}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        List NFT
      </button>

      {/* Buy Section */}
      <h2>Buy an NFT</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenIdToBuy}
        onChange={(e) => setTokenIdToBuy(e.target.value)}
        style={{ padding: "10px", width: "300px", margin: "10px" }}
      />
      <br />
      <button
        onClick={handleBuy}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Buy NFT
      </button>
      <p>{marketStatus}</p>

      {/* Auction Section */}
      <h2>Auction an NFT</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenIdToAuction}
        onChange={(e) => setTokenIdToAuction(e.target.value)}
        style={{ padding: "10px", width: "300px", margin: "10px" }}
      />
      <br />
      <input
        type="text"
        placeholder="Starting Price in ETH"
        value={startingPrice}
        onChange={(e) => setStartingPrice(e.target.value)}
        style={{ padding: "10px", width: "300px", margin: "10px" }}
      />
      <br />
      <button
        onClick={handleStartAuction}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Start Auction
      </button>

      {/* MODIFIED: Combined Bid/End Auction Section */}
      <h2>
        {auctionActiveTokenId
          ? `Auction for NFT ${auctionActiveTokenId}`
          : "Bid or End Auction"}
      </h2>
      {auctionActiveTokenId && (
        <p>Time Left: {timeLeft} seconds</p> // NEW: Display countdown
      )}
      <input
        type="text"
        placeholder="Token ID"
        value={bidTokenId}
        onChange={(e) => setBidTokenId(e.target.value)}
        style={{ padding: "10px", width: "300px", margin: "10px" }}
      />
      <br />
      {!isAuctionEnded && ( // Only show bid amount input during bidding phase
        <>
          <input
            type="text"
            placeholder="Bid Amount in ETH"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            style={{ padding: "10px", width: "300px", margin: "10px" }}
          />
          <br />
        </>
      )}
      <button
        onClick={handleAuctionAction}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        {isAuctionEnded ? "End Auction" : "Bid Now"}{" "}
        {/* NEW: Dynamic button text */}
      </button>
      <p>{auctionStatus}</p>
    </div>
  );
};

export default TestMintNFTContext;
