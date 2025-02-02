import React from 'react'
import LiveBidding from './MarketComponent/LiveBidding'
import Newest from "./MarketComponent/Newest"
import CreateNFT from "./MarketComponent/CreateNFT"
import Footer from '../../components/Footer/footer'
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