import React from 'react'
import Hero from './HomeComponent/Hero/Hero'
import Featured from './HomeComponent/Featured/featured'
import Transparency from './HomeComponent/Transparency/transparency'
import NFT from './HomeComponent/NFT/nft'
import Testimony from './HomeComponent/Testimonial/testimony'
import Footer from '../../components/Footer/footer'
const Homepage = () => {
  return (
    <>
    <Hero />
    <Featured />
    <Transparency />
    <NFT />
    <Testimony />
    <Footer />
    </>
  )
}

export default Homepage
