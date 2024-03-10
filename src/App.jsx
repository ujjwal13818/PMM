import React from 'react'
import LP from './Pages/LP/LP';
import { Routes,Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LikePrompts from './Utils/LikePrompts/LikePrompts';




const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LP />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
}

export default App