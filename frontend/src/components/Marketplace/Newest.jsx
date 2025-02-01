import React from "react";
import "./marketplace.css";
import { useNavigate } from "react-router-dom";
import img1 from "../../images/market/newest/image.png";
import img2 from "../../images/market/newest/image-2.png";
import img3 from "../../images/market/newest/image-3.png";
import img4 from "../../images/market/newest/image-1.png";
import checkmark from "../../images/market/newest/checkmark.png";
import Newest_item from "./Newest-item";

const NewItems = [
  { name: "Digigenesis", image: img3,check: checkmark, address: "0.16 ETH" },
  { name: "Sunset 0.7FM", image: img1,  check: checkmark,address: "0.59 ETH"},
  { name: "Haleocean Int.", image: img4,check: checkmark, address: "0.34 ETH" },
  { name: "SnackHungry", image: img2,check: checkmark, address: "0.29 ETH" },
];


const Newest = () => {
  let navigate = useNavigate();
  let path = '/buy'
  
  return (
    <div className="container py-5 text-white">
      <div className="d-flex justify-content-between">
        <h4 className="outfit live-bid"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app" viewBox="0 0 16 16">
  <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z"/>
</svg>NEWEST ITEMS</h4>
        <a href="#" className="text-decoration-none">
            <p id='viewall' className="gray outfit">VIEW ALL
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              </svg>
            </p>
        </a>     
      </div>
      <div className="text-center mb-5"></div>
      <div className="row justify-content-center">
        {NewItems.map((item, index) => (
          <Newest_item
            key={index}
            name={item.name}
            image={item.image}
            checkmark={item.check}
            address={item.address}
            onClick={() => navigate(path)}
          />
        ))}
      </div>
    </div>
  );
};

export default Newest;
