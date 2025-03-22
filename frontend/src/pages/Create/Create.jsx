import React, { useState } from "react";
import { validateForm } from "./CreateComponent/ValidateForm";
import "./CreateComponent/create.css";
import Footer from "../../components/Footer/footer";
import ListingPopup from "./CreateComponent/ListingPopup";
import api from "../../api";
import { useMintNFT } from "../../context/MintNFTContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import { useAuction } from "../../context/AuctionContext";
import { useNavigate } from "react-router-dom"; 

const Create = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Store the uploaded image
  const [isMinted, setIsMinted] = useState(false); // Minted state
  const [showPopup, setShowPopup] = useState(false); // Popup
  const [nftName, setNftName] = useState(""); // NFT name
    const [nft_description, setNftDesc] = useState("");
  const [cid, setCid] = useState(""); // IPFS CID

  // Context hooks
  const { mintNFT, status: mintStatus, lastMintedNFT } = useMintNFT();
  const { listNFT, status: marketStatus } = useMarketplace();
  const { startAuction, status: auctionStatus } = useAuction();
  const navigate = useNavigate(); // Hook for navigation

  // handle minting
   //====HANDLE FORM SUBMISSON => CREATES NFT AND INSERT INTO DATABASE
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await validateForm(event); // Validate and upload to Pinata
    if (result.success) {
      const tokenURI = `ipfs://${result.cid}`; // Format URI as an IPFS link
      setCid(result.cid);

      
    //APPEND FORMDATA TO SEND OVER TO MAIN.API @APP.POST() TO PUSH IT ON DATABASE
      const formData = new FormData();
      formData.append("nft_name", nftName || "Unnamed");
      formData.append("description", nft_description || "No description");
      formData.append("image_path", result.cid);
      formData.append("own_by", "0x1234567890abcdef1234567890abcdef12345678");    //HARDCODE AT THE MOMENT
      
      
      //1st TRY-CATCH BLOCK, MINT NFT
      try {
        await mintNFT(tokenURI); 
        setIsMinted(true); 
      } catch (error) {
        console.error("Minting failed:", error);
      }
       //================================================
      
      
      //2nd TRY-CATCH BLOCK, PUSH TO DATABASE
        try {
        const res = await api.post("/create-nft",formData);     //SEND IT OVER TO /CREATE-NFT
        //=======DEBUG PROCESS=======
        console.log("Response:", res.data);
        if (res.data.success) {
          console.log("Successfully created NFT:", res.data);
          console.log("nft_id is: ", res.data.nft_id);
          setnftId(res.data.nft_id)
        } else {
          console.error("Creation failed:", res.data.error);
        }
      } catch (error) {
        console.error("Error creating NFT:", JSON.stringify(error.response?.data, null, 2));
      }
      //================================================================================================
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

  // Handle listing or auction 
  const handleListingSubmit = async (listingData) => {
    if (!lastMintedNFT || !lastMintedNFT.tokenId) {
      alert("No minted NFT found. Please mint an NFT first.");
      return;
    }

    const tokenId = lastMintedNFT.tokenId; // Use the last minted token ID

    try {
      if (listingData.listingType === "list") {
        await listNFT(tokenId, listingData.price);
        alert(`NFT ${tokenId} listed successfully!`);
        navigate("/market"); // Redirect to /market after sale listing
      } else if (listingData.listingType === "auction") {
        await startAuction(tokenId, listingData.startingPrice);
        alert(`Auction for NFT ${tokenId} started successfully!`);
        navigate("/market"); // Redirect to /market after starting auction
      }
      setShowPopup(false); // Close popup on success
    } catch (error) {
      console.error("Error in listing/auction:", error);
      alert(`Error: ${error.message}`);
    }
  };
  
   const handleDescChange = (event) => {
    setNftDesc(event.target.value);
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
                  value={nft_description}
                  onChange={handleDescChange}
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
                  <p>{marketStatus || auctionStatus}</p> {/* Display listing/auction status */}
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
          tokenId={lastMintedNFT?.tokenId} // Pass tokenId to popup
          nft_id = {nftId}
          onClose={() => setShowPopup(false)}
          onSubmit={handleListingSubmit} // Pass submit handler
        />
      )}
    </>
  );
};

export default Create;

