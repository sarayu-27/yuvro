
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TestCard from "./TestCard";
import { assessmentCard,subjects } from '../../data/data';
import { setSubject } from "../../redux/actions";
import './Assessment.scss';
import Search from "./Search";
import { clearAssessment } from "../../redux/actions";


function Assessment() {
  const [subjectList, setSubjectList] = useState();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  useEffect(() => {
      const fetchSubjects = async () => {
        // try {
        //   const res = await fetch("/subjects.json"); // Fetch subjects from endpoint , id
        //   const data = await res.json();
        //   setSubjects(data);
        // } catch (err) {
        //   alert(err);
        // }
        setSubjectList(subjects);
        if (subjects.length > 0) {
          setSelectedSubject(subjects[0].label); // Set default selected subject
        }
      };
      fetchSubjects();
    }, [dispatch, navigate]);
    useEffect(() => {
      setFilteredTests(tests);
    }, [tests]);
    useEffect(() => {
        const fetchTests = async () => {
          // try {
          //   const res = await fetch('/assessmentCard.json') // Replace with API endpoint get only latest part cards
          //   const data = await res.json();
          //   setTests(data);
          // } catch (err) {
          //   alert(err);
          // }
          setTests(assessmentCard);
        };
    
        fetchTests();
      }, [dispatch, navigate]);
    const onCreateTest = (()=>{
      dispatch(clearAssessment()); 
      console.log({subjects,selectedSubject});
        const selectedSubjectObj = subjects.find((subject) => subject.label === selectedSubject);
        console.log({selectedSubjectObj});
        console.log(selectedSubjectObj);
        if (selectedSubjectObj) {
            dispatch(setSubject(selectedSubjectObj));
            // dispatch(setAssessment({assessmentObj:se}))
        }
        navigate('/faculty/test-creation');
    })
  return(
    <div className="sts-assessment">
        <h2>Assessment</h2>
        <select
            className="sts-assessment__subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}>
            {subjectList && subjectList.map((subject, index) => (
            <option key={index} value={subject.label}>
                {subject.label}
            </option>
            ))}
        </select>
        <div className="sts-assessment__create">
            <div className="sts-assessment__create-button">
            {/* <Search testsData={tests} setFilteredTests={setFilteredTests} /> */}
            <Search
                data={tests} // Example test dataset
                setFilteredData={setFilteredTests}
                keyToSearch={["testTitle"]} // Field to search dynamically
                placeholder="Search by Test Title"
            />
                <button onClick={()=>onCreateTest()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                  </svg>Create New Test</button>
            </div>
        </div>
        <div className="test-cards">
        {filteredTests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  )
};

export default Assessment;
