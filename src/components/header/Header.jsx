// src/components/header/Header.jsx
import React, { useEffect, useContext } from "react";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { User } from "./User";
import { nav } from "../../assets/data/data";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext"; // ✅ Correct import

export const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("active", window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="scontainer flex">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" width="100px" />
          </Link>
        </div>

        <nav>
          <ul>
            {nav.map((link) => (
              <li key={link.id}>
                {link.text === "taarabot" ? (
                  <a
                    href={link.url}
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </a>
                ) : (
                  <NavLink
                    to={link.url}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    {link.text}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="account flexCenter">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <User />
        </div>
      </div>
    </header>
  );
};
