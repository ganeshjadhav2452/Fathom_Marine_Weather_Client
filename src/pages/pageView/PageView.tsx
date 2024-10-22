import React from "react";
import { Outlet } from "react-router-dom";
import "./pageView.css";
import Sidebar from "../../components/sidebar/Sidebar";

const PageView: React.FC = () => {
  return (
    <div className="pageViewContainer">
      <div className="sidebarSection">
        <Sidebar />
      </div>
      <div className="pageRenderSection">
        <Outlet />
      </div>
    </div>
  );
};

export default PageView;
