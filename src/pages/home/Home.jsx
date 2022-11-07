import React from "react";
import Update from "./../../components/update/Update";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <>
        <Navbar />
        <div className="homeContainer">
          <Sidebar />
          <Update />
          <Rightbar />
        </div>
      </>
    </div>
  );
};

export default Home;
