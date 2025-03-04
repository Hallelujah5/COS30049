-- USE DATABASE
USE nft_db;

-- INSERT USERS
INSERT INTO Users (username, user_wallet) VALUES
('alice_eth', '0x123abc456def789ghi'),
('bob_crypto', '0x987zyx654wvu321tsr'),
('charlie_nft', '0xa1b2c3d4e5f6g7h8i9'),
('diana_art', '0xabcdef1234567890abc'),
('ethan_trader', '0x0f1e2d3c4b5a6a7b8c');

-- INSERT NFTs
INSERT INTO NFTs (nft_name, own_by, current_price, description, details, image_path) VALUES
('CryptoKitty #1', 1, 0.5, 'Rare Gen 1 CryptoKitty', 'Orange with stripes', 'static/images/kitty1.png'),
('Bored Ape #99', 2, 2.75, 'Exclusive Bored Ape NFT', 'Gold fur, sunglasses', 'static/images/ape99.png'),
('Pixel Punk #42', 3, 1.2, 'One of the original Pixel Punks', 'Mohawk, green skin', 'static/images/punk42.png'),
('MetaSpace #777', 4, 3.1, '3D-rendered space art', 'Galaxy-themed NFT', 'static/images/space777.png'),
('Moonshot Art', 5, 0.8, 'Surreal NFT artwork', 'Depicts an astronaut on Mars', 'static/images/moonshot.png');

-- INSERT TRANSACTIONS
INSERT INTO Transactions (nft_id, from_address, to_address, price) VALUES
(1, '0x123abc456def789ghi', '0x987zyx654wvu321tsr', 0.55),
(2, '0x987zyx654wvu321tsr', '0xa1b2c3d4e5f6g7h8i9', 2.8),
(3, '0xa1b2c3d4e5f6g7h8i9', '0xabcdef1234567890abc', 1.3),
(4, '0xabcdef1234567890abc', '0x0f1e2d3c4b5a6a7b8c', 3.2),
(5, '0x0f1e2d3c4b5a6a7b8c', '0x123abc456def789ghi', 0.9);
