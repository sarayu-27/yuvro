import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { clearAssessment } from "../../slices/assessmentSlice";
import { assessmentCard } from "../../data/data";
import Settings from "./Settings";
// import axios from "axios";
import "./TestCreation.scss";
import { setSubject } from "../../redux/actions";

function TestCreation() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const now = new Date();
  const startTime = now.toTimeString().slice(0, 5); // Get current time

  const endTimeObj = new Date(now.getTime() + 30 * 60000); // Add 30 minutes
  const endTime = endTimeObj.toTimeString().slice(0, 5);
  
  const [testTitle, setTestTitle] = useState("Untitled Quiz");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showHeaderInput, setShowHeaderInput] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
  const [settingsData, setSettingsData] = useState({
    startDate: today,
    startTime: startTime,
    endDate: today,
    endTime: endTime,
    duration: 30,
    message: "Your response is submitted",
  });
//   const [options, setOptions] = useState({
//     startDate: false,
//     endDate: false,
//     timeDuration: false,
//     customizeMessage: false,
//   });

  const headerRef = useRef(null);
//   const settingsRef = useRef(null);
  const navigate = useNavigate();
  
  const subject = useSelector((state) => state.subject);
  console.log(subject);
  const assessment_id = useSelector((state) => state.assessment);
  console.log({assessment_id});
  const dispatch = useDispatch();
  
  
