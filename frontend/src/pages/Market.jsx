import React from 'react'
import LiveBidding from '../components/Marketplace/LiveBidding'
import Newest from "../components/Marketplace/Newest"
import CreateNFT from "../components/Marketplace/CreateNFT"
import Footer from '../components/Footer/footer'
const Market = () => {
  return (
  <div>
    
      <LiveBidding />
      <Newest />
      <CreateNFT />
      <Footer />
  </div>
  )
}

export default Market