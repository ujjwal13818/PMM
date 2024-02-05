import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SisoProvider } from "./Context/siso.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <SisoProvider>
      <App />
    </SisoProvider>
)
