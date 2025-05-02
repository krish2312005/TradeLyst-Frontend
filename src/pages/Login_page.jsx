import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Login_page = () => {
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        // Automatically redirect to the Auth0 login page when the component loads
        loginWithRedirect();
    }, [loginWithRedirect]);

    return (
        //Here we are going to the auth0 for login and not displaying any data before
        //loading the auth0 page
        
        <div>
            
        </div>
    );
};

export default Login_page;
