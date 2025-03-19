import React, { useState } from "react";
import { validateForm } from "./CreateComponent/ValidateForm";
import { uploadImg } from "./CreateComponent/upload";
import "./CreateComponent/create.css";
import Footer from "../../components/Footer/footer";

const Create = () => {
  const [listingType, setListingType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // store the uploaded image

  const toggleCreateOption = (type) => {
    // Toggle type: Sell or Auction
    setListingType(type);
  };

  const handleSubmit = (event) => {
    validateForm(event); // Validate form inputs
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a preview URL for uploaded img
      setSelectedImage(imageUrl);
    }
  };

  return (
    <>
      <div className="container py-5 outfit">
        <h1 className="text-center mb-3">Create an NFT</h1>
        <p className="text-center">
          Once your item is minted, you cannot change any of its information.
        </p>

        {/* Form submit validation */}
        <form action="#" method="POST" onSubmit={uploadImg}>
          <div className="row mt-4 d-flex justify-content-center">

            {/* File Upload */}
            <div className="image-container col-lg-5 d-flex justify-content-center">
              <label
                htmlFor="nft_image"
                className="upload-box position-relative"
              > 
              
              {/* =================show uploaded img preview================= */}
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
                />
              </label>
            </div>

            {/*=================Details Input Form=================*/}
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
                  placeholder="Enter a description for your NFT.."
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="form-label">Listing Type:</label>
                <br />
                <input
                  type="radio"
                  id="sell"
                  name="listing_type"
                  value="sell"
                  onChange={() => toggleCreateOption("sell")}
                />
                <label htmlFor="sell" className="ms-2">
                  Sell
                </label>
                <input
                  type="radio"
                  id="auction"
                  name="listing_type"
                  value="auction"
                  onChange={() => toggleCreateOption("auction")}
                  className="ms-4"
                />
                <label htmlFor="auction" className="ms-2">
                  Auction
                </label>
              </div>



              {/*=================Sell or Auction=================*/}
              {listingType === "sell" && (
                <div className="mb-4">
                  <label htmlFor="price" className="form-label">
                    Price:
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    className="form-control"
                    min="0"
                  />
                </div>
              )}
              {listingType === "auction" && (
                <div className="mb-4">
                  <label htmlFor="starting_price" className="form-label">
                    Starting Price:
                  </label>
                  <input
                    type="text"
                    id="starting_price"
                    name="starting_price"
                    className="form-control"
                  />
                  <label htmlFor="offer_time" className="form-label mt-3">
                    Offer Duration (Minutes):
                  </label>
                  <input
                    type="text"
                    id="offer_time"
                    name="offer_time"
                    className="form-control"
                  />
                </div>
              )}
              <div className="d-flex justify-content-left">
                <button type="submit" className="btn btn-primary">
                  Create NFT
                </button>
                <button
                  type="reset"
                  className="btn btn-danger ms-2"
                  onClick={() => setSelectedImage(null)}
                >
                  Reset
                </button>


              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Create;
