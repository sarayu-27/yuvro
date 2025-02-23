import { useState } from "react";
import { assessment } from "../../data/data";
import { useNavigate } from "react-router-dom";
import './Assessment.scss';

const Assessment = () => {
    const [activeTab, setActiveTab] = useState("inProgress");
    const navigate = useNavigate();
    const openTest = (id)=> {
      console.log({id});
      navigate('/student/testQuestions/')
    }
    const openResults = (id)=> {
        navigate('/student/testResults');
    }
    return (
      <div className="sts-student-assessment">
        <div className="header">
          <select className="dropdown">
            <option value="java">Java</option>
          </select>
        </div>
        <div className="tab-container">
          <button
            className={activeTab === "inProgress" ? "tab active" : "tab"}
            onClick={() => setActiveTab("inProgress")}
          >
            In Progress
          </button>
          <button
            className={activeTab === "completed" ? "tab active" : "tab"}
            onClick={() => setActiveTab("completed")}
          >
            Completed Test
          </button>
        </div>
          {assessment
            .filter((test) => (activeTab === "completed" ? test.completed : !test.completed))
            .map((test) => (
                <div key={test.id} className="test-card-container">
              <div className="test-card">
                <div className="test-card-header">
                  <p className="test-title">{test.test_title}</p>
                  <div className="test-content">
                    <p><i className="material-icons-outlined">library_books</i>  {test.total_questions} Questions</p>
                    <p><i className="material-icons-outlined">schedule</i>  {test.time}</p>
                  </div>
                </div>
              </div>
              {test.completed ? (
                  <button className="view-results" onClick={() => openResults(test.id)}>View results</button>
                ) : (
                  <button className="take-test" onClick={() => openTest(test.id)}>Take Test</button>
                )}
              </div>
            ))}
      </div>
    );
}

export default Assessment
