import { useNavigate } from "react-router-dom";
import { assessment_report } from "../../data/data";

const Report = () => {
  const navigate = useNavigate();

  const backToTest = () => {
    navigate(-1);
  };

  return (
    <div className="sts-test-results">
      <a onClick={backToTest} className="back-button">← Back</a>
      <div className="student-details">
        <span><b>Roll no: </b>{assessment_report.student_id}</span>
        <span><b>Name: </b>{assessment_report.student_name}</span>
      </div>
      {/* Score Section */}
      <div className="sts-test-results__card">
        <div className="test-score"><b>Score - {assessment_report.score}</b></div>
        <div className="test-data">
          <span>Correct - {assessment_report.correct}</span>
          <span>Wrong - {assessment_report.wrong}</span>
          <span>Not Attempted - {assessment_report.notAttempted}</span>
        </div>
        
        {/* Questions Section */}
        <div className="test-questions">
          {assessment_report.questions.map((q, index) => (
            <div key={index} className="question-container">
              <p className="question"><b>{index + 1}. {q.question}</b></p>
              
              {/* Options */}
              {q.options && (
              <div className="options">
                {q.options.map((option, idx) => (
                  <div 
                    key={idx} 
                    className={`option ${
                      idx === q.correctAnswer ? "correct" : 
                      idx === q.selectedAnswer ? "wrong" : ""
                    }`}
                  >
                    <input type="radio" checked={q.selectedAnswer === idx} readOnly />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}
              {/* Answer Status */}
              <div className="answer-status">
                  {q.questionType === "mcq" ? (
                    q.selectedAnswer === q.correctAnswer ? (
                      <span className="correct-answer"><i className="material-icons-outlined">check</i> Selected Correct Answer</span>
                    ) : q.selectedAnswer !== null ? (
                      <span className="wrong-answer"><i className="material-icons-outlined">close</i> Selected Wrong Answer</span>
                    ) : (
                      <span className="not-attempted"><i className="material-icons-outlined">warning</i> Not Attempted</span>
                    )
                  ) : (
                    <span className="text-answer-status">
                      {q.explanation ? (
                        <span className="correct-answer"><i className="material-icons-outlined">check</i> Answer Submitted</span>
                      ) : (
                        <span className="not-attempted"><i className="material-icons-outlined">warning</i> Not Attempted</span>
                      )}
                    </span>
                  )}
              </div>

              {/* StudentExplanation */}
              <div className="student-explanation">
                <span>Your answer:</span>
                <textarea disabled value={q.explanation || ""}></textarea>
              </div>

              {/* CorrectExplanation */}
              <div className="explanation">
                <b>Explanation:</b> {q.answerExplanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
