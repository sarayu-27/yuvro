import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { viewQuestions } from "../../data/data";
import './ViewQuestions.scss';
const ViewQuestions = () => {
  const navigate = useNavigate();
  const [assessmentData,setAssessmentData] = useState(null);
  useEffect(()=>{
    const fetchData = async () => {
        // try {
        //   const res = await fetch('/viewQuestions.json') // Replace with API endpoint
        //   const data = await res.json();
        //   console.log({data});
        //   setAssessmentData(data);
        // } catch (err) {
        //   alert(err);
        // }
        setAssessmentData(viewQuestions);
      };
      fetchData();
  },[]);
  return (
    <div className="sts-view">
      <button className="sts-view__back-button" onClick={() => navigate("/faculty/assessment")}>← Back</button>
      {assessmentData && <>
        <h1 className="title">{assessmentData.testTitle}</h1>
        <p className="description">{assessmentData.description}</p>
        <div className="sts-view__questions">
            {assessmentData.questions.map((question) => (
            <div key={question.id} className="sts-view__question">
                <p>{question.text}</p>
                {question.type === "choice" && (
                <ul>
                    {question.options.map((option) => (
                    <li key={option.id} className="options">
                        <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={option.correct}
                        disabled
                        />
                        <span>{option.text}</span>
                    </li>
                    ))}
                </ul>
                )}
                {question.type === "text" && (
                <input
                    type="text"
                    className="text-input"
                    placeholder={question.correctAnswer}
                    disabled
                />
                )}
            </div>
            ))}
        </div>
      </>}
    </div>
  )
}

export default ViewQuestions
