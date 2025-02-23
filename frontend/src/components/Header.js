import React from "react";
import styles from "./Login.module.css";
import hstyles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header({ email }) {
  const navigate = useNavigate();
  return (
    <>
      {email && (
        <header className={hstyles.header}>
          <div>
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
      )}
    </>
  );
}

export default Header;
