// frontend/src/context/AuctionContext.jsx
import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { myNFTAddress, myNFTABI, auctionAddress, auctionABI } from "../utils/constants";

export const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [status, setStatus] = useState("");

  const startAuction = async (tokenId, startingPriceInEth) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(myNFTAddress, myNFTABI, signer);
      const auctionContract = new ethers.Contract(auctionAddress, auctionABI, signer);

      console.log("Approving Auction for tokenId:", tokenId);
      const approveTx = await nftContract.approve(auctionAddress, tokenId);
      await approveTx.wait();
      console.log("Approval successful");

      const startingPriceInWei = ethers.utils.parseEther(startingPriceInEth.toString());
      console.log("Starting auction with:", { tokenId, startingPriceInWei: startingPriceInWei.toString() });
      const tx = await auctionContract.startAuction(tokenId, startingPriceInWei);
      await tx.wait();
      // MODIFIED: Include initial price in status
      setStatus(`Auction for NFT ${tokenId} started with ${startingPriceInEth} ETH! Transaction: ${tx.hash}`);
    } catch (error) {
      setStatus(`Error starting auction: ${error.message}`);
      console.error("Full error:", error);
    }
  };

  const bid = async (tokenId, bidAmountInEth) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const auctionContract = new ethers.Contract(auctionAddress, auctionABI, signer);

      const bidderAddress = await signer.getAddress(); // NEW: Get bidder’s address
      const bidAmountInWei = ethers.utils.parseEther(bidAmountInEth.toString());
      console.log("Placing bid with:", { tokenId, bidAmountInWei: bidAmountInWei.toString() });
      const tx = await auctionContract.bid(tokenId, { value: bidAmountInWei });
      await tx.wait();
      // MODIFIED: Include bidder address in status
      setStatus(`Bid placed on NFT ${tokenId} for ${bidAmountInEth} ETH by ${bidderAddress}! Transaction: ${tx.hash}`);
    } catch (error) {
      setStatus(`Error placing bid: ${error.message}`);
      console.error("Full error:", error);
    }
  };

  const endAuction = async (tokenId) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const auctionContract = new ethers.Contract(auctionAddress, auctionABI, signer);
      const nftContract = new ethers.Contract(myNFTAddress, myNFTABI, signer);

      // NEW: Fetch auction details before ending
      const auction = await auctionContract.auctions(tokenId);
      const previousOwner = auction.seller;
      const highestBidder = auction.highestBidder;
      const finalPriceInWei = auction.highestBid;
      const finalPriceInEth = ethers.utils.formatEther(finalPriceInWei);

      console.log("Ending auction for tokenId:", tokenId);
      const tx = await auctionContract.endAuction(tokenId);
      await tx.wait();

      // NEW: Determine new owner (highest bidder if bid exists, otherwise seller)
      const newOwner = highestBidder !== "0x0000000000000000000000000000000000000000" ? highestBidder : previousOwner;
      const finalMessage = highestBidder !== "0x0000000000000000000000000000000000000000"
        ? `Auction for NFT ${tokenId} ended with ${finalPriceInEth} ETH. NFT ${tokenId} transferred from ${previousOwner} to ${newOwner}`
        : `Auction for NFT ${tokenId} ended with 0 ETH. NFT ${tokenId} returned to ${previousOwner}`;
      setStatus(`${finalMessage}! Transaction: ${tx.hash}`);
    } catch (error) {
      setStatus(`Error ending auction: ${error.message}`);
      console.error("Full error:", error);
    }
  };

  return (
    <AuctionContext.Provider value={{ startAuction, bid, endAuction, status }}>
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (!context) throw new Error("useAuction must be used within an AuctionProvider");
  return context;
};