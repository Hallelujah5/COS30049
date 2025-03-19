// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for interacting with the MyNFT contract
interface IMyNFT {
    function ownerOf(uint256 tokenId) external view returns (address); // Get token owner
    function transfer(address to, uint256 tokenId) external; // Transfer a token
    function tokenURI(uint256 tokenId) external view returns (string memory); // Get token URI
}

// Marketplace contract: Allows listing, buying, and canceling NFT sales
contract Marketplace {
    // Reference to the MyNFT contract instance
    IMyNFT public nftContract;

    // Struct: Defines the details of an NFT listing
    struct Listing {
        uint256 tokenId; // ID of the NFT being listed
        address seller; // Address of the seller
        uint256 price; // Price in wei
        bool active;   // Whether the listing is still available
    }

    // Mapping: Stores listings by token ID
    mapping(uint256 => Listing) public listings;
    // Counter: Tracks the total number of active listings
    uint256 public listingCount;

    // Event emitted when an NFT is listed for sale
    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    // Event emitted when an NFT is sold
    event NFTSold(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price);
    // Event emitted when a listing is canceled
    event ListingCancelled(uint256 indexed tokenId, address indexed seller);

    // Constructor: Initializes the marketplace with the MyNFT contract address
    constructor(address _nftContractAddress) {
        nftContract = IMyNFT(_nftContractAddress); // Set the NFT contract reference
    }

    // List an NFT for sale
    function listNFT(uint256 tokenId, uint256 price) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Only the owner can list the NFT"); // Caller must own the NFT
        require(price > 0, "Price must be greater than zero"); // Price must be positive
        require(listings[tokenId].active == false, "NFT is already listed"); // NFT must not already be listed

        nftContract.transfer(address(this), tokenId); // Transfer NFT to the marketplace (requires prior approval)

        listings[tokenId] = Listing({ // Create a new listing
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            active: true
        });
        listingCount++; // Increment active listing count

        emit NFTListed(tokenId, msg.sender, price); // Emit listing event
    }

    // Buy a listed NFT
    function buyNFT(uint256 tokenId) external payable {
        Listing memory listing = listings[tokenId]; // Get the listing details
        require(listing.active, "NFT is not listed for sale"); // Ensure the listing is active
        require(msg.value >= listing.price, "Insufficient payment"); // Ensure enough ETH is sent

        listings[tokenId].active = false; // Mark listing as inactive
        listingCount--; // Decrease active listing count

        payable(listing.seller).transfer(listing.price); // Send ETH to the seller
        nftContract.transfer(msg.sender, tokenId); // Transfer NFT to the buyer

        if (msg.value > listing.price) { // Refund excess ETH if overpaid
            payable(msg.sender).transfer(msg.value - listing.price);
        }

        emit NFTSold(tokenId, msg.sender, listing.seller, listing.price); // Emit sale event
    }

    // Cancel an active listing
    function cancelListing(uint256 tokenId) external {
        Listing memory listing = listings[tokenId]; // Get the listing details
        require(listing.active, "NFT is not listed"); // Ensure the listing is active
        require(listing.seller == msg.sender, "Only the seller can cancel"); // Only seller can cancel

        listings[tokenId].active = false; // Mark listing as inactive
        listingCount--; // Decrease active listing count

        nftContract.transfer(msg.sender, tokenId); // Return NFT to the seller

        emit ListingCancelled(tokenId, msg.sender); // Emit cancellation event
    }

    // View function: Get details of a listing by token ID
    function getListing(uint256 tokenId) external view returns (uint256, address, uint256, bool) {
        Listing memory listing = listings[tokenId]; // Fetch the listing
        return (listing.tokenId, listing.seller, listing.price, listing.active); // Return all details
    }
}