// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for interacting with the MyNFT contract (minimal subset)
interface IMyNFT {
    function transfer(address to, uint256 tokenId) external; // Transfer a token
    function ownerOf(uint256 tokenId) external view returns (address); // Get token owner
}

// Auction contract: Manages NFT auctions with a block-based duration
contract Auction {
    // Reference to the MyNFT contract instance
    IMyNFT public nftContract;

    // Struct: Defines the details of an auction
    struct AuctionDetails {
        uint256 tokenId; // ID of the NFT being auctioned
        address seller; // Address of the seller
        address highestBidder; // Current highest bidder
        uint256 highestBid; // Current highest bid amount in wei
        uint256 endBlock; // Block number when the auction ends
        bool active; // Whether the auction is still ongoing
    }

    // Mapping: Stores auction details by token ID
    mapping(uint256 => AuctionDetails) public auctions;

    // Event emitted when an auction starts
    event AuctionStarted(uint256 indexed tokenId, address seller, uint256 startingPrice, uint256 endBlock);
    // Event emitted when a bid is placed
    event BidPlaced(uint256 indexed tokenId, address bidder, uint256 amount);
    // Event emitted when an auction ends
    event AuctionEnded(uint256 indexed tokenId, address winner, uint256 amount);

    // Constructor: Initializes the auction contract with the MyNFT contract address
    constructor(address _nftContractAddress) {
        nftContract = IMyNFT(_nftContractAddress); // Set the NFT contract reference
    }

    // Start an auction for an NFT with a starting price
    function startAuction(uint256 tokenId, uint256 startingPrice) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Only owner can start auction"); // Caller must own the NFT
        require(auctions[tokenId].active == false, "Auction already active"); // No existing auction for this token

        nftContract.transfer(address(this), tokenId); // Transfer NFT to the auction contract (requires approval)
        auctions[tokenId] = AuctionDetails({ // Create a new auction
            tokenId: tokenId,
            seller: msg.sender,
            highestBidder: address(0), // No bidder yet
            highestBid: startingPrice, // Set initial bid as starting price
            endBlock: block.number + 2, // Auction ends after 2 blocks (~30s on average)
            active: true
        });

        emit AuctionStarted(tokenId, msg.sender, startingPrice, block.number + 2); // Emit start event
    }

    // Place a bid on an active auction
    function bid(uint256 tokenId) external payable {
        AuctionDetails storage auction = auctions[tokenId]; // Get the auction details (storage for modification)
        require(auction.active, "Auction not active"); // Ensure auction is ongoing
        require(block.number < auction.endBlock, "Auction has ended"); // Check if within block limit
        require(msg.value > auction.highestBid, "Bid must exceed current highest bid"); // Bid must be higher

        if (auction.highestBidder != address(0)) { // If there’s a previous bidder
            payable(auction.highestBidder).transfer(auction.highestBid); // Refund the previous highest bid
        }

        auction.highestBidder = msg.sender; // Update highest bidder
        auction.highestBid = msg.value; // Update highest bid
        emit BidPlaced(tokenId, msg.sender, msg.value); // Emit bid event
    }

    // End an auction and distribute the NFT and funds
    function endAuction(uint256 tokenId) external {
        AuctionDetails storage auction = auctions[tokenId]; // Get the auction details (storage for modification)
        require(auction.active, "Auction not active"); // Ensure auction is ongoing
        require(block.number >= auction.endBlock, "Auction has not ended yet"); // Check if end block is reached

        auction.active = false; // Mark auction as ended
        if (auction.highestBidder != address(0)) { // If there was a bid
            nftContract.transfer(auction.highestBidder, tokenId); // Transfer NFT to the highest bidder
            payable(auction.seller).transfer(auction.highestBid); // Send ETH to the seller
            emit AuctionEnded(tokenId, auction.highestBidder, auction.highestBid); // Emit end event with winner
        } else { // If no bids were placed
            nftContract.transfer(auction.seller, tokenId); // Return NFT to the seller
            emit AuctionEnded(tokenId, auction.seller, 0); // Emit end event with no winner
        }
    }
}