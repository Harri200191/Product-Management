import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"; 
import { selectName, SET_LOGIN } from "../../redux/features/auth/authslice";
import { logoutUser } from "../../services/authservice";
import { confirmAlert } from "react-confirm-alert";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  const confirmDelete = () => {
    confirmAlert({
      title: "Log Out of Inventory",
      message: "Are you sure you want to Log Out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => logout(),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{name}</span>
        </h3> 
        <button onClick={() => confirmDelete()} className="--btn --btn-custom">
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;