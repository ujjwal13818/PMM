import React from 'react'
import LP from './Pages/LP/LP';
import { useSiso } from './Context/siso';
import { Routes,Route } from 'react-router-dom';
import Home from './Pages/Home/Home';



const App = () => {
  const siso = useSiso();
  const userId = siso.user.uid;
  console.log(userId);
  return (
    <Routes>
      <Route path="/" element={<LP />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
}

export default App