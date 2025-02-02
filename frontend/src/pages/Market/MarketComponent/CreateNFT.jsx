import React from "react";
import "./marketplace.css";
import Card from './CreateNFT-card'

const NewItems = [
  { step: "STEP 01", title: "set up your wallet", bodytext: "Get a wallet like MetaMask, fund it with cryptocurrency (e.g., Ethereum), and connect it to your chosen NFT platform." },
  { step: "STEP 02", title: "Create your collection", bodytext: "Plan the concept or theme for your collection and create multiple related pieces of digital content." },
  { step: "STEP 03", title: "mint your fresh nfts", bodytext: "Upload your digital file, set its properties, and mint it as an NFT on the blockchain via the platform." },
  { step: "STEP 04", title: "list on market and sell", bodytext: "Choose auction or fixed-price sales, set your terms, and promote your NFT to potential buyers." }
];


const Newest = () => {
  return (
    <div className="container py-5 text-white">
      <div className="d-flex justify-content-between">
        <h4 className="outfit live-bid"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app" viewBox="0 0 16 16">
  <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z"/>
</svg>CREATE AND SELL YOUR NFTS</h4>
      </div>
      <div className="text-center mb-5"></div>
      <div className="row justify-content-center">
        {NewItems.map((item, index) => (
          <Card
            key={index}
            step={item.step}
            title={item.title.toLocaleUpperCase()}
            bodytext={item.bodytext}
          />          
        ))}
        
      </div>
      
    </div>
  );
};

export default Newest;
