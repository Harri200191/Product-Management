import React, { useState } from "react";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import Card from "../../components/card/Card";
import { Link, useParams } from "react-router-dom";

const Reset = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="password2"
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>

            <br/>
            <hr/>
            <br/>
            
            <div>
                <Link to="/">
                  <button type="submit" className="--mybtn2">
                    Home
                  </button>
                </Link>
                <Link to="/login">
                  <button type="submit" className="--mybtn">
                    Login
                  </button>
                </Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;