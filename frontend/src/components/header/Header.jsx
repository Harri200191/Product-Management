import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">Haris Rehman!</span>
        </h3>
        <NavLink to={"/"}>
          <button className="--btn --btn-custom">
            Logout
          </button>
        </NavLink>
      </div>
      <hr />
    </div>
  );
};

export default Header;