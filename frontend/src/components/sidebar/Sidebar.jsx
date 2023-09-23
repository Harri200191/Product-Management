import React, { useState } from "react";
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import {BiSolidDish} from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import menu from "../../data/sidebar";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }} >
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <BiSolidDish
              size={35}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
          </div>

          <div className="bars" style={{ marginLeft: isOpen ? "130px" : "0px" }}>
            <HiMenuAlt3
              size={33}
              style={{ cursor: "pointer" }}
              onClick={toggle}
            />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;