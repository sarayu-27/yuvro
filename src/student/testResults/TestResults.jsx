import { useNavigate } from "react-router-dom";
import { test_results } from "../../data/data";
import './TestResults.scss';

const TestResults = () => {
  const navigate = useNavigate();

  const backToTest = () => {
    navigate(-1);
  };

  return (
    <div className="sts-test-results">
      <a onClick={backToTest} className="back-button">← Back</a>
      
      {/* Score Section */}
      <div className="sts-test-results__card">
        <div className="test-score"><b>Score - {test_results.score}</b></div>
        <div className="test-data">
          <span>Correct - {test_results.correct}</span>
          <span>Wrong - {test_results.wrong}</span>
          <span>Not Attempted - {test_results.notAttempted}</span>
        </div>
        
        {/* Questions Section */}
        <div className="test-questions">
          {test_results.questions.map((q, index) => (
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
                      <span className="correct-answer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                    </svg> Selected Correct Answer</span>
                    ) : q.selectedAnswer !== null ? (
                      <span className="wrong-answer">
                        <svg style={{ color: "red", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg> Selected Wrong Answer</span>
                    ) : (
                      <span className="not-attempted"><i className="material-icons-outlined">warning</i> Not Attempted</span>
                    )
                  ) : (
                    <span className="text-answer-status">
                      {q.explanation ? (
                        <span className="correct-answer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                            </svg> Correct Answer Submitted</span>
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

export default TestResults;
