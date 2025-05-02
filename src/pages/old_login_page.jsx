import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Login_page = () => {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    
    return (
        <>
            <button onClick={() => loginWithRedirect()}>Log In</button>

            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </button>
        </>
    )
}

export default Login_page
