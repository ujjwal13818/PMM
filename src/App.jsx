import React from 'react'
import LP from './Pages/LP/LP';
import { Routes,Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useSiso } from './Context/siso';
import MyPosts from './Pages/MyPosts/MyPosts';
import Search from './Pages/Search/Search';
import Profile from './Pages/Profile/Profile';
import UpdatePassword from './Utils/UpdatePassword/UpdatePassword';
import UpdateName from './Utils/UpdateName/UpdateName';
import UpdateProfilePic from './Utils/UpdateProfilePic/UpdateProfilePic';
import DeleteAccount from './Utils/DeleteAccount/DeleteAccount';
import FinalDelete from './Utils/FinalDelete/FinalDelete';

const App = () => {
const siso = useSiso();

  return (
    <Routes>
      <Route path="/" element={<LP />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/myposts" element={<MyPosts />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/updatepassword" element={<UpdatePassword />}></Route>
      <Route path="/updatename" element={<UpdateName />}></Route>
      <Route path="/updateprofilepic" element={<UpdateProfilePic />}></Route>
      <Route path="/deleteaccount" element={<DeleteAccount />}></Route>
      <Route path="/finaldelete" element={<FinalDelete />}></Route>
    </Routes>
  );
}

export default App