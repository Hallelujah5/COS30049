import React from 'react'
import stock from '../../../../assets/images/homepage/stock.png'
import {motion} from "motion/react"
const Transparency = () => {
  return (
    <>

<div className="container col-xxl-8 px-4 py-5 text-white">
    <div className="row flex-wrap flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <p className='outfit teal subheading-text'>TRANSPARENCY</p>
        <h1 className='display-5 fw-bold lh-1 mb-3 outfit-bold'>Seamless Trading, Redefined</h1>
        <p className="herotext">Seamlessly access the future of trading with our blockchain-powered platform, designed for ultimate security and efficiency.</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <motion.button whileTap={{scale:0.9}} type="button" className="btn btn-purple NFT outfit-bold">TRADE NOW</motion.button>
        </div>
        
      </div>
      <div className="col-lg-6">
      <img src={stock} className="d-block mx-lg-auto image-container"  alt="" width="700" height="500" loading="lazy"></img>
      </div>
    </div>
</div>




    </>
  )
}

export default Transparency

