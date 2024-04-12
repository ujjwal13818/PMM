import React from 'react'
import LP from './Pages/LP/LP';
import { Routes,Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useSiso } from './Context/siso';
import MyPosts from './Pages/MyPosts/MyPosts';
import PostForm from './Utils/PostForm/PostForm';
import Navbar from './Components/Navbar/Navbar';
import Congrats from './Utils/Congrats/Congrats';
import Search from './Pages/Search/Search';
import Profile from './Pages/Profile/Profile';
import ShowList from './Utils/ShowList/ShowList';

const App = () => {
const siso = useSiso();

  return (
        <Routes>
          <Route path="/" element={<LP />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/myposts" element={<MyPosts />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      
  );
}

export default App