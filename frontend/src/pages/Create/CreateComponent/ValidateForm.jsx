export function validateForm(event) {
  event.preventDefault();

  const errors = []; // Array to print out errors

  // get form inputs
  const nftName = document.getElementById("nft_name").value.trim();
  const nftImageInput = document.getElementById("nft_image");
  const nftImage = nftImageInput.files.length ? nftImageInput.files[0] : null;
  const nftDescription = document
    .getElementById("nft_description")
    .value.trim();
  const listingType = document.querySelector(
    'input[name="listing_type"]:checked'
  );
  const price = document.getElementById("price")
    ? document.getElementById("price").value.trim()
    : null;
  const startingPrice = document.getElementById("starting_price")
    ? document.getElementById("starting_price").value.trim()
    : null;
  const offerTime = document.getElementById("offer_time")
    ? document.getElementById("offer_time").value.trim()
    : null;

  // Validate NFT name
  if (!nftName || nftName.length > 30) {
    errors.push("NFT Name is required and must be less than 30 characters.");
  }

  // Validate NFT image & size
  if (!nftImage) {
    errors.push("Please upload an NFT image.");
  } else {
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (nftImage.size > maxSize) {
      errors.push(
        "Image file size exceeds 50MB. Please select a smaller file."
      );
    }
  }

  // Validate description & length
  if (!nftDescription || nftDescription.length > 250) {
    errors.push(
      "Description is required and must be less than 250 characters."
    );
  }

  // Validate listing type
  if (!listingType) {
    errors.push("Please select a listing type.");
  }

  // Validate sell price (float, >0)
  if (listingType && listingType.value === "sell") {
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      errors.push("Price must be a valid number greater than 0.");
    }
  }

  // Validate auction starting price (float, >0)
  if (listingType && listingType.value === "auction") {
    if (
      !startingPrice ||
      isNaN(startingPrice) ||
      parseFloat(startingPrice) <= 0
    ) {
      errors.push("Starting price must be a valid number greater than 0.");
    }

    // Validate auction time limit
    if (
      !offerTime ||
      isNaN(offerTime) ||
      parseInt(offerTime) <= 0 ||
      !Number.isInteger(Number(offerTime))
    ) {
      errors.push(
        "Offer duration (minutes) must be a valid number greater than 0."
      );
    }
  }

  //If no error -> submit form
  if (errors.length > 0) {
    alert(errors.join("\n"));
  } else {
    // upload img to Pinata
    uploadToPinata(nftImage);
    //event.target.submit();
  }
}

async function uploadToPinata(file) {
  const formData = new FormData();
  formData.append("file", file);

  const API_KEY = "c6ead4e45285600631c3";  // Pinata API key
  const API_SECRET = "7bea20f22f1e9da8628c47f52f2e98f03884dd3299bb8a7daf19c051a1efbef9";  // Secret key

  try {
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
          method: "POST",
          body: formData,
          headers: {
              "pinata_api_key": API_KEY,
              "pinata_secret_api_key": API_SECRET
          }
      });

      const data = await res.json();
      if (data.IpfsHash) {
          // Display the result in an alert
          alert(`✅ File Uploaded! CID: ${data.IpfsHash}\n🌍 Image URL: https://ipfs.io/ipfs/${data.IpfsHash}`);
      } else {
          // If upload fails
          alert("❌ Upload failed!");
      }
  } catch (err) {
      // Show upload error message 
      alert(`❌ Error uploading file: ${err.message}`);
  }
}