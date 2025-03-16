-- Active: 1730779438518@@127.0.0.1@3307@nft_db
----------------------------------------
----------SQL TO CREATE TABLES----------


--CREATE DATABASE IF NOT EXIST--
CREATE DATABASE IF NOT EXISTS nft_db;
USE nft_db;


----DROP TABLE IF EXISTS----

DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS NFTs;
DROP TABLE IF EXISTS Users;


CREATE TABLE Users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE DEFAULT 'Unnamed',
    user_wallet VARCHAR(255) NOT NULL UNIQUE,
    date_join TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    short_address VARCHAR(6) NOT NULL
);

CREATE TABLE NFTs(
    nft_id INT AUTO_INCREMENT PRIMARY KEY,
    nft_name VARCHAR(255) NOT NULL,
    own_by INT,
    current_price DECIMAL(18, 8) NOT NULL,
    short_description TEXT,
    description TEXT,
    image_path VARCHAR(255),
    exp_date INT NOT NULL,
    FOREIGN KEY (own_by) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE TABLE Transactions(
    transac_id INT AUTO_INCREMENT PRIMARY KEY,
    nft_id INT NOT NULL,
    from_address VARCHAR(255) NOT NULL,
    to_address VARCHAR(255) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price DECIMAL(18,8) NOT NULL,
    FOREIGN KEY (nft_id) REFERENCES NFTs(nft_id) ON DELETE CASCADE

);