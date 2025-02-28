import { useState } from "react";
import { assessment,subjects } from "../../data/data";
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
      {subjects.map((subject, index) => (
        <option key={index} value={subject.value}>
          {subject.label}
        </option>
      ))}
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
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                        </svg>  {test.total_questions} Questions
                    </p>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                        </svg>  {test.time}
                    </p>
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
