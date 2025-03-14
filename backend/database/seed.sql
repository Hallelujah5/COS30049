-- USE DATABASE
USE nft_db;


DELIMITER //

CREATE TRIGGER before_insert_users
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
    SET @wallet_address = CONCAT(
        '0x',
        LOWER(SUBSTR(HEX(FLOOR(RAND() * POW(16, 15))), 1, 20))
    );
    SET NEW.user_wallet = @wallet_address;
    SET NEW.short_address = UPPER(SUBSTR(@wallet_address, 3, 6));

END;//

DELIMITER ;
-- INSERT USERS
INSERT INTO Users (username) VALUES
('alice_eth'),
('bob_crypto'),
('charlie_nft'),
('diana_art'),
('ethan_trader');

-- INSERT NFTs
INSERT INTO NFTs (nft_name, own_by, current_price, description, image_path, exp_date) VALUES
('G-Bean', 1, 2.1, 'Highest bid 1/16', '/static/images/market/image-10.png', 14),
('DooBeanz', 2, 2.75, 'Highest bid 1/31', '/static/images/market/image-1.png', 6),
('GLHFers', 3, 1.2, 'Highest bid 5/25', '/static/images/market/image-3.png', 21),
('Noxus', 4, 3.1, 'Highest bid 3/16', '/static/images/market/image-5.png', 23),
('PixelBeasts', 5, 0.8, 'Highest bid 1/120',  '/static/images/market/image.png', 2),
('Honey Jar', 4, 2, 'Highest bid 1/52', '/static/images/market/image-2.png', 43),
('Tootsies', 2, 5.3, 'Highest bid 2/24', '/static/images/market/image-4.png', 36),
('Persona', 1, 2.8, 'Highest bid 1/20', '/static/images/market/image-6.png', 35);


-- INSERT TRANSACTIONS
INSERT INTO Transactions (nft_id, from_address, to_address, price) VALUES
(1, '0x123abc456def789ghi', '0x987zyx654wvu321tsr', 0.55),
(2, '0x987zyx654wvu321tsr', '0xa1b2c3d4e5f6g7h8i9', 2.8),
(3, '0xa1b2c3d4e5f6g7h8i9', '0xabcdef1234567890abc', 1.3),
(4, '0xabcdef1234567890abc', '0x0f1e2d3c4b5a6a7b8c', 3.2),
(5, '0x0f1e2d3c4b5a6a7b8c', '0x123abc456def789ghi', 0.9);
