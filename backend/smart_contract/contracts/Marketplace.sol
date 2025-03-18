// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMyNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
    function transfer(address to, uint256 tokenId) external;
    function tokenURI(uint256 tokenId) external view returns (string memory);
}

contract Marketplace {
    // Reference to the MyNFT contract
    IMyNFT public nftContract;

    // Struct to store listing details
    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 price; // Price in wei
        bool active;   // Is the listing still available?
    }

    // Mapping of tokenId to its listing
    mapping(uint256 => Listing) public listings;
    uint256 public listingCount; // Total number of active listings

    // Events for tracking marketplace actions
    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price);
    event ListingCancelled(uint256 indexed tokenId, address indexed seller);

    constructor(address _nftContractAddress) {
        nftContract = IMyNFT(_nftContractAddress);
    }

    // List an NFT for sale
    function listNFT(uint256 tokenId, uint256 price) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Only the owner can list the NFT");
        require(price > 0, "Price must be greater than zero");
        require(listings[tokenId].active == false, "NFT is already listed");

        // Transfer NFT to the marketplace (assumes approval is set to this contract)
        nftContract.transfer(address(this), tokenId);

        listings[tokenId] = Listing({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            active: true
        });
        listingCount++;

        emit NFTListed(tokenId, msg.sender, price);
    }

    // Buy a listed NFT
    function buyNFT(uint256 tokenId) external payable {
        Listing memory listing = listings[tokenId];
        require(listing.active, "NFT is not listed for sale");
        require(msg.value >= listing.price, "Insufficient payment");

        // Mark listing as inactive
        listings[tokenId].active = false;
        listingCount--;

        // Transfer ETH to the seller
        payable(listing.seller).transfer(listing.price);

        // Transfer NFT to the buyer
        nftContract.transfer(msg.sender, tokenId);

        // Refund excess payment if any
        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }

        emit NFTSold(tokenId, msg.sender, listing.seller, listing.price);
    }

    // Cancel a listing
    function cancelListing(uint256 tokenId) external {
        Listing memory listing = listings[tokenId];
        require(listing.active, "NFT is not listed");
        require(listing.seller == msg.sender, "Only the seller can cancel");

        listings[tokenId].active = false;
        listingCount--;

        // Transfer NFT back to the seller
        nftContract.transfer(msg.sender, tokenId);

        emit ListingCancelled(tokenId, msg.sender);
    }

    // Get listing details
    function getListing(uint256 tokenId) external view returns (uint256, address, uint256, bool) {
        Listing memory listing = listings[tokenId];
        return (listing.tokenId, listing.seller, listing.price, listing.active);
    }
}