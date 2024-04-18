import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SisoProvider } from "./Context/siso.jsx";
import { BrowserRouter } from 'react-router-dom';
import { ChatProvider } from './Context/ChatContext.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SisoProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </SisoProvider>
  </BrowserRouter>
);
