import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./widget.scss";

const Widget = ({ type }) => {
  const { currentUser } = useContext(AuthContext);
  const title =
    type === "user"
      ? "Reccomended for " + currentUser.displayName
      : type === "popular"
      ? "Popular on DesignMediaX"
      : "Editor's choice";

  const img =
    type === "user"
      ? "/assets/learn.jpg"
      : type === "popular"
      ? "/assets/world.jpg"
      : "/assets/schoolpupils.jpg";

  return (
    <div className="widget">
      <span className="rightTitle">{title}</span>
      <img className="rightImg" src={img} alt="" />
    </div>
  );
};

export default Widget;
