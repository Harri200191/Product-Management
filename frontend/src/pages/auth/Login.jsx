import React from 'react'
import styles from "./auth.module.scss"
import {FiLogIn} from "react-icons/fi"
import Card from '../../components/card/Card'
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  return (
    <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <FiLogIn size={35} color="#999" />
                </div>
                <h2>Login</h2>
                <form>
                    <input type="email" placeholder="Email" required name="email"/>
                    <input type="password" placeholder="Password" required name="password" />
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
                    <p className='--custom-p'>Forgot Password</p>
                </Link>

                <hr/>

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
  )
}

export default Login