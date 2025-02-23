import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ email }) {
  const navigate = useNavigate();
  return (
    <>
      <header className="">
        <div>
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="flex space-x-4">
          <span>{email}</span>
          <button
            onClick={() => {
              navigate("/journal");
            }}
          >
            New Entry
          </button>
          <button
            onClick={() => {
              navigate("/view-journal");
            }}
          >
            View History
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
