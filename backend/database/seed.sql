-- USE DATABASE
USE nft_db;

-- INSERT USERS
INSERT INTO Users (username) VALUES
('alice_eth'),
('bob_crypto'),
('charlie_nft'),
('diana_art'),
('ethan_trader');



-- INSERT NFTs
INSERT INTO NFTs (nft_name, own_by, current_price, description, image_path, token_id) VALUES
('G-Bean', 1, 2.81, 'By GreenGuru\n500 G-Beans Growing on the Ethereum Vine', '/static/images/market/image-10.png'),
('DooBeanz', 2, 3.75, 'By BeanMaster\n1000 DooBeanz Sprouting on Polygon Soil' , '/static/images/market/image-1.png'),
('GLHFers', 3, 2.23, 'By GameLord\n3000 GLHFers Battling on Solana Fields', '/static/images/market/image-3.png' ),
('Noxus', 4, 3.24,'By DarkForge\n1500 Noxus Warriors Forged on BeraChain', '/static/images/market/image-5.png'),
('PixelBeasts', 5, 4.86, 'By PixelPioneer\n2000 PixelBeasts Roaming the Binance Plains',  '/static/images/market/image.png'),
('Honey Jar', 4, 2.17, 'By SweetScribe\n800 Honey Jars Buzzing on Avalanche', '/static/images/market/image-2.png'),
('Tootsies', 2, 5.33, 'By FootFreak\n1200 Tootsies Dancing on Cardano Streets','/static/images/market/image-4.png'),
('Persona', 1, 3.89, 'By MaskMaker\n2500 Personas Unveiled on Ethereum Stages', '/static/images/market/image-6.png');




-- INSERT TRANSACTIONS
INSERT INTO Transactions (nft_id, from_address, to_address, price) VALUES
(1, '0x123abc456def789ghi', '0x987zyx654wvu321tsr', 0.55),
(2, '0x987zyx654wvu321tsr', '0xa1b2c3d4e5f6g7h8i9', 2.8),
(3, '0xa1b2c3d4e5f6g7h8i9', '0xabcdef1234567890abc', 1.3),
(4, '0xabcdef1234567890abc', '0x0f1e2d3c4b5a6a7b8c', 3.2),
(5, '0x0f1e2d3c4b5a6a7b8c', '0x123abc456def789ghi', 0.9);
