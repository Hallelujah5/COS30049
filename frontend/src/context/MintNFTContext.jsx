// frontend/src/context/MintNFTContext.jsx
import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { myNFTABI, myNFTAddress } from "../utils/constants";

const MintNFTContext = createContext();

export const MintNFTProvider = ({ children }) => {
  const [status, setStatus] = useState("");
  const [lastMintedNFT, setLastMintedNFT] = useState(null);

  const mintNFT = async (uri) => {
    try {
      if (!window.ethereum) {
        setStatus("Please install MetaMask!");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(myNFTAddress, myNFTABI, signer);
      const userAddress = await signer.getAddress();

      setStatus("Minting NFT...");
      const tx = await nftContract.mintNFT(userAddress, uri);
      const receipt = await tx.wait();

      // Parse Transfer event to get tokenId
      const transferEvent = receipt.events.find((e) => e.event === "Transfer");
      if (!transferEvent) throw new Error("Transfer event not found");
      const tokenId = transferEvent.args.tokenId.toString();

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
