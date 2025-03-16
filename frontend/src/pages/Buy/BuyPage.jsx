//============THIS PAGE IS ONLY ACCESSIBLE FROM CLICKING ON AN NFT BY AN USER============


import React, { useState, useEffect } from 'react'
import './buy.css'
import {useParams} from 'react-router-dom'
import Footer from '../../components/Footer/footer';
import menu from "../../assets/menu.svg"
import cash from "../../assets/cash.svg"
import more from "../../assets/more.svg"
import share from "../../assets/share.svg"
import Heart from "../../components/heart"
import api from "../../api"

const Buy = () => {
// FETCH THE ID OF THE NFT THAT THE USER CLICKED ON IN /MARKET
const {nft_id} = useParams();
const [nftData, setNftData] = useState();

useEffect(() => {
    //DEBUG CURRENT NFT ID
    console.log("Current NFT ID:", nft_id);
    const fetchNftId = async () => {
      try {
        const response = await api.get(`/nfts/${nft_id}`);
        //DEBUG THIS SHOULD LIST THE NFT DATA LIKE ID, NAMES, IMG PATH,...
        console.log("Response data:", response.data);
        setNftData(response.data);
      } catch (error) {
        //LOGGING ERRORS
        console.log("Error fetching NFT id:", error.response || error);
      }
    };

    fetchNftId();

    //DETECT ON NFT_ID CHANGE
  }, [nft_id]);

  // DEBUG PURPOSES
  if (!nftData) return <p>Loading...</p>;
  
  const usd_price = nftData.nft.current_price * 1944.6;
  
  return (
    <>
    <div className=' container'>
      <div className="d-flex row justiy-content-between outfit">

        <div className='col-4 hl mt-5 col-12 col-sm-10 col-md-8 col-lg-4 d-flex flex-column '>


        {/*---------------NAME ON SMALLER SCREEN---------------*/}
        <div className='d-flex d-lg-none justify-content-between mt-5 mx-3 mb-3'>
            <div>
              <h2>G-beans #475</h2>
              <p>Owned by <span className='blue'>5FB92B</span></p>
            </div>
            <div>
            <img src={share} alt=""  />
            <img src={more} alt="" />
          </div>         
        </div>

        {/*---------------IMAGE---------------*/}
      
        <img src={`http://127.0.0.1:8000${nftData.nft.image_path}`} alt="image of the chosen NFT item" className='item-img' />
              


        {/*---------------DESCRIPTION---------------*/}
          <div className='hl d-flex flex-column mt-4 mx-2 border-rounded bg-purple'>
            <h4 className='mt-3 mx-3 mb-0'>DESCRIPTION</h4><hr />
            
            <div className='mx-3'>

              {/* Split in two and make a new line */}
              {nftData.nft.description.split('\n').map((line,index) => ( 
                <p key={index}>{line}</p>
              ))}
              
            </div>
          </div>



          {/*---------------DETAILS---------------*/}
          <div className='hl d-flex flex-column mt-4 mx-2 mb-lg-4 border-rounded bg-purple'>
            <h4 className='mt-3 mx-3 mb-0'>DETAILS</h4><hr />
            
            <div className='mx-3'>
            <div class="d-flex w-100 justify-content-between">
              <p>Contract Address</p>
              <small>0x32bb...e36d</small>
            </div>

            <div class="d-flex w-100 justify-content-between">
                <p>Token ID</p>
                <small>475</small>
              </div>

              <div class="d-flex w-100 justify-content-between">
                <p>Token Standard</p>
                <small>ERC-721</small>
              </div>

              <div class="d-flex w-100 justify-content-between">
                <p>Chain</p>
                <small>Ethereum</small>
              </div>
            
              <div class="d-flex w-100 justify-content-between">
                <p>Last Updated</p>
                <small>2 years ago</small>
              </div>

              <div class="d-flex w-100 justify-content-between">
                <p>Creator Earnings</p>
                <small>10%</small>
              </div>
            </div>
          </div>

        
        </div>

      <div className='col-8 outfit bodytext col-4 hl mt-5 col-12 col-sm-10 col-md-8 col-lg-8'>


          {/*---------------NAME ON BIG SCREEN---------------*/}
          <div className='d-none d-lg-flex justify-content-between mt-5 mx-5 mb-3'>
          
            <div>
              <h2>{nftData.nft.nft_name}</h2>
                                        {/* nftData.nft.own_by */}
              <p>Owned by <span className='blue'>5FB92B</span></p>
            </div>         
            
            <Heart />
          </div>
          
          <div className='d-none d-lg-flex mx-5'>
          


              {/* SHARE ICON */}
              <a href="" className='svg-icon'> 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                </svg>
              </a>


              {/* 3 DOT ICON */}
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                </svg>
              </a>
            
          </div>


          {/*---------------CURRENT PRICE---------------*/}
          <div className='d-flex flex-column m-lg-5 border-rounded bg-purple'>
            <h4 className='mt-3 mx-3 mb-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="svg-icon-sm" viewBox="0 0 16 16">
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
              </svg>
              CURRENT PRICE
            </h4>
          <hr className='mt-0'/>
            
            <div className='mx-3 mt-1'>
              
            
              <h2>{nftData.nft.current_price}ETH</h2>
              {/* USD EQUIVALENT */}
              <p className='light-gray' style={{fontSize: "large"}}>${usd_price}</p>
                <button className='btn btn-primary btn-large subheading-text'>
                  ORDER NOW
                </button>
                <button className='btn btn-outline-secondary btn-large text-white subheading-text mx-lg-4 '>
                  MAKE OFFER
                </button>
              
            </div>
          </div>
<div>



</div>
          {/*---------------OFFER---------------*/}
          <div className='d-flex flex-column m-lg-5 mt-4 mb-5 border-rounded bg-purple offer-pb'>
          
            <h4 className='mt-3 mx-3 mb-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-list-ul svg-icon" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            </svg>
              OFFERS
            </h4>          
            <hr className='mt-0' />

            <div class="d-flex w-100 justify-content-between px-4">
              <p className='gray'>Price</p>
              <p className='gray'>Expiration</p>
              <p className='gray'>From</p>
            </div>
            <hr className='mt-0 mb-0'></hr>


                      {/*------OFFER LISTS------*/}
            <div className="collapsible">
              <div class="d-flex w-100 justify-content-between px-3">
                <p>6.3 ETH</p>
                <p>In 1 minute</p>
                <p>BBB017</p>
              </div>
              <div class="d-flex w-100 justify-content-between px-3">
                <p>4.2 ETH</p>
                <p>In 3 minute</p>
                <p>TrisT@1</p>
              </div>
              <div class="d-flex w-100 justify-content-between px-3">
                <p>3.1 ETH</p>
                <p>In 5 minute</p>
                <p>QweT4</p>
              </div>
              <div class="d-flex w-100 justify-content-between px-3">
                <p>2.3 ETH</p>
                <p>In 8 minute</p>
                <p>Halejah</p>
              </div>
              <div class="d-flex w-100 justify-content-between px-3">
                <p>1.3 ETH</p>
                <p>In 9 minute</p>
                <p>ARGAS</p>
              </div>
              <div class="d-flex w-100 justify-content-between px-3">
                <p>1.3 ETH</p>
                <p>In 9 minute</p>
                <p>ARGAS</p>
              </div>
              <div class="d-flex w-100 justify-content-between px-3">
                <p>1.3 ETH</p>
                <p>In 9 minute</p>
                <p>ARGAS</p>
              </div>
              <div class="d-flex w-100 justify-content-between px-3">
                <p>1.3 ETH</p>
                <p>In 9 minute</p>
                <p>ARGAS</p>
              </div>
            </div>
              

          </div>


        </div>

      </div>
    </div>

    <Footer />
    </>
  )
}

export default Buy