// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMyNFT {
    function transfer(address to, uint256 tokenId) external;
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract Auction {
    IMyNFT public nftContract;

    struct AuctionDetails {
        uint256 tokenId;
        address seller;
        address highestBidder;
        uint256 highestBid;
        uint256 endBlock; // Block number when auction ends
        bool active;
    }

    mapping(uint256 => AuctionDetails) public auctions;

    event AuctionStarted(uint256 indexed tokenId, address seller, uint256 startingPrice, uint256 endBlock);
    event BidPlaced(uint256 indexed tokenId, address bidder, uint256 amount);
    event AuctionEnded(uint256 indexed tokenId, address winner, uint256 amount);

    constructor(address _nftContractAddress) {
        nftContract = IMyNFT(_nftContractAddress);
    }

    function startAuction(uint256 tokenId, uint256 startingPrice) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Only owner can start auction");
        require(auctions[tokenId].active == false, "Auction already active");

        nftContract.transfer(address(this), tokenId); // Transfer NFT to contract
        auctions[tokenId] = AuctionDetails({
            tokenId: tokenId,
            seller: msg.sender,
            highestBidder: address(0),
            highestBid: startingPrice,
            endBlock: block.number + 2, // Ends after 2 blocks (~30s)
            active: true
        });

        emit AuctionStarted(tokenId, msg.sender, startingPrice, block.number + 2);
    }

    function bid(uint256 tokenId) external payable {
        AuctionDetails storage auction = auctions[tokenId];
        require(auction.active, "Auction not active");
        require(block.number < auction.endBlock, "Auction has ended");
        require(msg.value > auction.highestBid, "Bid must exceed current highest bid");

        // Refund previous bidder
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
        emit BidPlaced(tokenId, msg.sender, msg.value);
    }

    function endAuction(uint256 tokenId) external {
        AuctionDetails storage auction = auctions[tokenId];
        require(auction.active, "Auction not active");
        require(block.number >= auction.endBlock, "Auction has not ended yet");

        auction.active = false;
        if (auction.highestBidder != address(0)) {
            nftContract.transfer(auction.highestBidder, tokenId); // Transfer NFT to winner
            payable(auction.seller).transfer(auction.highestBid); // Pay seller
            emit AuctionEnded(tokenId, auction.highestBidder, auction.highestBid);
        } else {
            nftContract.transfer(auction.seller, tokenId); // Return NFT if no bids
            emit AuctionEnded(tokenId, auction.seller, 0);
        }
    }
}