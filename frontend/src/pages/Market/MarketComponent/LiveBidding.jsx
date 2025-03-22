import React, { useState, useEffect } from "react";
import api from "../../../api"
import { useNavigate } from 'react-router-dom'
import "./marketplace.css";
import BiddingItem from "./LiveBidding-item";


const Bidding = () => {
  const limit = 8;
  const [biddingItems, setBiddingItems] = useState([]); 
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  

  //NAVIGATE TO BUY 
  let navigate = useNavigate();
  let path = '/buy'   

  // FETCH 8 NFTS PER PAGE LOAD, FETCH TOTAL NUMBER OF PAGES.
  //FETCHING NFT WITH 'LIST' STATUS
  useEffect(() => {
    const fetchNFTs = async() => {
      try {
        const response = await api.get(`/nfts?nft_status=list&page=${page}&limit=${limit}`)
        setBiddingItems(response.data.nfts)           
        setTotalPage(response.data.totalPage)


        //CONSOLE DEBUG
        console.log("NFT data response:",biddingItems)
        console.log("Total page:", totalPage)
      }
      catch (error) {
          console.log("Error fetching NFT data:" , error)
      }
    };

    //run it
    fetchNFTs()


    //ON PAGE RELOAD
  }, [page]);


  // THIS HELPS TO DIVIDE THE PAGES INTO AN ARRAY OF [1, 2, 3, 4, 5, ..., 10]
  const pageList = Array.from({length: totalPage}, (_, i) => i +1 )
  const handlePageClick = (num) => {setPage(num)}

  return (
    
    <div className="container py-5 text-white">
      <div className="d-flex justify-content-between mt-5">
        <h4 className="outfit live-bid">


        {/*Subheading*/}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app" viewBox="0 0 16 16">
          <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z"/>
          </svg>FEATURED SALES</h4>

        <a href="#" className="text-decoration-none">
          <p id='viewall'  className="gray outfit">VIEW ALL
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </p>
        </a>
        
      </div>


      {/* LIVE BIDDING SECTION */}
      <div className="text-center mb-5">
        <div className="row mt-5" id="navbar-example">

          {/* LOOP EACH NFTs */}
          { biddingItems.length > 0 ? 
            (biddingItems.map((item, index) => (
            <BiddingItem
              key={item.nft_id}
              className={`bidding-item ${index >= 4 ? "hidden-sm" : ""}`}
              name={item.nft_name}
              image={`https://ipfs.io/ipfs/${item.image_path.replace("ipfs://","")}`}
              text={item.short_description}
              address={item.own_by}
              onClick={() => {  navigate(`${path}/${item.nft_id}`)}}
            />
          ))) :
          // IF NO NFTs, DISPLAY A MESSAGE
          (<p>No NFTs Available.</p>)
        }
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
