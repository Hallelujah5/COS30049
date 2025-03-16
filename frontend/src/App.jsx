import React from "react";
import Navbar from "./components/NavBar/NavBar";
import Homepage from "./pages/Home/Homepage";
import NotFound from "./pages/Notfound/notfound";
import About from "./pages/About/About";
import Market from "./pages/Market/Market";
import Buy from "./pages/Buy/BuyPage";
import Profile from "./pages/Profile/ProfilePage";
import Search from "./pages/Search/SearchPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    // ALL THE POSSIBLE PATHS IN THE WEBSITE, ANYTHING ELSE WILL RESULT IN THE 404 ERROR PAGE.
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/market" element={<Market />} />
        <Route path="/buy/:nft_id" element={<Buy />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/create" element={<Create />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
