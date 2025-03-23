import React, { useState, useContext, useEffect } from "react";
import { validateForm } from "./CreateComponent/ValidateForm";
import "./CreateComponent/create.css";
import Footer from "../../components/Footer/footer";
import ListingPopup from "./CreateComponent/ListingPopup";
import api from "../../api";
import { useMintNFT } from "../../context/MintNFTContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import { useAuction } from "../../context/AuctionContext";
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../../context/TransactionContext";

const Create = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMinted, setIsMinted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [nftName, setNftName] = useState("");
  const [nft_description, setNftDesc] = useState("");
  const [cid, setCid] = useState("");
  const [nftId, setNftId] = useState();

  const { mintNFT, status: mintStatus, lastMintedNFT } = useMintNFT();
  const { listNFT, status: marketStatus } = useMarketplace();
  const { startAuction, status: auctionStatus } = useAuction();
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await validateForm(event);
    console.log("Validation result:", result);
    if (!result.success) return;

    const tokenURI = `ipfs://${result.cid}`;
    setCid(result.cid);

    try {
      console.log("Minting with URI:", tokenURI);
      await mintNFT(tokenURI); // This now uses the updated mintNFT
      console.log("Mint requested, waiting for lastMintedNFT...");
    } catch (error) {
      console.error("Error during minting:", error);
    }
  };

  useEffect(() => {
    if (mintStatus === "Minting NFT...") {
      console.log("Minting in progress...");
    } else if (mintStatus.startsWith("NFT minted!") && lastMintedNFT?.tokenId) {
      // Move DB logic here to ensure minting is complete
      const updateDB = async () => {
        const formData = new FormData();
        formData.append("nft_name", nftName || "Unnamed");
        formData.append("description", nft_description || "No description");
        formData.append("image_path", cid);
        formData.append("own_by", currentAccount || "0xDefaultAddress");

        try {
          const res = await api.post("/create-nft", formData);
          console.log("Database response:", res.data);
          if (res.data.success) {
            setNftId(res.data.nft_id);
            setIsMinted(true);
          } else {
            console.error("Failed to create NFT in DB:", res.data.error);
          }
        } catch (error) {
          console.error("DB update failed:", error);
        }
      };
      updateDB();
    } else if (mintStatus.startsWith("Error:")) {
      console.error("Minting failed:", mintStatus);
    }
  }, [
    mintStatus,
    lastMintedNFT,
    nftName,
    nft_description,
    cid,
    currentAccount,
  ]);

  useEffect(() => {
    if (lastMintedNFT?.tokenId && nftId) {
      console.log("lastMintedNFT updated:", lastMintedNFT);
      handleTokenUpdate(lastMintedNFT.tokenId, nftId);
    }
  }, [lastMintedNFT, nftId]);

  const handleTokenUpdate = async (tokenId, nftId) => {
    if (!tokenId || !nftId) {
      console.error("Cannot update token: missing data", { tokenId, nftId });
      return;
    }

    const formData = new FormData();
    formData.append("token_id", tokenId.toString());
    formData.append("nft_id", nftId);
    try {
      const respond = await api.post("/update-tokenid", formData);
      console.log("Token update response:", respond.data);
    } catch (error) {
      console.error("Token update failed:", error.response?.data || error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleNameChange = (event) => {
    setNftName(event.target.value);
  };

  const handleDescChange = (event) => {
    setNftDesc(event.target.value);
  };

  const handleListingSubmit = async (listingData) => {
    if (!lastMintedNFT || !lastMintedNFT.tokenId) {
      alert("No minted NFT found. Please mint an NFT first.");
      return;
    }

    const tokenId = lastMintedNFT.tokenId;

    try {
      if (listingData.listingType === "list") {
        await listNFT(tokenId, listingData.price);
        alert(`NFT ${tokenId} listed successfully!`);
        navigate("/market");
      } else if (listingData.listingType === "auction") {
        await startAuction(tokenId, listingData.price);
        alert(`Auction for NFT ${tokenId} started successfully!`);
        navigate("/market");
      }
      setShowPopup(false);
    } catch (error) {
      console.error("Error in listing/auction:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="container py-5 outfit">
        <h1 className="text-center mb-3">Create an NFT</h1>
        <p className="text-center">
          Once your item is minted, you cannot change any of its information.
        </p>

        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className="row mt-4 d-flex justify-content-center">
            <div className="image-container col-lg-5 d-flex justify-content-center">
              <label
                htmlFor="nft_image"
                className="upload-box position-relative"
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded preview"
                    className="upload-preview"
                  />
                ) : (
                  <div className="upload-content text-center">
                    <i className="bi bi-upload fs-1"></i>
                    <p>Drag and drop media</p>
                    <p className="text-primary">Browse files</p>
                    <p>Max size: 50MB (.JPG, .PNG only)</p>
                  </div>
                )}
                <input
                  type="file"
                  id="nft_image"
                  name="nftImage"
                  accept=".jpg, .png"
                  onChange={handleImageChange}
                  disabled={isMinted}
                />
              </label>
            </div>

            <div className="col-lg-5">
              <div className="mb-4">
                <label htmlFor="nft_name" className="form-label">
                  NFT Name:
                </label>
                <input
                  type="text"
                  id="nft_name"
                  name="nft_name"
                  className="form-control"
                  value={nftName}
                  onChange={handleNameChange}
                  disabled={isMinted}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="nft_description" className="form-label">
                  Description:
                </label>
                <textarea
                  id="nft_description"
                  name="nft_description"
                  className="form-control"
                  value={nft_description}
                  onChange={handleDescChange}
                  placeholder="Enter a description for your NFT.."
                  disabled={isMinted}
                ></textarea>
              </div>

              {!isMinted ? (
                <div className="d-flex justify-content-left">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={mintStatus === "Minting NFT..."}
                  >
                    {mintStatus === "Minting NFT..."
                      ? "Minting..."
                      : "Mint NFT"}
                  </button>
                  <button
                    type="reset"
                    className="btn btn-danger ms-2"
                    onClick={() => setSelectedImage(null)}
                    disabled={mintStatus === "Minting NFT..."}
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="text-center mt-3">
                  <p className="mint-success fw-bold">
                    NFT minted successfully!
                  </p>
                  <p>{mintStatus}</p>
                  {lastMintedNFT && (
                    <div>
                      <p>
                        <strong>Token ID:</strong> {lastMintedNFT.tokenId}
                      </p>
                      <p>
                        <strong>Token URI:</strong> {lastMintedNFT.tokenURI}
                      </p>
                    </div>
                  )}
                  {mintStatus.startsWith("Error:") && (
                    <p className="text-danger">Minting failed: {mintStatus}</p>
                  )}
                  <p>{marketStatus || auctionStatus}</p>
                  <button
                    className="btn btn-create"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!lastMintedNFT?.tokenId) {
                        alert(
                          "Minting incomplete. Please wait or check minting status."
                        );
                        return;
                      }
                      setShowPopup(true);
                    }}
                    disabled={!lastMintedNFT || mintStatus.startsWith("Error:")}
                  >
                    List this collection?
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      <Footer />

      {showPopup && (
        <ListingPopup
          image={selectedImage}
          nftName={nftName}
          cid={cid}
          tokenId={lastMintedNFT?.tokenId}
          nft_id={nftId}
          onClose={() => setShowPopup(false)}
          onSubmit={handleListingSubmit}
        />
      )}
    </>
  );
};

export default Create;
