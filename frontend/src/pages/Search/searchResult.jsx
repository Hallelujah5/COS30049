//Reused from Market/LiveBidding

import React from "react";
import { useNavigate } from "react-router-dom";
import "../Market/MarketComponent/marketplace.css";
import img7 from "../../../../backend/static/images/market/image-10.png";
import BiddingItem from "../Market/MarketComponent/LiveBidding-item";

const biddingItems = [
  {
    name: "G-bean",
    image: img7,
    text: "Highest bid 1/16",
    day: "14d",
    address: "0.477wETH",
  },
    
];

const SearchResult = () => {
  let navigate = useNavigate();
  let path = "/buy";
  return (

    <>
    <div className="container text-white">
      <div className="d-flex justify-content-between mt-5">
        <h4 className="outfit-reg live-bid">
          Result:
        </h4>
      </div>

      <div className="text-center mb-5"></div>
        <div className="row mt-5 mb-5" id="navbar-example">
          {biddingItems.map((item, index) => (
            <BiddingItem
              key={index}
              className={`bidding-item ${index >= 4 ? "hidden-sm" : ""}`}
              name={item.name}
              image={item.image}
              text={item.text}
              day={item.day}
              address={item.address}
              onClick={() => {
                navigate(path);
              }}
            />
          ))}
        </div>
    </div>

    </>

  );
};

export default SearchResult;
