import { useState, useEffect } from "react";
import { test_questions as quizData } from "../../data/data";
import { useNavigate } from "react-router-dom";
import './TestQuestions.scss'

const TestQuestions = () => {
  const navigate = useNavigate();
  
  const initialTime = parseInt(quizData.timer) * 60; // Convert minutes to seconds
  const savedTime = localStorage.getItem("quizTimer") ? parseInt(localStorage.getItem("quizTimer")) : initialTime;

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [descriptiveAnswers, setDescriptiveAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(savedTime);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); // Auto-submit when time reaches 0
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          localStorage.setItem("quizTimer", prev - 1); // Save time to localStorage
          return prev - 1;
        }
        clearInterval(timer);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]); // Re-run effect when timeLeft changes

  const handleSelectAnswer = (index) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: index });
  };

  const handleDescriptiveAnswer = (event) => {
    setDescriptiveAnswers({ ...descriptiveAnswers, [currentQuestionIndex]: event.target.value });
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleSubmit = async () => {
    localStorage.removeItem("quizTimer"); // Clear stored timer on submit

    const payload = {
      id: quizData.id,
      topic: quizData.topic,
      answers: quizData.questions.map((question, index) => ({
        questionId: question.id,
        question: question.question,
        questionType: question.questionType,
        options: question.options,
        selectedAnswer: question.questionType === 'mcq' ? (selectedAnswers[index] !== undefined ? selectedAnswers[index] + 1 : null) : null,
        explanation: (descriptiveAnswers[index] || "") ,
      })),
    };

    console.log("Submitting:", JSON.stringify(payload, null, 2));

    // Send data to backend (uncomment when integrating API)
    // const res = await fetch("/api/submit-test", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });

    // if (!res.ok) throw new Error("Failed to submit test");

    navigate("/student/test");
  };

  return (
    <div className="sts-test-questions">
      <div className="quiz-container">
        {/* Header: Timer & Close Button */}
        <div className="quiz-header">
          <svg onClick={handleSubmit} style={{ color: "red", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span className="timer">Time Remaining: <b>{formatTime(timeLeft)}</b></span>
        </div>
        
        <div className="quiz-content">
          {/* Left Navigation Panel */}
          <div className="nav-panel">
            {quizData.questions.map((_, index) => (
              <button
                key={index}
                className={`nav-button ${selectedAnswers[index] !== undefined || descriptiveAnswers[index] ? "selected" : ""}`}
                onClick={() => goToQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Right Question Panel */}
          <div className="question-panel">
            <p className="question">{`${currentQuestionIndex + 1}. ${quizData.questions[currentQuestionIndex].question}`}</p>

            {quizData.questions[currentQuestionIndex].questionType === 'mcq' ? (
              quizData.questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="option-container">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    checked={selectedAnswers[currentQuestionIndex] === index}
                    onChange={() => handleSelectAnswer(index)}
                  />
                  <label>{option}</label>
                </div>
              ))
            ) : (
              <textarea
                placeholder="Explain your answer here..."
                value={descriptiveAnswers[currentQuestionIndex] || ""}
                onChange={handleDescriptiveAnswer}
              ></textarea>
            )}
            {
                quizData.questions[currentQuestionIndex].questionType === 'mcq' && 
                   <textarea placeholder="explain your answer here"
                   value={descriptiveAnswers[currentQuestionIndex] || ""}
                      onChange={handleDescriptiveAnswer}>
                   </textarea>
            }
            {/* Navigation Buttons */}
            <div className="nav-buttons">
              {currentQuestionIndex > 0 && (
                <button className="btn btn-prev" onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>Previous</button>
              )}
              {currentQuestionIndex < quizData.questions.length - 1 ? (
                <button className="btn btn-next" onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>Next</button>
              ) : (
                <button className="btn btn-submit" onClick={handleSubmit}>Submit</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestQuestions;
