import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice"; // Redux action
import "./MainNavigation.css";

const MainNavigation = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Access token from Redux store
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    setMenuIsOpen((prevMenuIsOpen) => !prevMenuIsOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h1 className="navbar-title">Event Booking</h1>
        <button className="navbar-toggle" onClick={toggleMenuHandler}>
          {menuIsOpen ? "✖" : "☰"}
        </button>
      </div>
      <nav className={`navbar-menu ${menuIsOpen ? "active" : ""}`}>
        <ul>
          {!token ? (
            <>
              <li className="navbar-item">
                <NavLink to="/auth" onClick={toggleMenuHandler}>
                  Login
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/events" onClick={toggleMenuHandler}>
                  Events
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item" style={{ paddingTop: "25px" }}>
                <NavLink to="/events" onClick={toggleMenuHandler}>
                  Events
                </NavLink>
              </li>
              <li className="navbar-item" style={{ paddingTop: "25px" }}>
                <NavLink to="/bookings" onClick={toggleMenuHandler}>
                  Bookings
                </NavLink>
              </li>
              <li className="navbar-item">
                <button className="navbar-logout" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;