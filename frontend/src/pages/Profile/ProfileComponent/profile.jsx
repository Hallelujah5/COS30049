import React from "react";
import './profile.css'
import userBanner from "../../../assets/images/profile/userbanner.png";
import wallet from "../../../assets/images/profile/wallet.png";
import calendar from "../../../assets/images/profile/calendar.png";


const Profile = () => {
  const user = {
    name: "John Doe",
    wallet: "EX182QJ9",
    date: "11/09/2025",
    bio: "A passionate developer who loves coding and coffee! ☕",
    avatar: "https://i.pravatar.cc/150?img=8  ", // Random pfp
    banner: userBanner,
  };

  return (
    <>
      <div className=" min-h-screen bg-gray-100">
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center">
            <img className="img-banner" src={user.banner} alt="background image" /><br/>
          </div>
          <br />
          
        </div>

      </div>

      <div className="profile-data">
            <div className="d-flex flex-column justify-content-center">
              <img className="img-avatar" src={user.avatar} alt="User Avatar" />
            </div>
            <h2 className="profile-name">{user.name}</h2>
             <p className="profile-wallet"><img className="profile-icon" src={wallet} alt="Wallet" /> {user.wallet} &nbsp;&nbsp;&nbsp;<img className="profile-icon" src={calendar} alt="Date Joined" />{user.date}</p>
            <p className="profile-bio">{user.bio}</p>
          </div>
    </>
  );
};

export default Profile;