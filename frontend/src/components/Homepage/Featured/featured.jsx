import React, { useState, useEffect } from 'react';
import './featured.css'
import fc from '../../../assets/images/featured/FC.png'
import forbe from '../../../assets/images/featured/Forbes.png'
import idk from '../../../assets/images/featured/idk.png'
import TC from '../../../assets/images/featured/TC.png'  
import tcSmall from '../../../assets/images/featured/TC-sm.png';
const Featured = () => {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
  
    useEffect(() => {
      const handleResize = () => setIsSmallScreen(window.innerWidth < 1200);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  



  return (
    <>  

<div className="container col-xxl-8 px-4 py-5 text-white">
        <h3 className='outfit subheading-text'>FEATURED ON</h3>


        <div className="featured-bar">
            <div className="featured-item"><img src={fc} alt="" /></div>
            <div className="featured-item"><img src={forbe} alt="" /></div>
            <div className="featured-item"><img src={idk} alt="" /></div>
            <div className="featured-item"><img src={isSmallScreen ? tcSmall : TC} alt="Featured on TC" /></div>
                
        </div>
    </div>
    </>
  )
}

export default Featured