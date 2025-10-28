import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import CartItem from './pages/CartItem';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartItem />} />
      </Routes>
    </div>
  )
}

export default App