import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Navigation() {
  const [menuActive, setMenuActive] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const handleLogout = async () => {
    try {
      await axios.get("user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };
  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          {user.name}
          <i className="fas fa-chevron-down"></i>
          <img src={user.avatar} alt="/" />
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/profile">PROFILE</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              LOGOUT
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  const transForm = {
    transForm: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <nav className="site-navigation" role="navigation">
      <span className="menu-title">
        <Link to="/">My React Blog</Link>
      </span>
      <div className={`menu-content-container ${menuActive && "active"}`}>
        <ul style={transForm}>
          <li>
            <Link to="/Home">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/blog">
              <i className="fas fa-newspaper"></i> Blog
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <i className="fas fa-phone-square-alt"></i> Contact Us
            </Link>
          </li>
          {isLogged ? (
            userLink()
          ) : (
            <li>
              <Link to="/login">
                <i className="fas fa-user"></i> Login
              </Link>
            </li>
          )}
        </ul>
        <span className="menu-avatar-container">
          {/* <span className="menu-avatar-name">{`${user.firstName} ${user.lastName}`}</span> */}
        </span>
      </div>
      <i
        className="ionicons icon ion-ios-menu"
        onClick={() => setMenuActive(!menuActive)}
      />
    </nav>
  );
}
