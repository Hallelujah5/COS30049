import React from 'react'
import './buy.css'
import Footer from '../../components/Footer/footer';
import img7 from "../../../../backend/static/images/market/image-10.png";
import menu from "../../assets/menu.svg"
import cash from "../../assets/cash.svg"
import more from "../../assets/more.svg"
import share from "../../assets/share.svg"
import Heart from "../../components/heart"
const Buy = () => {
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
          <img src={img7} alt="image of the chosen NFT item" className='item-img' />
              


        {/*---------------DESCRIPTION---------------*/}
          <div className='hl d-flex flex-column mt-4 mx-2 border-rounded bg-purple'>
            <h4 className='mt-3 mx-3'>DESCRIPTION</h4><hr />
            
            <div className='mx-3'>
              <p>By BongBearDestroyer</p>
              <p>2355 Bit Bears Ready to Build On BeraChain</p>
            </div>
          </div>


          {/*---------------DETAILS---------------*/}
          <div className='hl d-flex flex-column mt-4 mx-2 mb-lg-4 border-rounded bg-purple'>
            <h4 className='mt-3 mx-3'>DETAILS</h4><hr />
            
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
              <h2>G-beans #475</h2>
              <p>Owned by <span className='blue'>5FB92B</span></p>
            </div>         
            
            <Heart />
          </div>
          
          <div className='d-none d-lg-flex mx-5'>
          
              <img src={share} alt="show" className='svg-icon-sm' />
              <img src={more} alt="" className='svg-icon-sm' />
            
          </div>


          {/*---------------CURRENT PRICE---------------*/}
          <div className='d-flex flex-column m-lg-5 border-rounded bg-purple'>
            <h4 className='mt-3 mx-3'><img src={cash} alt="" className='svg-icon'/> CURRENT PRICE</h4><hr className='mt-0'/>
            
            <div className='mx-3 mt-1'>
              
            
              <h2>3.42ETH</h2>
              <p className='gray'>$11233.43</p>
              
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
          
            <h4 className='mt-3 mx-3 mb-0'><img src={menu} alt="" className='svg-icon' />OFFERS</h4>          
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