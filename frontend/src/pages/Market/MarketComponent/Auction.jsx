import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useNavigate } from "react-router-dom";
import "./marketplace.css";
import BiddingItem from "./LiveBidding-item";

const Bidding = () => {
  const limit = 4;
  const [biddingItems, setBiddingItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  //NAVIGATE TO BUY
  let navigate = useNavigate();
  let path = "/buy";

  // FETCH 8 NFTS PER PAGE LOAD, FETCH TOTAL NUMBER OF PAGES.
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await api.get(
          `/nfts?auction_status=true&page=${page}&limit=${limit}`
        );
        setBiddingItems(response.data.nfts);
        setTotalPage(response.data.totalPage);

        //CONSOLE DEBUG
        console.log("NFT data response:", biddingItems);
        console.log("Total page:", totalPage);
      } catch (error) {
        console.log("Error fetching NFT data:", error);
      }
    };

    //run it
    fetchNFTs();

    //ON PAGE RELOAD
  }, [page]);

  // THIS HELPS TO DIVIDE THE PAGES INTO AN ARRAY OF [1, 2, 3, 4, 5, ..., 10]
  const pageList = Array.from({ length: totalPage }, (_, i) => i + 1);
  const handlePageClick = (num) => {
    setPage(num);
  };

  return (
    <div className="container py-5 text-white">
      <div className="d-flex justify-content-between mt-5">
        <h4 className="outfit live-bid">
          {/*Subheading*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-app"
            viewBox="0 0 16 16"
          >
            <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z" />
          </svg>
          AUCTION NOW
        </h4>
      </div>

      {/* AUCTION SECTION */}
      <div className="text-center mb-5">
        <div className="row mt-5" id="navbar-example">
          {/* LOOP EACH NFTs */}
          {biddingItems.length > 0 ? (
            biddingItems.map((item, index) => (
              <BiddingItem
                key={item.nft_id}
                className={`bidding-item ${index >= 4 ? "hidden-sm" : ""}`}
                name={item.nft_name}
                image={`http://127.0.0.1:8000${item.image_path}`}
                text={item.short_description}
                address={item.own_by}
                onClick={() => {
                  navigate(`${path}/${item.nft_id}`);
                }}
              />
            ))
          ) : (
            // IF NO NFTs, DISPLAY A MESSAGE
            <p>No NFTs Available.</p>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between mx-3">
        <p className="gray mx-3">Bidding updates every 10s</p>

        {/* ==========PAGINATION========== */}
        {/* Doesn't have ..., so if too many pages, it would list forever. */}
        <div>
          {pageList.map((num) => (
            <button
              key={num}
              className={`btn mx-1 ${
                num === page ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() => handlePageClick(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bidding;
