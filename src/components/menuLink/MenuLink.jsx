import React, { useContext } from "react";
import "./menuLink.scss";
import { AuthContext } from "./../../context/AuthContext";

const MenuLink = ({ icon, text }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="menulink">
      {icon}
      <span className="menuLinkText">{text}</span>
      <span className="menuLinkTextName">
        {" "}
        {text === "Logout" && `( ${currentUser.displayName} )`}
      </span>
    </div>
  );
};

export default MenuLink;
