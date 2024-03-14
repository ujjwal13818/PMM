import React from 'react'
import LP from './Pages/LP/LP';
import { Routes,Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useSiso } from './Context/siso';





const App = () => {
  // const siso = useSiso();
  // // console.log(siso.userInfo);
  // const ProtectedRoute = ({children}) => {
  //   if(!siso.userInfo){
  //     return <Navigate to = "/" />
  //   }
  //   return children;
  // }


  return (
    <Routes>
      <Route path="/" element={<LP />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
}

export default App