import React from "react";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 className="outfit-bold" style={{ fontSize: "4em", color: "#ffffff" }}>404</h1>
      <h2 className="outfit">Page Not Found</h2>
      <p className="bodytext">Sorry, the page you are looking for does not exist.</p>
      <a href="/" style={{ color: "#007bff", textDecoration: "none" }}className="bodytext" >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
