// Import necessary libraries and components
import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { myNFTABI, myNFTAddress } from "../utils/constants";
// Create a context for MintNFT operations
const MintNFTContext = createContext();

// Define the MintNFTProvider component to provide MintNFT context to its children
export const MintNFTProvider = ({ children }) => {
  // State variables to manage status messages and the last minted NFT
  const [status, setStatus] = useState("");
  const [lastMintedNFT, setLastMintedNFT] = useState(null);

  // Function to mint an NFT with the given URI
  const mintNFT = async (uri) => {
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
      // Set up the NFT contract
      const nftContract = new ethers.Contract(myNFTAddress, myNFTABI, signer);
      const userAddress = await signer.getAddress();
      // Update status and mint the NFT
      setStatus("Minting NFT...");
      const tx = await nftContract.mintNFT(userAddress, uri);
      const receipt = await tx.wait();

      // Parse Transfer event to get tokenId
      const transferEvent = receipt.events.find((e) => e.event === "Transfer");
      if (!transferEvent) throw new Error("Transfer event not found");
      const tokenId = transferEvent.args.tokenId.toString();

      // Get the URI of the minted NFT and update state
      const mintedURI = await nftContract.tokenURI(tokenId);
      setLastMintedNFT({ tokenId, tokenURI: mintedURI });
      setStatus(`NFT minted! Transaction: ${tx.hash}`);
    } catch (error) {
      console.error("Minting error:", error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <MintNFTContext.Provider value={{ mintNFT, status, lastMintedNFT }}>
      {children}
    </MintNFTContext.Provider>
  );
};

export const useMintNFT = () => {
  const context = useContext(MintNFTContext);
  if (!context)
    throw new Error("useMintNFT must be used within a MintNFTProvider");
  return context;
};
