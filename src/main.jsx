import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Message from './pages/Message.jsx'
import Profile_page from './pages/Profile_page.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Auth0Provider
      domain="dev-a1l352vn33wp4qdc.us.auth0.com"
      clientId="bZYIACXRrymLCPuABOmRh2ga38fmrcGy"
      authorizationParams={{
        //redirect_uri: window.location.origin
        redirect_uri:'https://trade-lyst-frontend-krish2312005s-projects.vercel.app/'
      }}
    >

      <App />

    </Auth0Provider>,

    <Analytics/>


    {/*
    <Message/>
    

    <Profile_page/>
    */}

  </StrictMode>,
)
