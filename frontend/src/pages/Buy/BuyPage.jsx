import React, { useState, useEffect } from "react";
import "./buy.css";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import more from "../../assets/more.svg";
import share from "../../assets/share.svg";
import Heart from "../../components/heart";
import api from "../../api";
import OfferPopup from "./OfferPopup";
import { useMarketplace } from "../../context/MarketplaceContext";

const Buy = () => {
  const { nft_id } = useParams();
  const [nftData, setNftData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { buyNFT, status: marketStatus } = useMarketplace();

  useEffect(() => {
    const fetchNftId = async () => {
      try {
        const response = await api.get(`/nfts/${nft_id}`);
        setNftData(response.data);
      } catch (error) {
        console.log("Error fetching NFT id:", error.response || error);
      }
    };
    fetchNftId();
  }, [nft_id]);

  if (!nftData) return <p>Loading...</p>;
  const short_wallet = nftData.nft?.own_by?.substring(0, 8)
  const usd_price = nftData.nft.current_price * 1944.6;

  const handleBuyNFT = async () => {
    const tokenId = nftData.nft.token_id || nft_id;
    const priceInEth = nftData.nft.current_price.toString();
    if (!tokenId || !priceInEth) {
      alert("NFT data is incomplete. Missing token ID or price.");
      return;
    }
    try {
      await buyNFT(tokenId, priceInEth);
      console.log(`NFT ${tokenId} bought successfully!`);
    } catch (error) {
      console.error("Error buying NFT:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex row justify-content-between outfit">
          <div className="col-4 hl mt-5 col-12 col-sm-10 col-md-8 col-lg-4 d-flex flex-column">
            {/* Image and details omitted for brevity */}
            <img
              src={`https://ipfs.io/ipfs/${nftData.nft.image_path.replace(
                "ipfs://",
                ""
              )}`}
              alt="NFT"
              className="item-img"
            />
            {/* Description and Details sections omitted */}
          </div>
          <div className="col-8 outfit bodytext col-4 hl mt-5 col-12 col-sm-10 col-md-8 col-lg-8">
            <div className="d-none d-lg-flex justify-content-between mt-5 mx-5 mb-3">
              <div>
                <h2>{nftData.nft.nft_name}</h2>
                <p>
                  Owned by{" "}
                  <span className="blue">{nftData.nft?.own_by?.substring(0, 8) || "0x5FB92B"}</span>
                </p>
              </div>
              <Heart />
            </div>
            <div className="d-flex flex-column m-lg-5 border-rounded bg-purple">
              <h4 className="mt-3 mx-3 mb-2">CURRENT PRICE</h4>
              <hr className="mt-0" />
              <div className="mx-3 mt-1">
                <h2>
                  {nftData.nft.current_price == null
                    ? "--"
                    : nftData.nft.current_price}{" "}
                  ETH
                </h2>
                <p className="light-gray" style={{ fontSize: "large" }}>
                  {usd_price == 0 ? "--" : usd_price}$
                </p>
                {nftData.nft.nft_status === "list" ? (
                  <button
                    className="btn btn-primary btn-large subheading-text"
                    onClick={handleBuyNFT}
                  >
                    ORDER NOW
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-secondary btn-large text-white subheading-text mx-lg-4"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPopup(true);
                    }}
                  >
                    MAKE OFFER
                  </button>
                )}
                {marketStatus && <p className="mt-3">{marketStatus}</p>}
              </div>
            </div>
            {showPopup && (
              <OfferPopup
                nftData={{
                  image: `https://ipfs.io/ipfs/${nftData.nft.image_path.replace(
                    "ipfs://",
                    ""
                  )}`,
                  name: nftData.nft.nft_name,
                  owner: nftData.nft.own_by,
                  tokenId: nftData.nft.token_id || nft_id, // Pass tokenId
                  isAuction: nftData.nft.nft_status === "auction", // Flag for auction
                }}
                onClose={() => setShowPopup(false)}
              />
            )}
            {/* Previous Sales section omitted */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Buy;
