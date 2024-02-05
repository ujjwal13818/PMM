import React from 'react'
import LP from './Pages/LP/LP';
import { useSiso } from './Context/siso';



const App = () => {
  const siso = useSiso();
  if(siso.user)console.log(siso.user);
  if(siso.userInfo)console.log(siso.userInfo);
  return (
    <>
     <LP/>
    </>
  )
}

export default App