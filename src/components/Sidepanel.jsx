import React from "react";
import "./Sidepanel.css";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Sidepanel = () => {
  const { logout } = useAuth0();

  return (
    <div className="card">
      <div className="card-body">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
            >
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
            >
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </NavLink>
          </li>

          {/* Logout Button */}
          <li className="nav-item">
            <button
              className="btn btn-danger w-100 mt-3"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidepanel;
