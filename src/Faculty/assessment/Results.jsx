import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import './Results.scss';
const assessmentData = {
  test_id: 1,
  test_name: "Java",
  responses: 50,
  averageScore: "40%",
  studentsData: [
    { student_id: 1, student_name: "Rohith", score: "70%" },
    { student_id: 2, student_name: "Sarayu", score: "75%" },
  ],
};

const Results = () => {
  const navigate = useNavigate();
  const [filteredStudents, setFilteredStudents] = useState(
    assessmentData.studentsData
  );
  const [highlightTerm, setHighlightTerm] = useState("");

  const results = () => {
    navigate("/faculty/student-report");
  };

  const downloadResult = (id) => {
    console.log({ id });
  };

  const downloadReport = (e, id) => {
    e.stopPropagation();
    console.log({ id });
  };

  // Function to highlight matched text in student name
  const highlightText = (text, term) => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={index} style={{ color: "blue",background:"none", fontWeight: "bold" }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="assessment-results">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className="title">{assessmentData.test_name}</h1>

      <div className="stats-box">
        <div className="stat">
          <p className="stat-label">Responses</p>
          <p className="stat-value">{assessmentData.responses}</p>
        </div>
        <div className="stat">
          <p className="stat-label">Average Score</p>
          <p className="stat-value">{assessmentData.averageScore}</p>
        </div>
      </div>
     <div className="search-download">
      {/* Search Component */}
      <Search
        data={assessmentData.studentsData}
        setFilteredData={setFilteredStudents}
        setHighlightTerm={setHighlightTerm} // Pass this only if you need highlighting
        keyToSearch={["student_id","student_name"]} // Field to search dynamically
        placeholder="Search by Student Name"
      />

      <button
        className="download-button"
        onClick={() => downloadResult(assessmentData.test_id)}
      >
        ⬇ Download
      </button>
      </div>

      <table className="results-table">
        <thead>
          <tr>
            <th>Roll no</th>
            <th>Name of the Candidate</th>
            <th>Score</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr
                key={student.student_id}
                onClick={() => results(student.student_id)}
              >
                <td>{student.student_id}</td>
                <td>{highlightText(student.student_name, highlightTerm)}</td>
                <td>{student.score}</td>
                <td>
                  <i
                    className="material-icons-outlined"
                    onClick={(e) => downloadReport(e, student.student_id)}
                  >
                    file_download
                  </i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No student found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
