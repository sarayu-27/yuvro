import PropTypes from 'prop-types';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAssessment } from "../../redux/actions";
import './TestCard.scss';
// import { setAssessment } from "../../slices/assessmentSlice";
import Settings from './Settings';
import { useEffect,useState } from 'react';

function TestCard({ test}) {
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const now = new Date();
  const startTime = now.toTimeString().slice(0, 5); // Get current time

  const endTimeObj = new Date(now.getTime() + 30 * 60000); // Add 30 minutes
  const endTime = endTimeObj.toTimeString().slice(0, 5);
  const assessment_id = useSelector((state) => state.assessment.assessment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [settingsData, setSettingsData] = useState({
      startDate: today,
      startTime: startTime,
      endDate: today,
      endTime: endTime,
      duration: 30,
      message: "Your response is submitted",
    });
    const [isSent, setIsSent] = useState(false);

  useEffect(()=>{
    if (assessment_id) {
        const fetchTests = async () => {
            try {
              const res = await fetch('/assessmentCard.json') // Replace with API endpoint get only latest part cards
              const data = await res.json();
          setSettingsData(data[0].schedule);
          // we can set the subject if needed
            } catch (err) {
              alert(err);
            }
          };
      
          fetchTests();
      
    }
  },[dispatch,assessment_id]);
  
  const sendClick = (event,id)=>{
    event.stopPropagation();
    console.log({id});
    setIsSent(true);
  };
  const visibilityClick = (event,id)=>{
    event.stopPropagation();
    dispatch(setAssessment(id));
    navigate('/faculty/view-questions')
  };
  const settingsClick = (event,id)=>{
    event.stopPropagation();
    dispatch(setAssessment(id));
  }
  const editClick = (event,id)=>{
    event.stopPropagation();
    dispatch(setAssessment(id));
    navigate('/faculty/test-creation');
  };
  const testResults = (event,id)=>{
    event.stopPropagation();
    dispatch(setAssessment(id));
    navigate('/faculty/results');
  };
  return (
    <div className="test-card" id={test.id} onClick={(e)=>{testResults(e,test.id)}}>
      <div className="test-card-content">
        <div className="test-card-title"><h3>{test.testTitle}</h3></div>
        <div className="test-card-body">
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
              </svg>  {test.questions.length} Questions</p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>  {test.schedule.duration} minutes</p>
            <p>  
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
            </svg>{test.responses} responses</p>
        </div>
      </div>
      <div className="test-card-options">
        {/* <i className="material-icons-outlined" onClick={(e)=>{visibilityClick(e,test.id)}}>visibility</i> */}
        <svg onClick={(e)=>{visibilityClick(e,test.id)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        </svg>
        {/* <i className="material-icons-outlined" onClick={(e)=> {editClick(e,test.id)}}>edit</i> */}
        <svg onClick={(e)=> {editClick(e,test.id)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>
        {settingsData && <div onClick={(e)=>{settingsClick(e,test.id)}}><Settings settingsDataProp={settingsData} setSettingsData={setSettingsData}></Settings></div>}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
        {/* <button>Enable</button> */}
        <button className={`test-card-upload ${isSent ? "disabled" : ""}`} onClick={(e)=>{sendClick(e,test.id)}}>{isSent ? "Sent" : "Send"}</button>
      </div>
    </div>
  );
}

TestCard.propTypes = {
  test: PropTypes.any
};

export default TestCard;
