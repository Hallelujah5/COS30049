import { Link } from 'react-router-dom'; 
import React, { useState } from 'react';
import './navbar.css';
import wallet from '../../images/navbar/wallet.png';
import logo from '../../images/navbar/xyora2.png';
import userIcon from '../../images/user-icon.svg'


function isLoggedIn() {
  const [user, setUser] = useState(false);

  if (!user) {
    return <button id="wallet" onClick={() => {setUser(!user)}} className="btn "><img src={wallet} alt="" />Connect Wallet</button>   
  }
  else {
    return <span>
    <form class="d-flex form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <Link to="/profile"><img src={userIcon} alt="White user icon" id='user-icon' /></Link>   </form>
      
      </span>
  }

}




const Navbar = () => {


  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container-fluid navbar-container" style={{ maxWidth: '87.5%' }}>
        <Link to="/"><img id='logo-img' src={logo} alt="" /></Link>
        
        {/* Hamburger nav for small screen */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* Nav links */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-left"> 
            <li className="nav-item">
              <Link className="nav-link roboto" aria-current="page" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link roboto" to="/market">Marketplace</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link roboto" to="/contact">Contact</Link>
            </li>
            </ul>
            <ul className="navbar-nav ms-auto">
            <li className="nav-item roboto">
              {isLoggedIn()}

            </li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
