import React from 'react'
import Navbar from './components/NavBar/NavBar'
import Homepage from './pages/Homepage'
import NotFound from './components/Notfound/notfound'
import About from './pages/About'
import Market from './pages/Market'
import Buy from './pages/BuyPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/market" element={<Market />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        
    </Router>
  )
}

export default App