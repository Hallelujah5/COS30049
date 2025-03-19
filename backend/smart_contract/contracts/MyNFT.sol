// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// MyNFT contract: Implements a basic ERC-721-like NFT with minting, transferring, and approval functionality
contract MyNFT {
    // Public counter for tracking the next available token ID
    uint256 public tokenIdCounter;
    // Address of the contract owner (set to deployer)
    address public owner;
    // Address of the marketplace contract (unused in current logic, set in constructor)
    address public marketplaceAddress;

    // Private mapping: Tracks which address owns each token ID
    mapping(uint256 => address) private tokenOwner;
    // Private mapping: Stores the URI (e.g., metadata link) for each token ID
    mapping(uint256 => string) private tokenURIs;
    // Private mapping: Counts how many tokens each address owns
    mapping(address => uint256) private ownedTokensCount;
    // Private mapping: Tracks approved addresses allowed to transfer specific token IDs
    mapping(uint256 => address) private tokenApprovals;

    // Event emitted when a token is transferred (minted, sold, etc.)
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    // Event emitted when an address is approved to transfer a token
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    // Event emitted when a new token is minted
    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);

    // Constructor: Initializes the contract with the deployer as owner and a marketplace address
    constructor(address _marketplaceAddress) {
        owner = msg.sender; // Set the deployer as the owner
        marketplaceAddress = _marketplaceAddress; // Store the marketplace address (not currently used)
        tokenIdCounter = 1; // Start token IDs at 1
    }

    // Modifier: Restricts function access to only the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    // Mint a new NFT and assign it to an address with a given URI
    function mintNFT(address to, string memory uri) public returns (uint256) {
        require(to != address(0), "Recipient cannot be zero address"); // Ensure recipient is valid
        uint256 newTokenId = tokenIdCounter; // Use the current counter as the new token ID

        tokenOwner[newTokenId] = to; // Assign ownership to the recipient
        tokenURIs[newTokenId] = uri; // Set the token's metadata URI
        ownedTokensCount[to] += 1; // Increment the recipient's token count
        // Note: Approval is not set here; it’s handled manually later

        emit Minted(to, newTokenId, uri); // Emit minting event
        emit Transfer(address(0), to, newTokenId); // Emit transfer event (from zero address for minting)

        tokenIdCounter += 1; // Increment the counter for the next token
        return newTokenId; // Return the newly minted token ID
    }

    // Approve an address to transfer a specific token on behalf of the owner
    function approve(address to, uint256 tokenId) public {
        require(msg.sender == tokenOwner[tokenId], "Only owner can approve"); // Only the token owner can approve
        tokenApprovals[tokenId] = to; // Set the approved address for this token
        emit Approval(msg.sender, to, tokenId); // Emit approval event
    }

    // View function: Get the approved address for a specific token ID
    function getApproved(uint256 tokenId) public view returns (address) {
        return tokenApprovals[tokenId]; // Return the approved address
    }

    // View function: Get the owner of a specific token ID
    function ownerOf(uint256 tokenId) public view returns (address) {
        address tokenHolder = tokenOwner[tokenId]; // Fetch the owner
        require(tokenHolder != address(0), "Token does not exist"); // Ensure the token exists
        return tokenHolder; // Return the owner’s address
    }

    // View function: Get the URI (metadata) of a specific token ID
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(tokenOwner[tokenId] != address(0), "Token does not exist"); // Ensure the token exists
        return tokenURIs[tokenId]; // Return the token’s URI
    }

    // View function: Get the number of tokens owned by an address
    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0), "Cannot query zero address"); // Ensure the address is valid
        return ownedTokensCount[_owner]; // Return the token count
    }

    // Transfer a token to a new address (caller must be owner or approved)
    function transfer(address to, uint256 tokenId) public {
        require(to != address(0), "Cannot transfer to zero address"); // Ensure recipient is valid
        require(
            msg.sender == tokenOwner[tokenId] || msg.sender == tokenApprovals[tokenId],
            "Only owner or approved address can transfer"
        ); // Restrict to owner or approved address

        address from = tokenOwner[tokenId]; // Get current owner
        tokenApprovals[tokenId] = address(0); // Clear approval after transfer
        ownedTokensCount[from] -= 1; // Decrease sender’s token count
        ownedTokensCount[to] += 1; // Increase recipient’s token count
        tokenOwner[tokenId] = to; // Update ownership

        emit Transfer(from, to, tokenId); // Emit transfer event
    }
}