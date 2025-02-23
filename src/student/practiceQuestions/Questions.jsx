import { useState, useEffect, useCallback, useRef } from "react";
import './Questions.scss';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';


function Questions({ topicObj, topicName}) {
  console.log({topicObj});
  const questions = topicObj; 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionStates, setQuestionStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [takeTest, setTakeTest] = useState(false);
  const questionsRef = useRef(null);
  const navigate = useNavigate();


  const initializeQuestionStates = useCallback((length) => {
    setQuestionStates(
      Array.from({ length }, () => ({
        selectedOption: null,
        showFeedback: false,
      }))
    );
  }, []);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setLoading(false);
      setCurrentQuestion(0);
      initializeQuestionStates(questions.length);
    } 
    setTakeTest(false);
  }, [questions,initializeQuestionStates]);

  const handleOptionClick = (optionIndex) => {
    setQuestionStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[currentQuestion] = {
        selectedOption: optionIndex,
        showFeedback: true,
      };
      return updatedStates;
    });
  };

  const onFinishPractice = () => {
    setTakeTest(true);
  };

  const handleNavigation = (direction) => {
    setCurrentQuestion((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0 || newIndex >= questions.length) {
        return prev;
      }
      return newIndex;
    });
  };

  const onTestClick = ()=>{
    navigate('/student/test');
  }

  if (loading) return <div>Loading questions...</div>;
  if (!questions.length) return <div>No questions available for this topic.</div>;

  const question = questions[currentQuestion] || {}; // Prevent undefined access
  const { selectedOption, showFeedback } = questionStates[currentQuestion] || {};
  const isCorrect = selectedOption === question.correctAnswer - 1;

  return (
    <div className="sts-questions" ref={questionsRef}>
      <div className="sts-questions__title">
        <div>{topicName}</div>
        <div>-</div>
        <div>
          {currentQuestion + 1}/{questions.length}
        </div>
      </div>
      {question.question ? (
        <>
          <div className="sts-question">
            {currentQuestion + 1}. {question.question}
          </div>
          <div className="sts-question__options">
            {question.options.map((option, index) => (
              <div key={option}>
                <input
                  type="radio"
                  id={option}
                  name={`question-${currentQuestion}`}
                  className={`option-button ${
                    showFeedback && index === question.correctAnswer - 1
                      ? "correct"
                      : showFeedback && index === selectedOption
                      ? "wrong"
                      : ""
                  }`}
                  onChange={() => handleOptionClick(index)}
                  checked={selectedOption === index}
                  disabled={showFeedback}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
          {showFeedback && (
            <div className={`sts-question__description ${isCorrect ? "correct" : "wrong"}`}>
              <p className={isCorrect ? "sts-question__correct" : "sts-question__wrong"}>
                {isCorrect ? "Correct!" : "Wrong!"}
              </p>
              <p className="sts-question__explanation">{question.explanation}</p>
            </div>
          )}
        </>
      ) : (
        <div>Invalid question data.</div>
      )}
      <div className="sts-question__buttons">
        <button
          onClick={() => handleNavigation(-1)}
          disabled={currentQuestion === 0}
          className="sts-question__button previous"
        >
          Previous
        </button>
        <button
          onClick={() => handleNavigation(1)}
          disabled={currentQuestion === questions.length - 1 || !showFeedback}
          className="sts-question__button next"
        >
          Next
        </button>
        <button
          className="sts-question__button finish"
          disabled={currentQuestion < questions.length - 1 || !showFeedback || takeTest}
          onClick={onFinishPractice}
        >
          Finish
        </button>
      </div>
      {takeTest && (
        <div className="sts-questions__test">
          <button className="sts-questions__test-button" onClick={onTestClick}>Take a test</button>
        </div>
      )}
    </div>
  );
}

Questions.propTypes = {
  topicObj: PropTypes.array.isRequired,
  topicName: PropTypes.string.isRequired
};

export default Questions;
