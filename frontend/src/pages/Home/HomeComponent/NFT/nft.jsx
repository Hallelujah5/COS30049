import React from 'react'
import nft_img from '../../../../assets/images/homepage/nft.png'
const NFT = () => {
  return (
    <>

<div className="container col-xxl-8 px-4 py-5 text-white">
    <div className="row flex-wrap flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src={nft_img} className="d-block mx-lg-auto image-container"  alt="" width="700" height="500" loading="lazy"></img>
      </div>
      <div className="col-lg-6">
      <p className='outfit teal subheading-text'>24/7 ACCESS</p>
      <h1 className='display-5 fw-bold lh-1 mb-3 outfit-bold'>Trade Your NFTs, Anytime, Anywhere</h1>
        <p className="bodytext">With our easy-to-use platform, you can buy or sell assets from anywhere in the world, at any time.</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        <button type="button" className="btn btn-purple NFT outfit-bold">GET STARTED</button>
        </div>
      </div>
    </div>
</div>
    </>
  )
}

export default NFT
