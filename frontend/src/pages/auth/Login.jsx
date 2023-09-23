import React, { useState } from "react";
import styles from "./auth.module.scss";
import { FiLogIn } from "react-icons/fi";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authservice";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authslice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <FiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input type="email" placeholder="Email" required name="email" value={email} onChange={handleInputChange}/>
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password} 
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
            <Link to="/">
              <button type="submit" className="--mybtn">
                Back
              </button>
            </Link>
          </form>
          <Link to="/forgot">
            <p className="--custom-p">Forgot Password</p>
          </Link>

          <hr />

          <span className={styles.register}>
            <p>Don't have an account?</p>
          </span>

          <Link to="/register">
            <button type="submit" className="--mybtn2">
              Register
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
