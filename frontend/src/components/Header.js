import React from "react";
import styles from "./Login.module.css";
import hstyles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header({ email }) {
  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/login");
  };
  return (
    <>
      {
        <header className={hstyles.header}>
          <div style={{ cursor: "pointer" }} onClick={goToLoginPage}>
            <img className={styles.filtergreen} src="/logo.svg" alt="logo" />
          </div>
          <div className="flex space-x-4">
            <span>{email}</span>
            <button
              className={hstyles.button}
              onClick={() => {
                navigate("/journal");
              }}
            >
              New Entry
            </button>
            <button
              className={hstyles.button}
              onClick={() => {
                navigate("/view-journal");
              }}
            >
              View History
            </button>
          </div>
        </header>
      }
    </>
  );
}

export default Header;
