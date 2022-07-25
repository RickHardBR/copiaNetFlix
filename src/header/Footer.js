import React from "react";
import logo  from "../images/logo.png";


const Footer = () => {
  return (
   <>
   <footer className="footer-distributed" style={{background:"black",color:"gray"}}>

<div className="footer-right">


<img
      alt="logo"
            style={{ width: "120px", height: "40px" }}
            src={ logo } 
          />


</div>

<div className="footer-left">

  <p className="footer-links">
    <p style={{color:"grey"}}>Clone do NetFlix</p>
  </p>

  <p ><span style={{color:"#cc0000"}}>RickHard - Ricardo Ribeiro</span> &copy; 2022</p>
</div>

</footer>
       
   </>
    
  );
};

export default Footer;
