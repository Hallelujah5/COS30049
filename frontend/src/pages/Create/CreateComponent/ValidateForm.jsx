export async function validateForm(event) {
  event.preventDefault();

  const errors = []; // Array to print out errors

  // get form inputs
  const nftName = document.getElementById("nft_name").value.trim();
  const nftImageInput = document.getElementById("nft_image");
  const nftImage = nftImageInput.files.length ? nftImageInput.files[0] : null;
  const nftDescription = document
    .getElementById("nft_description")
    .value.trim();

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

  // Validate description
  if (!nftDescription || nftDescription.length > 250) {
    errors.push(
      "Description is required and must be less than 250 characters."
    );
  }

  // Show errors if validation fails
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false; // Validation failed
  }

  // Upload image to Pinata
  const success = await uploadToPinata(nftImage);
  return success;
  //event.target.submit();
}

// ---------UPLOAD TO PINATA
async function uploadToPinata(file) {
  const formData = new FormData();
  formData.append("file", file);

  const API_KEY = "c6ead4e45285600631c3";
  const API_SECRET =
    "7bea20f22f1e9da8628c47f52f2e98f03884dd3299bb8a7daf19c051a1efbef9";

  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      body: formData,
      headers: {
        pinata_api_key: API_KEY,
        pinata_secret_api_key: API_SECRET,
      },
    });

    const data = await res.json();
    if (data.IpfsHash) {
      const cid = data.IpfsHash; // Store the CID
      alert(
        `✅ File Uploaded! CID: ${cid}\n🌍 Image URL: https://ipfs.io/ipfs/${cid}`
      );
      return { success: true, cid }; // Return cid
    } else {
      alert("❌ Upload failed!");
      return { success: false };
    }
  } catch (err) {
    alert(`❌ Error uploading file: ${err.message}`);
    return { success: false };
  }
}
