import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'

export default function App() {
  return (
  <BrowserRouter>
  <Navbar/>
  <Routes>
      <Route path='' element={<HomePage/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
  )
}
