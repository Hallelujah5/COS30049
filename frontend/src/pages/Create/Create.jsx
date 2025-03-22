import React, { useState } from "react";
import { validateForm } from "./CreateComponent/ValidateForm";
import "./CreateComponent/create.css";
import Footer from "../../components/Footer/footer";
import ListingPopup from "./CreateComponent/ListingPopup";
import { useMintNFT } from "../../context/MintNFTContext"; // Import the context hook

const Create = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Store the uploaded image
  const [isMinted, setIsMinted] = useState(false); // Minted state
  const [showPopup, setShowPopup] = useState(false); // Popup
  const [nftName, setNftName] = useState(""); // NFT name
  const [cid, setCid] = useState(""); // IPFS CID
  const { mintNFT, status: mintStatus, lastMintedNFT } = useMintNFT(); // Use MintNFT context

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await validateForm(event); // Validate and upload to Pinata
    if (result.success) {
      const tokenURI = `ipfs://${result.cid}`; // Format the URI as an IPFS link
      setCid(result.cid);
      try {
        await mintNFT(tokenURI); // Call mintNFT from context with the IPFS URI
        setIsMinted(true); // Update state on successful mint
      } catch (error) {
        console.error("Minting failed:", error);
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a preview for uploaded img
      setSelectedImage(imageUrl);
    }
  };

  const handleNameChange = (event) => {
    setNftName(event.target.value);
  };

  return (
    <>
      <div className="container py-5 outfit">
        <h1 className="text-center mb-3">Create an NFT</h1>
        <p className="text-center">
          Once your item is minted, you cannot change any of its information.
        </p>

        {/* Form submit validation */}
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className="row mt-4 d-flex justify-content-center">
            {/* File Upload */}
            <div className="image-container col-lg-5 d-flex justify-content-center">
              <label htmlFor="nft_image" className="upload-box position-relative">
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
                  disabled={isMinted} // Disable file input after minting
                />
              </label>
            </div>

            {/* Details Input Form */}
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
                  disabled={isMinted} // Disable input after minting
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label htmlFor="nft_description" className="form-label">
                  Description:
                </label>
                <textarea
                  id="nft_description"
                  name="nft_description"
                  className="form-control"
                  placeholder="Enter a description for your NFT.."
                  disabled={isMinted}
                ></textarea>
              </div>

              {/* Minting Status and Buttons */}
              {!isMinted ? (
                <div className="d-flex justify-content-left">
                  <button type="submit" className="btn btn-primary">
                    Mint NFT
                  </button>
                  <button
                    type="reset"
                    className="btn btn-danger ms-2"
                    onClick={() => setSelectedImage(null)}
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="text-center mt-3">
                  <p className="mint-success fw-bold">
                    NFT minted successfully!
                  </p>
                  <p>{mintStatus}</p> {/* Display minting status */}
                  {lastMintedNFT && (
                    <div>
                      <p><strong>Token ID:</strong> {lastMintedNFT.tokenId}</p>
                      <p><strong>Token URI:</strong> {lastMintedNFT.tokenURI}</p>
                    </div>
                  )}
                  <button
                    className="btn btn-create"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPopup(true); // Show popup when this button is clicked
                    }}
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
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default Create;