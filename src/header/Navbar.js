import React from "react";
import { Link, withRouter } from "react-router-dom";
import Search from "./Search";
import logo  from "../images/logo.png";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img
            alt="logo"
            style={{ width: "120px", height: "40px" }}
            src={ logo } 
          />
          </Link>
      </div>
      <div className="search-bar">
        <Search />
      </div>
      <div style={{ clear: "both" }} />
    </nav>
  );
};
export default withRouter(Navbar);
