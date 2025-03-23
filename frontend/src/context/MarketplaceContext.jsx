import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { marketplaceABI, marketplaceAddress } from "../utils/constants";
import { myNFTABI, myNFTAddress } from "../utils/constants";
// Create a context for the Marketplace operations
export const MarketplaceContext = createContext();

// Define the MarketplaceProvider component to provide Marketplace context to its children
export const MarketplaceProvider = ({ children }) => {
    // State variable to manage status messages
  const [status, setStatus] = useState("");

  // Function to list an NFT on the marketplace
  const listNFT = async (tokenId, priceInEth) => {
    try {
      // Set up the provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // Set up the NFT contract and marketplace contract
      const nftContract = new ethers.Contract(myNFTAddress, myNFTABI, signer);
      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        marketplaceABI,
        signer
      );

      // Approve the marketplace to handle the specified tokenId
      console.log("Approving Marketplace for tokenId:", tokenId);
      const approveTx = await nftContract.approve(marketplaceAddress, tokenId);
      await approveTx.wait();
      console.log("Approval successful");

      // Convert price from ETH to Wei and list the NFT on the marketplace
      const priceInWei = ethers.utils.parseEther(priceInEth.toString());
      console.log("Calling listNFT with:", {
        tokenId,
        priceInWei: priceInWei.toString(),
      });
      const tx = await marketplaceContract.listNFT(tokenId, priceInWei);
      await tx.wait();
      setStatus(`NFT ${tokenId} listed! Transaction: ${tx.hash}`);
    } catch (error) {
      setStatus(`Error listing NFT: ${error.message}`);
      console.error("Full error:", error);
    }
  };

  // Function to buy an NFT from the marketplace
  const buyNFT = async (tokenId, priceInEth) => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        setStatus("Please install MetaMask!");
        return;
      }

      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // Set up the provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        marketplaceABI,
        signer
      );

      // Get listing details to fetch the seller (previous owner)
      const listing = await marketplaceContract.getListing(tokenId);
      const previousOwner = listing[1]; // seller address (second return value)
      const listingPrice = ethers.utils.formatEther(listing[2]); // price in ETH
      const buyerAddress = await signer.getAddress(); // New owner

      // Validate price
      if (parseFloat(priceInEth) < parseFloat(listingPrice)) {
        setStatus(`Price too low! Listing requires ${listingPrice} ETH`);
        return;
      }

      setStatus(`Buying NFT ${tokenId}...`);
      const priceInWei = ethers.utils.parseEther(priceInEth.toString());
      const tx = await marketplaceContract.buyNFT(tokenId, {
        value: priceInWei,
      });
      await tx.wait();

      // Format and set the transfer message
      const transferMessage = `NFT with id ${tokenId} transferred from ${previousOwner} to ${buyerAddress}`;
      setStatus(`${transferMessage}. Transaction: ${tx.hash}`);
    } catch (error) {
      setStatus(`Error buying NFT: ${error.message}`);
      console.error("Full error:", error);
    }
  };

  return (
    <MarketplaceContext.Provider value={{ listNFT, buyNFT, status, setStatus }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context)
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  return context;
};
