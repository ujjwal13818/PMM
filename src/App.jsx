import React from 'react'
import LP from './Pages/LP/LP';
import { Routes,Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useSiso } from './Context/siso';
import MyPosts from './Pages/MyPosts/MyPosts';





const App = () => {


  return (
    <Routes>
      <Route path="/" element={<LP />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/myposts" element={<MyPosts />}></Route>
    </Routes>
  );
}

export default App