//   useEffect(() => {
//     return () => {
//       dispatch(clearAssessment()); // Clears assessment_id when component unmounts
//     };
//   }, [dispatch]);

  // Fetch test data if assessment_id exists
  useEffect(() => {
    if (assessment_id) {
        const fetchTests = async () => {
        //     try {
        //       const res = await fetch('/assessmentCard.json') // Replace with API endpoint get only latest part cards
        //       const data = await res.json();
        //     //   setTests(data);
        //     console.log({data});
        //     const { testTitle, description, questions, schedule, subject_id } = data[0];
        //     setTestTitle(testTitle);
        //   setDescription(description);
        //   setQuestions(questions);
        //   setSettingsData(schedule);
        //   // we can set the subject if needed
        //   dispatch({ type: "SET_SELECTED_SUBJECT", payload: subject_id });
        //     } catch (err) {
        //       alert(err);
        //     }
        const { testTitle, description, questions, schedule, subject_id } = assessmentCard[0];
            setTestTitle(testTitle);
          setDescription(description);
          setQuestions(questions);
          setSettingsData(schedule);
          dispatch(setSubject(subject_id));
          };
      
          fetchTests();
      
    }
  }, [assessment_id, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setShowHeaderInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

//   const handleCheckboxChange = (e) => {
//     setOptions({
//       ...options,
//       [e.target.name]: e.target.checked,
//     });
//   };

//   const handleInputChange = (e) => {
//     setSettingsData({
//       ...settingsData,
//       [e.target.name]: e.target.value,
//     });
//   };

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      text: "",
      correctAnswer: type === "text" ? "" : undefined,
      options: type === "choice" ? [{ id: 1, text: "", correct: false }] : [],
      multipleAnswers: false,
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id, key, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [key]: value } : q))
    );
  };

  const addOption = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              options: [
                ...q.options,
                { id: q.options.length + 1, text: "", correct: false },
              ],
            }
          : q
      )
    );
  };

  const toggleCorrect = (questionId, optionId, multiple) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                multiple
                  ? o.id === optionId
                    ? { ...o, correct: !o.correct }
                    : o
                  : { ...o, correct: o.id === optionId }
              ),
            }
          : q
      )
    );
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = async () => {
    const formattedQuestions = questions.map((q) => {
      if (q.type === "choice") {
        return {
          question: q.text,
          type: q.type,
          multipleAnswers: q.multipleAnswers,
          required: q.required,
          options: q.options.map((option) => ({
            text: option.text,
            correct: option.correct,
          })),
        };
      } else if (q.type === "text") {
        return {
          question: q.text,
          type: q.type,
          correctAnswer: q.correctAnswer,
        };
      }
      return {};
    });

    const payload = { 
      testTitle, 
      description,
      subject_id: subject.id, 
      questions: formattedQuestions,
      schedule: settingsData
    };

    if (assessment_id) {
      // Update existing test
    //   await axios.put(`/api/tests/${assessment_id}`, payload);
      console.log({payload}); 
    //   dispatch(clearAssessment());  // Clear assessment_id after submitting
    } else {
      // Create a new test
      console.log({payload});
    }

    navigate("/faculty/assessment");
  };

  return (
    <div className="sts-testCreation">
     {settingsData && <Settings settingsDataProp={settingsData} setSettingsData={setSettingsData}></Settings>}

      {/* Header */}
      <div className="header" ref={headerRef} onClick={() => setShowHeaderInput(true)}>
        {showHeaderInput ? (
          <>
            <input
              type="text"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              onBlur={() => {
                if (testTitle.trim() === "") {
                  setTestTitle("Untitled Quiz");
                }
              }}
              placeholder="Untitled Quiz"
              className="header-input"
              autoFocus
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Form description"
              className="description-input"
            />
          </>
        ) : (
          <div>
            <h1 className="header-title">{testTitle}</h1>
            <p className="header-description">{description || "Form description"}</p>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="questions-list">
        {questions.map((q, index) => (
          <div key={q.id} className="question-card">
            <i className="sts-icon material-icons-outlined question-delete" onClick={() => deleteQuestion(q.id)}>delete</i>
            <div className="question-card__question">
              <span className="question-card__question-number">{index + 1}.</span>
              <input
                type="text"
                value={q.text}
                onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
                placeholder="Enter question"
                className="question-input"
              />
            </div>

            {/* Options handling */}
            {q.type === "choice" && (
              <div className="options-list">
                {q.options.map((o) => (
                  <div key={o.id} className="option-item">
                    <input
                      type={q.multipleAnswers ? "checkbox" : "radio"}
                      checked={o.correct}
                      onChange={() =>
                        toggleCorrect(q.id, o.id, q.multipleAnswers)
                      }
                    />
                    <input
                      type="text"
                      value={o.text}
                      onChange={(e) =>
                        setQuestions(
                          questions.map((ques) =>
                            ques.id === q.id
                              ? {
                                  ...ques,
                                  options: ques.options.map((opt) =>
                                    opt.id === o.id
                                      ? { ...opt, text: e.target.value }
                                      : opt
                                  ),
                                }
                              : ques
                          )
                        )
                      }
                      placeholder="Option text"
                    />
                  </div>
                ))}
                <button className="add-option" onClick={() => addOption(q.id)}>
                  + Add Option
                </button>
              </div>
            )}
            {q.type === "text" && (
              <div className="answer-description">
                <textarea
                  type="text"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    updateQuestion(q.id, "correctAnswer", e.target.value)
                  }
                  placeholder="Enter correct answer"
                  className="correct-answer-input"
                />
              </div>
            )}

            <div className="question-actions">
              <label>
                <input
                  type="checkbox"
                  checked={q.required}
                  onChange={(e) =>
                    updateQuestion(q.id, "required", e.target.checked)
                  }
                />
                Required
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={q.multipleAnswers}
                  onChange={(e) =>
                    updateQuestion(q.id, "multipleAnswers", e.target.checked)
                  }
                />
                Multiple Answers
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Start Section */}
      <div className="quick-start">
        <h3
          className="quick-start-title"
          onClick={() => setShowQuickStart(!showQuickStart)}
        >
          <i className="sts-icon material-icons-outlined">add</i>Add New Question
        </h3>
        {showQuickStart && (
          <div className="quick-start-options">
            <button onClick={() => {addQuestion("choice"); setShowQuickStart(!showQuickStart)}}>Choice</button>
            <button onClick={() => {addQuestion("text"); setShowQuickStart(!showQuickStart)}}>Text</button>
          </div>
        )}
      </div>

      {/* Save Test Button */}
      {questions.length > 0 && (
        <button onClick={handleSubmit} className="save-button">
          Save Test
        </button>
      )}
    </div>
  );
}

export default TestCreation;
