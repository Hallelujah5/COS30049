import React, { useState } from 'react';
import { useMintNFT } from '../../context/MintNFTContext';
import { useMarketplace } from '../../context/MarketplaceContext';

const TestMintNFTContext = () => {
  const [tokenURI, setTokenURI] = useState('');
  const [tokenIdToList, setTokenIdToList] = useState('');
  const [price, setPrice] = useState('');
  const [tokenIdToBuy, setTokenIdToBuy] = useState('');
  const { mintNFT, status: mintStatus, lastMintedNFT } = useMintNFT();
  const { listNFT, buyNFT, status: marketStatus } = useMarketplace();

  const handleMint = () => {
    if (tokenURI) {
      mintNFT(tokenURI);
    } else {
      alert('Please enter a Token URI');
    }
  };

  const handleList = () => {
    if (tokenIdToList && price) {
      listNFT(tokenIdToList, price);
    } else {
      alert('Please enter Token ID and Price');
    }
  };

  const handleBuy = () => {
    if (tokenIdToBuy && price) {
      buyNFT(tokenIdToBuy, price);
    } else {
      alert('Please enter Token ID and Price');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>NFT Marketplace</h1>

      {/* Mint Section */}
      <h2>Mint Your NFT</h2>
      <input
        type="text"
        placeholder="Enter Token URI (e.g., ipfs://...)"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        style={{ padding: '10px', width: '300px', margin: '10px' }}
      />
      <br />
      <button onClick={handleMint} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Mint NFT
      </button>
      <p>{mintStatus}</p>
      {lastMintedNFT && (
        <div style={{ marginTop: '20px' }}>
          <h3>Last Minted NFT</h3>
          <p><strong>Token ID:</strong> {lastMintedNFT.tokenId}</p>
          <p><strong>Token URI:</strong> {lastMintedNFT.tokenURI}</p>
        </div>
      )}

      {/* List Section */}
      <h2>List an NFT</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenIdToList}
        onChange={(e) => setTokenIdToList(e.target.value)}
        style={{ padding: '10px', width: '300px', margin: '10px' }}
      />
      <br />
      <input
        type="text"
        placeholder="Price in ETH"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ padding: '10px', width: '300px', margin: '10px' }}
      />
      <br />
      <button onClick={handleList} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        List NFT
      </button>

      {/* Buy Section */}
      <h2>Buy an NFT</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenIdToBuy}
        onChange={(e) => setTokenIdToBuy(e.target.value)}
        style={{ padding: '10px', width: '300px', margin: '10px' }}
      />
      <br />
      <button onClick={handleBuy} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Buy NFT
      </button>
      <p>{marketStatus}</p>
    </div>
  );
};

export default TestMintNFTContext;