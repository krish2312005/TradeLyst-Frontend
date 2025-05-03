import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home_page from "./pages/Home_page";
import Profile_page from "./pages/Profile_page";
import Message from "./pages/Message.jsx";
import Login_page from "./pages/Login_page.jsx";
import { useEffect } from "react";
import axios from "axios";

import Admin_page from "./pages/Admin_page.jsx"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  // Send user data to the backend after authentication
  useEffect(() => {
    const sendUserDataToBackend = async () => {
      if (isAuthenticated && user) {
        const userData = {
          userId: user.sub, // Auth0 user ID
          name: user.name || "Anonymous",
          about: "This is a default about section", // Default value
          privacy: false, // Default privacy setting
          notifications: true, // Default notifications setting
          picture: user.picture || "",
        };

        //console.log("Sending user data to backend:", userData);

        try {
          // Check if the user already exists in the database
          const response = await axios.get(`https://tradelyst-backend.onrender.com/api/getUser/${user.sub}`);
          if (response.data.exists) {
            //console.log("User already exists in the database");
          } else {
            // If the user doesn't exist, create a new user
            await axios.post('https://tradelyst-backend.onrender.com/api/PostUser', userData);
            //console.log("User data saved successfully");
          }
        } catch (error) {
          console.error("Error checking or saving user data:", error.response ? error.response.data : error.message);
        }
      }
    };

    sendUserDataToBackend();
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // Render the protected content if authenticated
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home_page />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile_page />
      </ProtectedRoute>
    ),
  },
  {
    path: "/message",
    element: (
      <ProtectedRoute>
        <Message />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login_page />,
  },
  {
    path: "/admin",
    element: <Admin_page />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
