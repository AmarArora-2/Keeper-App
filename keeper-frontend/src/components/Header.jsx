import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "../CSS/Header.css";

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
      await logout();
      navigate('/auth');
      } catch (error) {
      console.error("Logout failed:", error);
      }
    };

    return (
      <header className="header">
        <div className="header-left">
          <HighlightIcon className="header-icon" />
          <h1 className="header-title">Keeper</h1>
        </div>

        <div className="header-right">
          <div className="user-info">
            <PersonIcon className="user-icon" />
            <span className="username">{user?.name || user?.email || 'User'}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </header>
    );
  }
  
export default Header;