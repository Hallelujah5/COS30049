import React, { useState } from 'react';
import './heart.css'

const Heart = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked); // Toggle between liked and not liked
  };

  return (
    <svg
      onClick={toggleLike}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="25"
      height="25"
      fill={liked ? "red" : "none"} 
      stroke={liked ? "red" : "gray"} 
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
    >
      <path d="M12 21C12 21 3 13.2 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 12 4.33 12 4.33C12 4.33 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 13.2 12 21 12 21Z" />
    </svg>
  );
};

export default Heart;
