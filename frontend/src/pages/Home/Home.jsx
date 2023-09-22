import React from 'react'
import {BiSolidDish} from "react-icons/bi";
import { Link } from 'react-router-dom';
import "./Home.scss";
import heroImg from "../../assets/inv-img.png"

const Home = () => {
  return (
    <div className='home'>
      <nav className='container --flex-between'>
        <div className="logo">
          <BiSolidDish size={35} />
        </div>
        <ul className='home-links'>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
          <li>
            <button className='--btn --btn-primary'>
              <Link to={"/login"}>Login</Link>
            </button>
          </li>
          <li>
            <button className='--btn --btn-primary'>
              <Link to={"/dashboard"}>Dashboard</Link>
            </button>
          </li>
        </ul>
      </nav>
      <section className='container hero'>
        <div className='hero-text'>
          <h2>Inventory {"&"} Stock Management Solution</h2>
          <p>
            Inventory system to control and manage proucts in the warehouse in
            real timeand integrated to make it easier to develop your business.
          </p>
          <p>
            Lotus Management is a powerful and user-friendly Product Management System (PMS) website designed to streamline and enhance the entire product lifecycle management process. Whether you are a startup founder, a product manager at a large corporation, or a small business owner, Lotus Management is your go-to platform for efficiently managing your products from ideation to retirement. 
          </p>
          <p>
            Lotus itself is a brand that manufactures world class chafing dish which are not only sold locally but also exported to other countries to big brand names! Suffice to say that they themselves being the pioneer of this management system is enough to vouch for the credibility of this application!
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Free Trial 1 Month</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="1K" text="Brand Owners" />
            <NumberText num="1K" text="Active Users" />
            <NumberText num="50+" text="Partners" />
          </div>
        </div>

        <div className='hero-image'>
          <img src={heroImg} alt="Inventory" />
        </div>  

      </section>
    </div>
  )
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home