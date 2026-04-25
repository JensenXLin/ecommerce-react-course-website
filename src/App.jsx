import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import NavBar from './components/NavBar'

function App() {

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  )
}

export default App
