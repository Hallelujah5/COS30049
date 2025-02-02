import React from "react";
import { useNavigate } from 'react-router-dom'
import "./marketplace.css";
import img1 from "../../images/market/image-1.png";
import img2 from "../../images/market/image-2.png";
import img3 from "../../images/market/image-3.png";
import img4 from "../../images/market/image-4.png";
import img5 from "../../images/market/image-5.png";
import img6 from "../../images/market/image-6.png";
import img7 from "../../images/market/image-10.png";
import img8 from "../../images/market/image.png";
import BiddingItem from "./LiveBidding-item";



const biddingItems = [
  { name: "G-bean", image: img7, text: "Highest bid 1/16", day: "14d", address: "0.477wETH" },
  { name: "DooBeanz", image: img1, text: "Highest bid 1/31.", day: "6d", address: "0.477wETH" },
  { name: "GLHFers", image: img3, text: "Highest bid 5/25.", day: "21d", address: "0.477wETH" },
  { name: "Noxus", image: img5, text: "Highest bid 3/16.", day: "23d", address: "0.477wETH" },
  { name: "Pixelbeasts", image: img8, text: "Highest bid 1/20.", day: "2d", address: "0.477wETH" },
  { name: "Honey jar", image: img2, text: "Highest bid 1/52.", day: "56d", address: "0.477wETH" },
  { name: "Tootsies", image: img4, text: "Highest bid 2/24.", day: "39d", address: "0.477wETH" },
  { name: "Persona", image: img6, text: "Highest bid 1/20.", day: "35d", address: "0.477wETH" },
];


const Bidding = () => {
  let navigate = useNavigate();
  let path = '/buy'
  return (
    <div className="container py-5 text-white">
      <div className="d-flex justify-content-between">
        <h4 className="outfit live-bid">


        {/*Subheading*/}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app" viewBox="0 0 16 16">
          <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z"/>
          </svg>LIVE BIDDING</h4>

        <a href="#" className="text-decoration-none">
          <p id='viewall'  className="gray outfit">VIEW ALL
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </p>
        </a>
        
      </div>


      <div className="text-center mb-5"></div>
      <div className="row justify-content-center">
        {biddingItems.map((item, index) => (
          <BiddingItem
            key={index}
            className={`bidding-item ${index >= 4 ? "hidden-sm" : ""}`} 
            name={item.name}
            image={item.image}
            text={item.text}
            day={item.day}
            address={item.address}
            onClick={() => {  navigate(path)}}
          />
        ))}
      </div>
      <p className="gray mx-3">Bidding updates every 10s</p>
    </div>
  );
};

export default Bidding;
