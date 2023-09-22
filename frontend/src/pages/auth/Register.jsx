import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>

          <form >
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
            <Link to="/">
              <button type="submit" className="--mybtn">
                  Home
              </button>
            </Link>
          </form>

          <span className={styles.register}>
              <p>Already have an account?</p>
          </span>

          <Link to="/login">
              <button type="submit" className="--mybtn2">
                  Login
              </button>
          </Link>

        </div>
      </Card>
    </div>
  );
};

export default Register;