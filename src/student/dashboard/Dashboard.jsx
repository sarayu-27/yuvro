import React from "react";
import "./Dashboard.scss";
import { dashboardData,subjects } from "../../data/data.jsx"


const Dashboard = () => {
  return (
    <div className="dashboard-container p-6">
      <h1 className="dashboard-title">My Dashboard</h1>
      {/* <button className="subject-dropdown rounded">
        Subject ▼ */}
        <select className="subject-dropdown rounded">
      {subjects.map((subject, index) => (
        <option key={index} value={subject.value}>
          {subject.label}
        </option>
      ))}
    </select>
      {/* </button> */}

      <div className="dashboard-content mainbox">
        {dashboardData.map((section, index) => (
          <div key={index} className="dashboard-section entire-box">
            <div className="section-title first-half">
              <h2>{section.category}</h2>
            </div>
            <div className="section-data second-half">
              {section.data.map((item, idx) => (
                <div key={idx} className="stat-box Individual-Box">
                  <p>{item.label}</p>
                  <h2 className="stat-value text-xl font-bold">{item.value}</h2>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
