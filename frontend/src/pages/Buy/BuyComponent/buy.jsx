import React from 'react'
import './buy.css'
import img7 from "../../../assets/images/market/image-10.png";

const Buy = () => {
  return (
    <>
    <div className=' container'>
      <div className="d-flex row justiy-content-between outfit">

        <div className='col-4 hl mt-5 col-12 col-sm-10 col-md-8 col-lg-4 d-flex flex-column '>

          <img src={img7} alt="image of the chosen NFT item" className='item-img' />

        
          <div className='hl d-flex flex-column mt-4 mx-2 border-rounded bg-purple'>
            <h4 className='mt-3 mx-3'>DESCRIPTION</h4><hr />
            
            <div className='mx-3'>
              <p>By BongBearDestroyer</p>
              <p>2355 Bit Bears Ready to Build On BeraChain</p>
            </div>
          </div>


          <div className='hl d-flex flex-column mt-4 mx-2 border-rounded bg-purple'>
            <h4 className='mt-3 mx-3'>DETAILS</h4><hr />
            
            <div className='mx-3'>
              <p>Contract Address</p>
              <p>Token ID</p>
              <p>Token ID</p>
              <p>Token ID</p>
            </div>
          </div>

        
        </div>


        <div className='col-8 hl outfit bodytext col-4 hl mt-5 col-12 col-sm-10 col-md-8 col-lg-8 '>

          <div className='d-flex justify-content-between hl mt-5 mx-5 mb-3'>
            <div>
              <h2>G-beans #475</h2>
              <p>Owned by <span className='blue'>5FB92B</span></p>
            </div>
            <div>
              <p>Heart, Like</p>
            </div>
          </div>


          <div className='hl d-flex hl-bold-text mx-5'>
              <p>2,1k Views</p>
              <p className='mx-3'>110 Likes</p>
          </div>



          <div className='hl d-flex flex-column m-5 border-rounded bg-purple'>
            <h4 className='mt-3 mx-3'>CURRENT PRICE</h4><hr />
            
            <div className='mx-3 mt-1'>
              <h2>3.42ETH</h2>
              <p className='gray'>$11233.43</p>
              
                <button className='btn btn-primary btn-large subheading-text'>
                  ORDER NOW
                </button>
                <button className='btn btn-outline-secondary btn-large text-white subheading-text mx-4 '>
                  MAKE OFFER
                </button>
              
            </div>
          </div>

        </div>

      </div>
    </div>

    
    
    </>
  )
}

export default Buy