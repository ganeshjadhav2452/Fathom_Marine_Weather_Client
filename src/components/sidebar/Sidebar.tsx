import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { sidebarTabs } from "../../DATA/sidebar";

interface tabClickHandlerParameters {
  id: number;
  label: string;
  path: string;
  icon: React.ReactNode;
}
const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const tabClickHandler = (tab: tabClickHandlerParameters): void => {
    navigate(tab.path);
  };
  return (
    <div className="sidebar">
      <h2>Fathom Weather</h2>
      <nav>
        <ul>
          {sidebarTabs.map((tab) => {
            return (
              <li
                className="sidebar-tab"
                key={tab.id}
                onClick={() => tabClickHandler(tab)}
              >
                {tab.icon}
                <Link to={tab.path}>{tab.label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
