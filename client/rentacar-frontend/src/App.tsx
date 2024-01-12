import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import About from './pages/About/About'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import CarsPage from './pages/CarsPage/CarsPage'
import Checkout from './pages/Checkout/Checkout'
 


function App() {

  return (
    <>
       <div>
        
        <Navbar/>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/cars" element={<CarsPage/>} />
            <Route path="/checkout/:id" element={<Checkout/>} />
          </Routes>
        <Footer/>
        
      </div>
    </>
  )
}

export default App
