// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyNFT {
    uint256 public tokenIdCounter;
    address public owner;
    address public marketplaceAddress;

    mapping(uint256 => address) private tokenOwner;
    mapping(uint256 => string) private tokenURIs;
    mapping(address => uint256) private ownedTokensCount;
    mapping(uint256 => address) private tokenApprovals;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);

    constructor(address _marketplaceAddress) {
        owner = msg.sender;
        marketplaceAddress = _marketplaceAddress;
        tokenIdCounter = 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    function mintNFT(address to, string memory uri) public returns (uint256) {
        require(to != address(0), "Recipient cannot be zero address");
        uint256 newTokenId = tokenIdCounter;

        tokenOwner[newTokenId] = to;
        tokenURIs[newTokenId] = uri;
        ownedTokensCount[to] += 1;
        // Don’t set approval here—do it manually later

        emit Minted(to, newTokenId, uri);
        emit Transfer(address(0), to, newTokenId);

        tokenIdCounter += 1;
        return newTokenId;
    }

    function approve(address to, uint256 tokenId) public {
        require(msg.sender == tokenOwner[tokenId], "Only owner can approve");
        tokenApprovals[tokenId] = to;
        emit Approval(msg.sender, to, tokenId);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        return tokenApprovals[tokenId];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address tokenHolder = tokenOwner[tokenId];
        require(tokenHolder != address(0), "Token does not exist");
        return tokenHolder;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(tokenOwner[tokenId] != address(0), "Token does not exist");
        return tokenURIs[tokenId];
    }

    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0), "Cannot query zero address");
        return ownedTokensCount[_owner];
    }

    function transfer(address to, uint256 tokenId) public {
        require(to != address(0), "Cannot transfer to zero address");
        require(
            msg.sender == tokenOwner[tokenId] || msg.sender == tokenApprovals[tokenId],
            "Only owner or approved address can transfer"
        );

        address from = tokenOwner[tokenId];
        tokenApprovals[tokenId] = address(0); // Clear approval
        ownedTokensCount[from] -= 1;
        ownedTokensCount[to] += 1;
        tokenOwner[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }
}