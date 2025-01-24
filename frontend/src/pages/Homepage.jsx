import React from 'react'
import Hero from '../components/Homepage/Hero/Hero'
import Featured from '../components/Homepage/Featured/featured'
import Transparency from '../components/Homepage/Transparency/transparency'
import NFT from '../components/Homepage/NFT/nft'
import Testimony from '../components/Homepage/Testimonial/testimony'
import Footer from '../components/Footer/footer'
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
