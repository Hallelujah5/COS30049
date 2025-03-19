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
            // Display the result in an alert instead of console.log
            alert(`✅ File Uploaded! CID: ${data.IpfsHash}\n🌍 URL: https://ipfs.io/ipfs/${data.IpfsHash}`);
            console.log(`CID: ${data.IpfsHash}\n🌍 URL: https://ipfs.io/ipfs/${data.IpfsHash}`)
        } else {
            // If upload fails, show an error in alert
            alert("❌ Upload failed!");
        }
    } catch (err) {
        // Show error message in alert if there is an issue with the upload
        alert(`❌ Error uploading file: ${err.message}`);
    }
}

export function uploadImg(event) {
    event.preventDefault(); // Prevent form submission

    const errors = []; // Array to collect validation errors
    const nftImageInput = document.getElementById("nft_image");
    const nftImage = nftImageInput.files.length ? nftImageInput.files[0] : null;

    // Validate NFT image & size
    if (!nftImage) {
        errors.push("Please upload an NFT image.");
    } else {
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (nftImage.size > maxSize) {
            errors.push("Image file size exceeds 50MB. Please select a smaller file.");
        }
    }

    // If errors found, alert the user
    if (errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        // Call the function to upload to Pinata
        uploadToPinata(nftImage);
    }
}
